import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styles from "./createTopicForm.module.css";
import { TTopicPost } from "../../types/topic";

type Props = { handleData: (data: TTopicPost) => void };

function CreateTopicForm({ handleData }: Props) {
  const values = {
    name: "",
    description: "",
    color: "#f4ee65",
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
    maxLength: { value: 30, message: "Too many characters." },
  };

  const inputContentRequirements = {
    required: { value: true, message: "Content is required." },
    maxLength: { value: 4000, message: "Too many characters." },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.postForm}>
      <fieldset className={styles.postContent}>
        <label htmlFor="name" className={styles.labelStyle}>
          Name
        </label>
        {errors.name && (
          <div className={styles.error} role="alert">
            {errors.name.message}
          </div>
        )}
        <input
          id="name"
          placeholder="Give the topic a name"
          {...register("name", inputTitleRequirements)}
          aria-invalid={errors.name ? "true" : "false"}
        />
        <label htmlFor="description" className={styles.labelStyle}>
          Description
        </label>
        {errors.description && (
          <div className={styles.error} role="alert">
            {errors.description.message}
          </div>
        )}
        <textarea
          id="description"
          className={styles.txtArea}
          placeholder="This topic is about..."
          {...register("description", inputContentRequirements)}
          aria-invalid={errors.description ? "true" : "false"}
        />

        <div className={styles.colorWrapper}>
          <div>
            <label htmlFor="color" className={styles.labelStyle}>
              Color
            </label>
            <span className={styles.labelDetails}>Select topic color</span>
          </div>
          <input
            id="color"
            type="color"
            className={styles.colorPicker}
            {...register("color")}
          />
        </div>
      </fieldset>
      <div>
        <button type="submit" className={styles.submitButton}>
          Create topic
        </button>
      </div>
    </form>
  );
}

export default CreateTopicForm;
