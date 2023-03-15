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
    maxLength: { value: 100, message: "Too many characters." },
  };

  const inputContentRequirements = {
    maxLength: { value: 4000, message: "Too many characters." },
  };

  return (
    <>
      <div>Reply to post #{selectedPost?.id}</div>
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
        />
        <button type="submit">Send reply</button>
      </form>
    </>
  );
}

export default PostReplyForm;
