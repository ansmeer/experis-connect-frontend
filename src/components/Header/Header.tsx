import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import keycloak from "../../utils/keycloak";
import SearchForm from "../SearchForm/SearchForm";
import UserIcon from "../UserIcon/UserIcon";
import styles from "./header.module.css";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { logout } from "../../redux/slices/userSlice";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.details);

  const onLogoutClick = () => {
    dispatch(logout());
    keycloak.logout();
  };

  return (
    <>
      {keycloak.authenticated && user && (
        <header className={styles.header}>
          <UserIcon user={user} small={true} />
          <SearchForm />
          <div className={styles.icons}>
            <Link to="/" title="Dashboard">
              <CottageOutlinedIcon />
            </Link>
            <Link to="/groups" title="Groups" className={styles.hide}>
              <Diversity1OutlinedIcon />
            </Link>{" "}
            <Link to="/topics" title="Topics" className={styles.hide}>
              <TopicOutlinedIcon />
            </Link>
            <Link to="/create/post" title="Create post">
              <AddCircleOutlineIcon />
            </Link>
            <button onClick={onLogoutClick} className={styles.hide}>
              <LogoutOutlinedIcon />
            </button>
          </div>
        </header>
      )}
    </>
  );
}
export default Header;
