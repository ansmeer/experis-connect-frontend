import styles from "./profile.module.css";
import { logout } from "../../redux/slices/userSlice";
import { TUser } from "../../types/user";
import { useNavigate, useParams } from "react-router-dom";
import { userApi } from "../../apis/userApi";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import keycloak from "../../utils/keycloak";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ErrorFetch from "../ErrorFetch/ErrorFetch";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.details);
  const { id } = useParams(); // TODO id not updated when going from other profile to own profile
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", id],
    queryFn: async (): Promise<TUser> => {
      const userRequest = id
        ? userApi.get.userById(id)
        : userApi.get.currentUser();
      const response = await fetch(userRequest.uri, userRequest.options);
      return await response.json();
    },
  });
  const showEditButton = id === user?.id || !id;

  const handleEditClick = () => {
    navigate("/profile/settings");
  };

  const onLogoutClick = () => {
    dispatch(logout());
    keycloak.logout();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorFetch />;
  }

  return (
    <div>
      <h1>{data && data.name}</h1>
      <section>
        <header>
          <div className={styles.profileBackground}>
            <div className={styles.profilePicture2}>
              <div className={styles.editButton}>
                {showEditButton && (
                  <button onClick={handleEditClick}>Edit</button>
                )}
              </div>
            </div>
            <div className={styles.profilePicture}>
              {data?.picture && (
                <img
                  src={data.picture}
                  className={styles.avatar}
                  alt={data.name}
                />
              )}
            </div>
            <div className={styles.profileBackground2}>
              {data?.name && (
                <div className={styles.profileName}>{data.name}</div>
              )}
              {data?.status && (
                <div className={styles.profileStatus}>
                  <p className={styles.p}>{data.status}</p>
                </div>
              )}
              {data?.bio && (
                <div className={styles.profileBio}>
                  Bio
                  <p className={styles.p}>{data.bio}</p>
                </div>
              )}
              {data?.funFact && (
                <div className={styles.profileFunfact}>
                  Fun fact
                  <p className={styles.p}>{data.funFact}</p>
                </div>
              )}
            </div>
            <div className={styles.logoutButton}>
              <button onClick={onLogoutClick}>Logout</button>
            </div>
          </div>
        </header>
      </section>
    </div>
  );
}

export default Profile;
