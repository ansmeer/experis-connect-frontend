import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TGroupPost } from "../../types/group";
import styles from "../CreateGroup/createGroup.module.css";

type Props = { handleData: (data: TGroupPost) => void };

function CreateGroupFrom({ handleData }: Props) {
  const values = {
    name: "",
    description: "",
    color: "#000000",
    isPrivate: false,
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
    maxLength: { value: 100, message: "Too many characters" },
  };
  const inputDescriptionRequirements = {
    required: { value: true, message: "Description is required." },
    maxLength: { value: 254, message: "Too many characters" },
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleData(data as TGroupPost); // TODO remove assertion
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.postContent}>
          <label htmlFor="name">Name </label>
          {errors.name && <div role="alert">{errors.name.message}</div>}
          <input
            placeholder="Give the group a name"
            {...register("name", inputNameRequirements)}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <label htmlFor="description">Description: </label>
          {errors.description && (
            <div role="alert">{errors.description.message}</div>
          )}
          <textarea
            placeholder="E.g. This group is about..."
            {...register("description", inputDescriptionRequirements)}
            aria-invalid={errors.description ? "true" : "false"}
          />
          <label htmlFor="color">Color </label>
          <span className={styles.labelDetails}>Select group color</span>
          <input
            type="color"
            className={styles.colorPicker}
            {...register("color")}
          />
        </fieldset>
        <fieldset id="privateOption">
          <div className={styles.publicFields}>
            <div className={styles.radioBox}>
              <input type="radio" value="true" {...register("isPrivate")} />
            </div>
            <div className={styles.raidoText}>
              <label htmlFor="public" className={styles.raidoOption}>
                Public
              </label>
              <span className={styles.radioDetails}>
                Everyone can see members in the group and what they publish
              </span>
            </div>
          </div>
          <div className={styles.privateFields}>
            <div className={styles.radioBox}>
              <input
                type="radio"
                value="false"
                {...register("isPrivate")}
                checked
              />
            </div>
            <div className={styles.raidoText}>
              <label htmlFor="public" className={styles.raidoOption}>
                Private{" "}
              </label>
              <span className={styles.radioDetails}>
                Only members can see group members and what they publish
              </span>
            </div>
          </div>
        </fieldset>
        <button type="submit" className={styles.submitButton}>
          Create group
        </button>
      </form>
    </div>
  );
}
export default CreateGroupFrom;
