import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
      
      {keycloak.authenticated && user && (
        <header className={styles.header}>
            <UserIcon user={user} small={true} />
            <SearchForm />
            <Link to="/create/post" className={styles["create-post"]}>
                <AddIcon />
            </Link>
        </header>

      )}
  );
}
export default Header;
