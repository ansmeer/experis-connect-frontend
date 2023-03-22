import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { TUser, TUserPut } from "../../types/user";
import styles from "./profileSettings.module.css";

type Props = { handleData: (data: TUser) => void };

function ProfileSettingsForm({ handleData }: Props) {
  const navigate = useNavigate();
  const values = useSelector((state: RootState) => state.user.details);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {}, values });

  const onSubmit = (data: TUser) => {
    handleData(data);
  };

  const handleEditClick = () => {
    navigate("/profile/");
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
    <div className={styles.settingsBackground}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
        <label className={styles.labelStyle} htmlFor="name">
          Name
        </label>
        {errors.name && (
          <div className={styles.error} role="alert">
            {errors.name.message}
          </div>
        )}
        <input
          className={styles.inputBackground}
          {...register("name", inputNameRequirements)}
          aria-invalid={errors.name ? "true" : "false"}
        />

        <label className={styles.labelStyle} htmlFor="status">
          Status
        </label>
        {errors.status && (
          <div className={styles.error} role="alert">
            {errors.status.message}
          </div>
        )}
        <input
          className={styles.inputBackground}
          {...register("status", inputTextRequirements)}
          aria-invalid={errors.status ? "true" : "false"}
        />
        <label className={styles.labelStyle} htmlFor="funFact">
          Fun fact
        </label>
        {errors.funFact && (
          <div className={styles.error} role="alert">
            {errors.funFact.message}
          </div>
        )}
        <input
          className={styles.inputBackground}
          {...register("funFact", inputTextRequirements)}
          aria-invalid={errors.funFact ? "true" : "false"}
        />
        <label className={styles.labelStyle} htmlFor="bio">
          Bio
        </label>
        {errors.bio && (
          <div className={styles.error} role="alert">
            {errors.bio.message}
          </div>
        )}
        <input
          className={styles.inputBackground}
          {...register("bio", inputTextRequirements)}
          aria-invalid={errors.bio ? "true" : "false"}
        />
        <label className={styles.labelStyle} htmlFor="picture">
          Picture URL
        </label>
        {errors.picture && (
          <div className={styles.error} role="alert">
            {errors.picture.message}
          </div>
        )}
        <input
          className={styles.inputBackground}
          {...register("picture", inputPictureRequirements)}
          aria-invalid={errors.picture ? "true" : "false"}
        />
        <div className={styles.buttons}>
          <button className={styles.profileSettingsButton} type="submit">
            Save settings
          </button>
          <button className={styles.buttonLight} onClick={handleEditClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSettingsForm;
