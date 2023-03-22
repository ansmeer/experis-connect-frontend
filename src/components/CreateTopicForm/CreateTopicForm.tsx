import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styles from "../CreateGroup/createGroup.module.css";
import { TTopicPost } from "../../types/topic";

type Props = { handleData: (data: TTopicPost) => void };

function CreateTopicForm({ handleData }: Props) {
  const values = {
    name: "",
    description: "",
    color: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    values,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleData(data as TTopicPost); // TODO remove assertion
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.postForm}>
        <fieldset className={styles.postContent}>
          <label htmlFor="name">Name</label>
          {errors.name && (
            <div className={styles.error} role="alert">
              {errors.name.message}
            </div>
          )}
          <input
            placeholder="Give the topic a name"
            {...register("name", inputTitleRequirements)}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <label htmlFor="description">Description</label>
          {errors.description && (
            <div className={styles.error} role="alert">
              {errors.description.message}
            </div>
          )}
          <textarea
            placeholder="E.g. This topic is about..."
            {...register("description", inputContentRequirements)}
            aria-invalid={errors.description ? "true" : "false"}
          />

          <label htmlFor="color">Color</label>
          <span className={styles.labelDetails}>Select group color</span>
          <input
            type="color"
            className={styles.colorPicker}
            {...register("color")}
          />
        </fieldset>
        <div>
          <button type="submit" className={styles.submitButton}>
            Create topic
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTopicForm;
