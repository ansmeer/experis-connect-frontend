import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { TPostPut } from "../../types/post";
import styles from "./postReplyForm.module.css";

type Props = { handleData: (data: TPostPut) => void };

function PostReplyForm({ handleData }: Props) {
  const selectedPost = useSelector(
    (state: RootState) => state.post.replyToPost
  );

  const values: TPostPut = {
    title: "",
    content: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {}, values });

  const onSubmit = (data: TPostPut) => {
    handleData(data);
    reset();
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
    <div className={styles.reply}>
      <div className={styles["form-title"]}>
        Reply to post #{selectedPost?.id}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.replyForm}>
        <label htmlFor="title">Reply title</label>
        {errors.title && (
          <div className={styles.error} role="alert">
            {errors.title.message}
          </div>
        )}
        <input
          {...register("title", inputTitleRequirements)}
          aria-invalid={errors.title ? "true" : "false"}
          type="text"
          className={styles.input}
        />
        <label htmlFor="content">Reply</label>
        {errors.content && (
          <div className={styles.error} role="alert">
            {errors.content.message}
          </div>
        )}
        <textarea
          {...register("content", inputContentRequirements)}
          aria-invalid={errors.content ? "true" : "false"}
          className={styles.input}
        />
        <button type="submit">Send reply</button>
      </form>
    </div>
  );
}

export default PostReplyForm;
