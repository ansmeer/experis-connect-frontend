import { useQuery } from "react-query";
import { groupApi } from "../../apis/groupApi";
import { TGroup } from "../../types/group";
import GroupCard from "../GroupCard/GroupCard";
import Loading from "../Loading/Loading";
import styles from "./groupList.module.css";

function GroupList() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async (): Promise<TGroup[]> => {
      const groupRequest = groupApi.get.groups();
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const groupList = data?.map((group) => (
    <GroupCard key={group.id} data={group} />
  ));

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Could not load group list.</div>;
  }

  return <div className={styles.groupList}>{groupList}</div>;
}

export default GroupList;
