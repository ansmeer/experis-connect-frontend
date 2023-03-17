import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { groupApi } from "../../apis/groupApi";
import { topicApi } from "../../apis/topicApi";
import { TGroup } from "../../types/group";
import { TPostFormData } from "../../types/post";
import { TTopic } from "../../types/topic";
import styles from "./createPostForm.module.css";

type Props = { handleData: (data: TPostFormData) => void };

function CreatePostForm({ handleData }: Props) {
  const values = {
    postTarget: "group",
    title: "",
    content: "",
    targetGroup: null,
    targetTopic: null,
    targetUser: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
  } = useForm({
    defaultValues: {},
    values,
  });

  const groupsQuery = useQuery<TGroup[]>({
    queryKey: "groups",
    queryFn: async () => {
      const groupRequest = groupApi.get.groups();
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const topicsQuery = useQuery<TTopic[]>({
    queryKey: "topics",
    queryFn: async () => {
      const groupRequest = topicApi.get.topics();
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const groupOptions = groupsQuery.data?.map((group) => (
    <option key={group.id} value={group.id}>
      {group.name}
    </option>
  ));
  const topicOptions = topicsQuery.data?.map((topic) => (
    <option key={topic.id} value={topic.id}>
      {topic.name}
    </option>
  ));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.postTarget === "group" && !Boolean(data.targetGroup)) {
      setError("targetGroup", { message: "Group is required." });
      return;
    }
    if (data.postTarget === "topic" && !Boolean(data.targetTopic)) {
      setError("targetTopic", { message: "Topic is required." });
      return;
    }
    if (data.postTarget === "user" && !Boolean(data.targetUser)) {
      setError("targetUser", { message: "User is required." });
      return;
    }

    if (data.postTarget === "user") {
      data.targetGroup = null;
      setValue("targetGroup", null);
      data.targetTopic = null;
      setValue("targetTopic", null);
    }
    if (data.postTarget === "topic" || data.postTarget === "group") {
      data.targetUser = "";
      setValue("targetUser", "");
    }

    handleData(data as TPostFormData); // TODO remove assertion
  };

  const inputTitleRequirements = {
    required: { value: true, message: "Title is required." },
    maxLength: { value: 100, message: "Too many characters." },
  };

  const inputContentRequirements = {
    required: { value: true, message: "Content is required." },
    maxLength: { value: 4000, message: "Too many characters." },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.postForm}>
      <fieldset className={styles.postContent}>
        <label htmlFor="title">Title</label>
        {errors.title && (
          <div className={styles.error} role="alert">
            {errors.title.message}
          </div>
        )}
        <input
          {...register("title", inputTitleRequirements)}
          aria-invalid={errors.title ? "true" : "false"}
        />
        <label htmlFor="content">Content</label>
        {errors.content && (
          <div className={styles.error} role="alert">
            {errors.content.message}
          </div>
        )}
        <textarea
          {...register("content", inputContentRequirements)}
          aria-invalid={errors.content ? "true" : "false"}
        />
      </fieldset>

      <fieldset id="postTarget">
        <input type="radio" value="group" {...register("postTarget")} /> Group
        <input type="radio" value="topic" {...register("postTarget")} /> Topic
        <input type="radio" value="user" {...register("postTarget")} /> User
      </fieldset>

      {watch("postTarget") !== "user" && (
        <fieldset className={styles.targetSelect}>
          <label htmlFor="targetGroup">Group</label>
          <div className={styles.error} role="alert">
            {errors.targetGroup && errors.targetGroup.message}
          </div>
          <select {...register("targetGroup")}>
            <option></option>
            {groupOptions}
          </select>
          <label htmlFor="targetTopic">Topic</label>
          <div className={styles.error} role="alert">
            {errors.targetTopic && errors.targetTopic.message}
          </div>
          <select {...register("targetTopic")}>
            <option></option>
            {topicOptions}
          </select>
        </fieldset>
      )}

      {watch("postTarget") === "user" && (
        <fieldset className={styles.targetSelect}>
          <label htmlFor="targetUser">User</label>
          <div className={styles.error} role="alert">
            {errors.targetUser && errors.targetUser.message}
          </div>
          <div>list if DM -- User list Title Content</div>
        </fieldset>
      )}

      <button type="submit">Save</button>
    </form>
  );
}

export default CreatePostForm;
