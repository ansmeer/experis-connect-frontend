import styles from "./profile.module.css";
import { TUser } from "../../types/user";
import { useNavigate, useParams } from "react-router-dom";
import { userApi } from "../../apis/userApi";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams(); // TODO id not updated when going from other profile to own profile
  const { data, isLoading } = useQuery({
    queryFn: async (): Promise<TUser | undefined> => {
      const userRequest = id
        ? userApi.get.userById(id)
        : userApi.get.currentUser();
      const response = await fetch(userRequest.uri, userRequest.options);
      return await response.json();
    },
  });

  const handleEditClick = () => {
    navigate("/profile/settings");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h1>Profile</h1>
        {data?.picture && (
          <div>
            <img src={data.picture} className={styles.avatar} alt={data.name} />
          </div>
        )}
        {!id && (
          <button onClick={handleEditClick}>Edit profile settings</button>
        )}
        {data?.name && <div>Name: {data.name}</div>}
        {data?.status && <div>Status: {data.status}</div>}
        {data?.funFact && <div>Fun fact: {data.funFact}</div>}
        {data?.bio && <div>Bio: {data.bio}</div>}
      </div>
    </>
  );
}

export default Profile;
