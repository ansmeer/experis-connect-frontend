import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { groupApi } from "../../apis/groupApi";
import { RootState } from "../../redux/store";
import { TGroup } from "../../types/group";
import GroupCard from "../GroupCard/GroupCard";
import Loading from "../Loading/Loading";
import styles from "./groupList.module.css";

function GroupList() {
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
    <GroupCard
      key={group.id}
      data={group}
      isMember={user?.groups.includes(group.id) || false}
    />
  ));

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Could not load group list.</div>;
  }

  return (
    <>
      <h1>Groups</h1>
      <div className={styles.groupList}>{groupList}</div>
    </>
  );
}

export default GroupList;
