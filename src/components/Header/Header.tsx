import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import keycloak from "../../utils/keycloak";
import SearchForm from "../SearchForm/SearchForm";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.details);

  const onLogoutClick = () => {
    dispatch(logout());
    keycloak.logout();
  };

  return (
    <div>
      <header>
        <div>Icon</div>
        <SearchForm />
        <div>
          <Link to="/create/post">+</Link>
        </div>
      </header>
      {!keycloak.authenticated && <NavLink to="/">Login</NavLink>}
      {keycloak.authenticated && (
        <>
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
        </>
      )}
    </div>
  );
}
export default Header;
