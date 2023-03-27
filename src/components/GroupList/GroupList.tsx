import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { groupApi } from "../../apis/groupApi";
import { RootState } from "../../redux/store";
import { TGroup } from "../../types/group";
import ErrorFetch from "../ErrorFetch/ErrorFetch";
import Footer from "../Footer/Footer";
import GroupListItem from "../GroupListItem/GroupListItem";
import Loading from "../Loading/Loading";
import styles from "./groupList.module.css";

function GroupList() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.details);
  const { data, isLoading, isError } = useQuery({
    queryKey: "groupList",
    queryFn: async (): Promise<TGroup[]> => {
      const groupRequest = groupApi.get.groups();
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const groupList = data?.map((group) => (
    <GroupListItem
      key={group.id}
      data={group}
      isMember={user?.groups.includes(group.id) || false}
    />
  ));

  const handleCreateClick = () => {
    navigate("/create/group");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFetch text="Could not load group list." />;
  }

  return (
    <>
      <main>
        <h1>All groups</h1>
        <div className={styles.groupList}>{groupList}</div>
      </main>
      <Footer text="Create group" clickHandler={handleCreateClick} />
    </>
  );
}

export default GroupList;
