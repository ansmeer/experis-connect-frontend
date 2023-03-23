import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { groupApi } from "../../apis/groupApi";
import { topicApi } from "../../apis/topicApi";
import { userApi } from "../../apis/userApi";
import { TGroup } from "../../types/group";
import { TPostFormData } from "../../types/post";
import { TTopic } from "../../types/topic";
import { TUserMini } from "../../types/user";
import styles from "./createPostForm.module.css";

type Props = { handleData: (data: TPostFormData) => void };

function CreatePostForm({ handleData }: Props) {
  const values = {
    postTarget: "GROUP",
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
  const [selectedTab, setSelectedTab] = useState<string>("GROUP");

  const groupsQuery = useQuery<TGroup[]>({
    queryKey: "groups",
    queryFn: async () => {
      const groupRequest = groupApi.get.userGroups();
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const topicsQuery = useQuery<TTopic[]>({
    queryKey: "topics",
    queryFn: async () => {
      const groupRequest = topicApi.get.userTopics();
      const response = await fetch(groupRequest.uri, groupRequest.options);
      return await response.json();
    },
  });

  const userQuery = useQuery<TUserMini[]>({
    queryKey: "user",
    queryFn: async () => {
      const userRequest = userApi.get.allUsers();
      const response = await fetch(userRequest.uri, userRequest.options);
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
  const userOptions = userQuery.data?.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (selectedTab === "GROUP" && !Boolean(data.targetGroup)) {
      setError("targetGroup", { message: "Group is required." });
      setValue("targetUser", "");
      setValue("targetTopic", null);
      return;
    }
    if (selectedTab === "TOPIC" && !Boolean(data.targetTopic)) {
      setError("targetTopic", { message: "Topic is required." });
      setValue("targetUser", "");
      setValue("targetGroup", null);
      return;
    }
    if (selectedTab === "USER" && !Boolean(data.targetUser)) {
      setError("targetUser", { message: "User is required." });
      setValue("targetGroup", null);
      setValue("targetTopic", null);
      return;
    }

    if (selectedTab === "USER") {
      data.targetGroup = null;
      data.targetTopic = null;
    }

    if (selectedTab === "GROUP") {
      data.targetUser = "";
      data.targetTopic = null;
    }

    if (selectedTab === "TOPIC") {
      data.targetUser = "";
      data.targetGroup = null;
    }

    setValue("postTarget", selectedTab);

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

  const handleGroupClick = () => {
    setSelectedTab("GROUP");
    setValue("postTarget", "GROUP");
  };
  const handleTopicClick = () => {
    setSelectedTab("TOPIC");
    setValue("postTarget", "TOPIC");
  };
  const handleDmClick = () => {
    setSelectedTab("USER");
    setValue("postTarget", "USER");
  };

  return (
    <main className={styles.create}>
      <nav aria-label="post target" className={styles["top-menu"]}>
        <div>
          <button
            onClick={handleGroupClick}
            className={selectedTab === "GROUP" ? styles.selected : ""}>
            Group
          </button>
          <button
            onClick={handleTopicClick}
            className={selectedTab === "TOPIC" ? styles.selected : ""}>
            Topic
          </button>
          <button
            onClick={handleDmClick}
            className={selectedTab === "USER" ? styles.selected : ""}>
            DM
          </button>
        </div>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.postForm}>
        {watch("postTarget") === "GROUP" && (
          <fieldset className={styles.targetSelect}>
            <label htmlFor="targetGroup" className={styles.labelText}>
              Group
            </label>
            {errors.targetGroup && (
              <div className={styles.error} role="alert">
                {errors.targetGroup.message}
              </div>
            )}
            <select
              id="targetGroup"
              className={styles.selectStyles}
              {...register("targetGroup")}>
              <option>Select</option>
              {groupOptions}
            </select>
          </fieldset>
        )}
        {watch("postTarget") === "TOPIC" && (
          <fieldset className={styles.targetSelect}>
            <label htmlFor="targetTopic" className={styles.labelText}>
              Topic
            </label>
            <div className={styles.error} role="alert">
              {errors.targetTopic && errors.targetTopic.message}
            </div>
            <select
              id="targetTopic"
              className={styles.selectStyles}
              {...register("targetTopic")}>
              <option>Select</option>
              {topicOptions}
            </select>
          </fieldset>
        )}

        {watch("postTarget") === "USER" && (
          <fieldset className={styles.targetSelect}>
            <label htmlFor="targetUser" className={styles.labelText}>
              User
            </label>
            <div className={styles.error} role="alert">
              {errors.targetUser && errors.targetUser.message}
            </div>
            <select
              id="targetUser"
              className={styles.selectStyles}
              {...register("targetUser")}>
              <option>Select</option>
              {userOptions}
            </select>
          </fieldset>
        )}
        <fieldset className={styles.postContent}>
          <label htmlFor="title" className={styles.labelText}>
            Post title
          </label>
          {errors.title && (
            <div className={styles.error} role="alert">
              {errors.title.message}
            </div>
          )}
          <input
            id="title"
            placeholder="Meet our Alumni..."
            {...register("title", inputTitleRequirements)}
            aria-invalid={errors.title ? "true" : "false"}
          />
          <label htmlFor="content" className={styles.labelText}>
            Content
          </label>
          {errors.content && (
            <div className={styles.error} role="alert">
              {errors.content.message}
            </div>
          )}
          <textarea
            id="content"
            className={styles.txtArea}
            placeholder="What do you want to say?"
            {...register("content", inputContentRequirements)}
            aria-invalid={errors.content ? "true" : "false"}
          />
        </fieldset>
        <div>
          <button className={styles.submitButton} type="submit">
            Create post
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreatePostForm;
