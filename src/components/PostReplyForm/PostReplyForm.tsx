import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { hideReplyForm } from "../../redux/slices/postSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { TPostPut } from "../../types/post";
import styles from "./postReplyForm.module.css";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

type Props = { handleData: (data: TPostPut) => void };

function PostReplyForm({ handleData }: Props) {
  const dispatch = useDispatch<AppDispatch>();
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

  const handleCancelClick = () => {
    dispatch(hideReplyForm());
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
    <>
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
          id="title"
          {...register("title", inputTitleRequirements)}
          aria-invalid={errors.title ? "true" : "false"}
          type="text"
          className={styles.input}
        />
        <label htmlFor="content">
          Reply (
          <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank">
            Markdown
          </a>{" "}
          supported)
        </label>
        {errors.content && (
          <div className={styles.error} role="alert">
            {errors.content.message}
          </div>
        )}
        <textarea
          id="content"
          {...register("content", inputContentRequirements)}
          aria-invalid={errors.content ? "true" : "false"}
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button onClick={handleCancelClick} className="cancel">
            <span>Cancel</span>
            <CloseOutlinedIcon fontSize="small" />
          </button>
          <button type="submit">
            <span>Send reply</span>
            <SendOutlinedIcon fontSize="small" />
          </button>
        </div>
      </form>
    </>
  );
}

export default PostReplyForm;
