import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TGroupPost } from "../../types/group";
import styles from "./createGroupForm.module.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

type Props = { handleData: (data: TGroupPost) => void };

function CreateGroupFrom({ handleData }: Props) {
  const values = {
    name: "",
    description: "",
    color: "#f4ee65",
    private: false,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    values,
  });

  const inputNameRequirements = {
    required: { value: true, message: "Name is required." },
    maxLength: { value: 30, message: "Too many characters" },
  };
  const inputDescriptionRequirements = {
    required: { value: true, message: "Description is required." },
    maxLength: { value: 254, message: "Too many characters" },
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleData(data as TGroupPost); // TODO remove assertion
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.postForm}>
      <fieldset className={styles.postContent}>
        <label htmlFor="name" className={styles.labelStyle}>
          Name
        </label>
        {errors.name && (
          <div role="alert" className={styles.error}>
            {errors.name.message}
          </div>
        )}
        <input
          id="name"
          placeholder="Give the group a name"
          {...register("name", inputNameRequirements)}
          aria-invalid={errors.name ? "true" : "false"}
        />
        <label htmlFor="description" className={styles.labelStyle}>
          Description
        </label>
        {errors.description && (
          <div role="alert" className={styles.error}>
            {errors.description.message}
          </div>
        )}
        <textarea
          id="description"
          className={styles.txtArea}
          placeholder="This group is about..."
          {...register("description", inputDescriptionRequirements)}
          aria-invalid={errors.description ? "true" : "false"}
        />
        <div className={styles.colorWrapper}>
          <div>
            <label htmlFor="color" className={styles.labelStyle}>
              Color
            </label>
            <span className={styles.labelDetails}>Select group color</span>
          </div>
          <input
            id="color"
            type="color"
            className={styles.colorPicker}
            {...register("color")}
          />
        </div>
      </fieldset>
      <fieldset id="privateOption">
        <div className={styles.publicFields}>
          <div className={styles.radioBox}>
            <input
              className={styles.radioButton}
              type="radio"
              id="public"
              value="false"
              {...register("private")}
              defaultChecked
            />
          </div>
          <div className={styles.radioText}>
            <label htmlFor="public" className={styles.radioOption}>
              <PublicOutlinedIcon fontSize="small" />
              <div>
                <div> Public</div>
                <div className={styles.radioDetails}>
                  Everyone can see members in the group and what they publish
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className={styles.privateFields}>
          <div className={styles.radioBox}>
            <input
              className={styles.radioButton}
              id="private"
              type="radio"
              value="true"
              {...register("private")}
            />
          </div>
          <div className={styles.radioText}>
            <label htmlFor="private" className={styles.radioOption}>
              <LockOutlinedIcon fontSize="small" />
              <div>
                <div> Private</div>
                <div className={styles.radioDetails}>
                  Only members can see group members and what they publish
                </div>
              </div>
            </label>
          </div>
        </div>
      </fieldset>
      <button type="submit" className={styles.submitButton}>
        Create group
      </button>
    </form>
  );
}
export default CreateGroupFrom;
