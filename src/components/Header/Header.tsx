import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import keycloak from "../../utils/keycloak";
import SearchForm from "../SearchForm/SearchForm";
import UserIcon from "../UserIcon/UserIcon";
import styles from "./header.module.css";

import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.details);

  const onLogoutClick = () => {
    dispatch(logout());
    keycloak.logout();
  };

  return (
    <>
      <header className={styles.header}>
        {user && (
          <>
            <UserIcon user={user} small={true} />
            <SearchForm />
            <Link to="/create/post" className={styles["create-post"]}>
              <AddIcon />
            </Link>
          </>
        )}
      </header>
      {!keycloak.authenticated && <NavLink to="/">Login</NavLink>}
      {keycloak.authenticated && (
        <div>
          Temp menu:&nbsp;
          <NavLink to="/dashboard">Dashboard</NavLink>&nbsp;
          <NavLink to="/profile">Profile</NavLink>&nbsp;
          <NavLink to="/profile/settings">Settings</NavLink>&nbsp;
          <NavLink to="/groups">Groups</NavLink>&nbsp;
          <NavLink to="/groups/1">Group</NavLink>&nbsp;
          <NavLink to="/topics">Topics</NavLink>&nbsp;
          <NavLink to="/topics/1">Topic</NavLink>&nbsp;
          <NavLink to="/thread/1">Thread</NavLink>&nbsp;
          <NavLink to="/search">Search</NavLink>
          <button onClick={onLogoutClick}>Logout</button>
        </div>
      )}
    </>
  );
}
export default Header;
