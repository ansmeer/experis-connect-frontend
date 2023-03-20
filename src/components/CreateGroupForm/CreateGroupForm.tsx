import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TGroupPost } from "../../types/group";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label htmlFor="name">Name: </label>
        {errors.name && <div role="alert">{errors.name.message}</div>}
        <input
          {...register("name", inputNameRequirements)}
          aria-invalid={errors.name ? "true" : "false"}
        />
        <label htmlFor="description">Description: </label>
        {errors.description && (
          <div role="alert">{errors.description.message}</div>
        )}
        <textarea
          {...register("description", inputDescriptionRequirements)}
          aria-invalid={errors.description ? "true" : "false"}
        />
        <label htmlFor="color">Color: </label>
        <input type="color" {...register("color")} />
      </fieldset>
      <fieldset id="privateOption">
        <label htmlFor="private">Private: </label>
        <input type="radio" value="true" {...register("isPrivate")} /> Yes
        <input
          type="radio"
          value="false"
          {...register("isPrivate")}
          checked
        />{" "}
        No
      </fieldset>
      <button type="submit">Save</button>
    </form>
  );
}
export default CreateGroupFrom;
