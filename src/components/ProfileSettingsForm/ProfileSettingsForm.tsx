import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TUserPut } from "../../types/user";
import styles from "./profileSettings.module.css";

type Props = { handleData: (data: TUserPut) => void };

function ProfileSettingsForm({ handleData }: Props) {
  const values = useSelector((state: RootState) => state.user.details);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {}, values });

  const onSubmit = (data: TUserPut) => {
    handleData(data);
  };

  const inputNameRequirements = {
    required: { value: true, message: "Name is required." },
  };

  const inputTextRequirements = {
    maxLength: { value: 255, message: "Too many characters." },
  };

  const inputPictureRequirements = {
    maxLength: { value: 255, message: "Too many characters." },
    pattern: {
      value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,
      message: "Picture is not a valid URL.",
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
      <label htmlFor="name">Name</label>
      {errors.name && (
        <div className={styles.error} role="alert">
          {errors.name.message}
        </div>
      )}
      <input
        {...register("name", inputNameRequirements)}
        aria-invalid={errors.name ? "true" : "false"}
      />
      <label htmlFor="status">Status</label>
      {errors.status && (
        <div className={styles.error} role="alert">
          {errors.status.message}
        </div>
      )}
      <input
        {...register("status", inputTextRequirements)}
        aria-invalid={errors.status ? "true" : "false"}
      />
      <label htmlFor="funFact">Fun fact</label>
      {errors.funFact && (
        <div className={styles.error} role="alert">
          {errors.funFact.message}
        </div>
      )}
      <input
        {...register("funFact", inputTextRequirements)}
        aria-invalid={errors.funFact ? "true" : "false"}
      />
      <label htmlFor="bio">Bio</label>
      {errors.bio && (
        <div className={styles.error} role="alert">
          {errors.bio.message}
        </div>
      )}
      <input
        {...register("bio", inputTextRequirements)}
        aria-invalid={errors.bio ? "true" : "false"}
      />
      <label htmlFor="picture">Picture URL</label>
      {errors.picture && (
        <div className={styles.error} role="alert">
          {errors.picture.message}
        </div>
      )}
      <input
        {...register("picture", inputPictureRequirements)}
        aria-invalid={errors.picture ? "true" : "false"}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default ProfileSettingsForm;
