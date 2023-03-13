import { NavLink } from "react-router-dom";
import keycloak from "../../utils/keycloak";

function Header() {
  return (
    <div>
      <header>Icon, Searchbar, +</header>
      {!keycloak.authenticated && <NavLink to="/">Login</NavLink>}
      {keycloak.authenticated && (
        <>
          Temp menu:&nbsp;
          <NavLink to="/dashboard">Dashboard</NavLink>&nbsp;
          <NavLink to="/profile">Profile</NavLink>&nbsp;
          <NavLink to="/profile/settings">Settings</NavLink>&nbsp;
          <NavLink to="/grouplist">Groups</NavLink>&nbsp;
          <NavLink to="/group">Group</NavLink>&nbsp;
          <NavLink to="/topiclist">Topics</NavLink>&nbsp;
          <NavLink to="/topic">Topic</NavLink>&nbsp;
          <NavLink to="/thread">Thread</NavLink>&nbsp;
          <NavLink to="/search">Search</NavLink>
        </>
      )}
    </div>
  );
}
export default Header;
