import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { groupApi } from "../../apis/groupApi";
import { postApi } from "../../apis/postApi";
import { dateOptionsEN } from "../../consts/dates";
import { TGroup } from "../../types/group";
import { TPost } from "../../types/post";
import { TUser } from "../../types/user";
import Loading from "../Loading/Loading";
import PostList from "../PostList/PostList";
import UserList from "../UserList/UserList";
import styles from "./group.module.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ErrorFetch from "../ErrorFetch/ErrorFetch";
import Dialog from "@mui/material/Dialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import GroupAddUserForm, {
  GroupAddUserFormData,
} from "../GroupAddUserForm/GroupAddUserForm";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { refetchUser } from "../../redux/slices/userSlice";

function Group() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("show") || "posts";
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.details);
  const isMember = id ? user?.groups.includes(parseInt(id, 10)) : false;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!id) return <></>;

  const handleJoinClick = async () => {
    if (!data) return;
    const joinRequest = groupApi.post.addCurrentUserToGroup(data.id);
    await fetch(joinRequest.uri, joinRequest.options);
    dispatch(refetchUser());
  };

  const handlePostsClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchParams({ show: "posts" }, { replace: true });
  };
  const handleMembersClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setSearchParams({ show: "members" }, { replace: true });
  };

  const groupId = parseInt(id);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["groupDetail", id],
    queryFn: async (): Promise<TGroup> => {
      const groupRequest = groupApi.get.groupById(groupId);
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const createdAtDate = data
    ? new Date(data.createdAt).toLocaleDateString("en-EN", dateOptionsEN)
    : "";

  const { data: groupPosts, isError: postsError } = useQuery({
    queryKey: ["groupPosts", id],
    queryFn: async (): Promise<TPost[]> => {
      const groupRequest = postApi.get.postsFromGroupByPage(groupId, 7, 0);
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const getMorePosts = async (offset: number): Promise<TPost[]> => {
    const postRequest = postApi.get.postsFromGroupByPage(
      parseInt(id, 10),
      5,
      offset
    );
    const response = await fetch(postRequest.uri, postRequest.options);
    return await response.json();
  };

  const {
    data: groupMembers,
    isError: membersError,
    refetch: refetchMembers,
  } = useQuery({
    queryKey: ["groupMembers", id],
    queryFn: async (): Promise<TUser[]> => {
      const groupRequest = groupApi.get.groupMembers(groupId);
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const addUserToGroup = async (formData: GroupAddUserFormData) => {
    const addUserRequest = groupApi.post.addUserToGroup(
      data!.id,
      formData.user
    );
    await fetch(addUserRequest.uri, addUserRequest.options);
    setOpen(false);
    refetchMembers();
  };

  useEffect(() => {
    document.title = data
      ? `${data?.name} | Experis Connect`
      : "Experis Connect";
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || membersError || postsError) {
    return <ErrorFetch text="Could not load group data." />;
  }

  return (
    <>
      <main>
        <div className={styles.info}>
          <p>{data?.name}</p>
          {data?.private && (
            <p>
              Private group <LockOpenIcon fontSize="inherit" />
            </p>
          )}
          <p>Founded {createdAtDate}</p>
          <p>{data?.description}</p>
        </div>

        <nav className={styles.tabs}>
          <button
            onClick={handlePostsClick}
            className={selectedTab === "posts" ? styles.selected : ""}>
            Posts
          </button>
          <button
            onClick={handleMembersClick}
            className={selectedTab === "members" ? styles.selected : ""}>
            Members
          </button>
        </nav>

        <h1>
          {data?.name}:{" "}
          {selectedTab.charAt(0).toUpperCase() + selectedTab.substring(1)}
        </h1>

        {selectedTab === "posts" && !groupPosts?.length && (
          <div>There are no posts in this group.</div>
        )}
        {selectedTab === "posts" && groupPosts && groupPosts.length > 0 && (
          <PostList initialData={groupPosts} fetchData={getMorePosts} />
        )}
        {selectedTab === "members" && groupMembers && (
          <>
            {data?.private && (
              <div className={styles["add-members"]}>
                <button onClick={handleClickOpen}>Add more members</button>
              </div>
            )}
            <UserList data={groupMembers} />
          </>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: { padding: "8px" } }}>
          <GroupAddUserForm handleData={addUserToGroup} />
          <button onClick={handleClose} className="cancel">
            <span>Cancel</span>
            <CloseOutlinedIcon fontSize="small" />
          </button>
        </Dialog>
      </main>
      {!isMember && <Footer text="Join group" clickHandler={handleJoinClick} />}
    </>
  );
}

export default Group;
