import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/search?search=${data.search}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("search")} type="text" aria-label="search" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
