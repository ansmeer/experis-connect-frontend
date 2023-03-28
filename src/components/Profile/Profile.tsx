import styles from "./profile.module.css";
import { logout } from "../../redux/slices/userSlice";
import { TUser } from "../../types/user";
import { Link, useParams } from "react-router-dom";
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
  const user = useSelector((state: RootState) => state.user.details);
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", id],
    queryFn: async (): Promise<TUser> => {
      const userRequest = id
        ? userApi.get.userById(id)
        : userApi.get.currentUser();
      const response = await fetch(userRequest.uri, userRequest.options);
      return await response.json();
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    cacheTime: 0,
  });
  const isOwnProfile = id === user?.id || !id;
  const userData = isOwnProfile ? user : data;

  const onLogoutClick = () => {
    dispatch(logout());
    keycloak.logout();
  };

  useEffect(() => {
    document.title = userData
      ? `${userData.name} | Experis Connect`
      : "Experis Connect";
  }, [userData]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFetch text="Could not load profile." />;
  }

  return (
    <main>
      <h1>{userData && userData.name}</h1>
      <section className={styles.profile}>
        <div className={styles.editBackground}>
          {isOwnProfile && (
            <Link to="/profile/settings">
              Edit <SettingsOutlinedIcon />
            </Link>
          )}
        </div>
        <div className={styles.profilePicture}>
          {userData?.picture && (
            <img
              src={userData.picture}
              className={styles.avatar}
              alt={userData.name}
            />
          )}
        </div>
        <div className={styles.textBackground}>
          {userData?.name && <div id={styles.username}>{userData.name}</div>}
          {userData?.status && (
            <div className={styles.profileStatus}>
              <p>{userData.status}</p>
            </div>
          )}
          {userData?.bio && (
            <div className={styles.profileBio}>
              <h2>Bio</h2>
              <p>{userData.bio}</p>
            </div>
          )}
          {userData?.funFact && (
            <div className={styles.profileFunfact}>
              <h2>Fun fact</h2>
              <p>{userData.funFact}</p>
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
