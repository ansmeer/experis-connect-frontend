import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { userApi } from "../../apis/userApi";
import { TUserMini } from "../../types/user";
import ErrorFetch from "../ErrorFetch/ErrorFetch";
import Loading from "../Loading/Loading";
import styles from "./groupAddUserForm.module.css";

type Props = { handleData: (data: GroupAddUserFormData) => Promise<void> };

export type GroupAddUserFormData = {
  user: string;
};

function GroupAddUserForm({ handleData }: Props) {
  const { data, isLoading, isError } = useQuery<TUserMini[]>({
    queryKey: "all-users",
    queryFn: async () => {
      const userRequest = userApi.get.allUsers();
      const response = await fetch(userRequest.uri, userRequest.options);
      return await response.json();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userOptions = data?.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name.substring(0, 30)}
      {user.name.length > 30 && "..."}
    </option>
  ));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleData(data as GroupAddUserFormData); // TODO avoid assertion?
  };

  const userRequirements = {
    required: { value: true, message: "User is required." },
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFetch text="Could not fetch user list." />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["add-user"]}>
      <label htmlFor="user" className={styles.labelText}>
        User
      </label>
      <div className={styles.description}>
        Select a user to add to the group.
      </div>
      <div className={styles.error} role="alert">
        {errors.user && `${errors.user.message}`}
      </div>
      <select id="user" {...register("user", userRequirements)}>
        <option></option>
        {userOptions}
      </select>
      <button className={styles.submitButton} type="submit">
        Add selected user to group
      </button>
    </form>
  );
}

export default GroupAddUserForm;
