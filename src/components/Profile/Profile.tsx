import styles from "./profile.module.css";
import { logout } from "../../redux/slices/userSlice";
import { TUser } from "../../types/user";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userApi } from "../../apis/userApi";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import keycloak from "../../utils/keycloak";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ErrorFetch from "../ErrorFetch/ErrorFetch";
import { useEffect } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.details);
  const { id } = useParams();
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
  const isOwnProfile = id === user?.id || !id;

  const onLogoutClick = () => {
    dispatch(logout());
    keycloak.logout();
  };

  useEffect(() => {
    document.title = data
      ? `${data.name} | Experis Connect`
      : "Experis Connect";
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorFetch />;
  }

  return (
    <main>
      <h1>{data && data.name}</h1>
      <section className={styles.profile}>
        <div className={styles.editBackground}>
          {isOwnProfile && (
            <Link to="/profile/settings">
              Edit <SettingsOutlinedIcon />
            </Link>
          )}
        </div>
        <div className={styles.profilePicture}>
          {data?.picture && (
            <img src={data.picture} className={styles.avatar} alt={data.name} />
          )}
        </div>
        <div className={styles.textBackground}>
          {data?.name && <div id={styles.username}>{data.name}</div>}
          {data?.status && (
            <div className={styles.profileStatus}>
              <p>{data.status}</p>
            </div>
          )}
          {data?.bio && (
            <div className={styles.profileBio}>
              <h2>Bio</h2>
              <p>{data.bio}</p>
            </div>
          )}
          {data?.funFact && (
            <div className={styles.profileFunfact}>
              <h2>Fun fact</h2>
              <p>{data.funFact}</p>
            </div>
          )}
        </div>
        {isOwnProfile && (
          <div className={styles.logoutButton}>
            <button onClick={onLogoutClick} className="light">
              <span>Logout</span> <LogoutOutlinedIcon />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
