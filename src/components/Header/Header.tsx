import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import keycloak from "../../utils/keycloak";
import SearchForm from "../SearchForm/SearchForm";
import UserIcon from "../UserIcon/UserIcon";
import styles from "./header.module.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { logout } from "../../redux/slices/userSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

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
          <nav aria-label="main">
            <UserIcon user={user} small={true} />
            <Link to="/dashboard" title="Dashboard">
              <CottageOutlinedIcon />
            </Link>
            <Link to="/groups" title="Groups" className={styles["hide-mobile"]}>
              <Diversity1OutlinedIcon />
            </Link>
            <Link to="/topics" title="Topics" className={styles["hide-mobile"]}>
              <TopicOutlinedIcon />
            </Link>
            <Link to="/create/post" title="Create post">
              <AddCircleOutlineIcon />
            </Link>
            <HeaderMenu />
            <button
              onClick={onLogoutClick}
              className={styles["hide-mobile"]}
              aria-label="logout"
              title="Log out">
              <LogoutOutlinedIcon />
            </button>
          </nav>
          <SearchForm />
        </header>
      )}
    </>
  );
}

function HeaderMenu() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupsClick = () => {
    setAnchorEl(null);
    navigate("/groups");
  };

  const handleTopicsClick = () => {
    setAnchorEl(null);
    navigate("/topics");
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    keycloak.logout();
  };

  return (
    <>
      <button
        id="show-more"
        title="menu"
        aria-controls={open ? "more-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={styles["hide-desktop"]}>
        <MenuOutlinedIcon />
      </button>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "show-more",
          sx: { padding: "0" },
        }}
        sx={{ zIndex: "10000" }}>
        <MenuItem
          onClick={handleGroupsClick}
          sx={{ padding: "0 8px", lineHeight: "1em" }}>
          <ListItemIcon>
            <Diversity1OutlinedIcon />
          </ListItemIcon>
          <ListItemText>Groups</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleTopicsClick}
          sx={{ padding: "0 8px", lineHeight: "1em" }}>
          <ListItemIcon>
            <TopicOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Topics</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleLogoutClick}
          sx={{ padding: "0 8px", lineHeight: "1em" }}>
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Header;
