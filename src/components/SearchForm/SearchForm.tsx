import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import styles from "./searchForm.module.css";

function SearchForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/search?search=${data.search}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["search"]}>
      <input
        {...register("search")}
        type="text"
        aria-label="search"
        className="inputSearch"
        placeholder="Search here"
      />

      <button type="submit" className={styles["button-search"]}>
        <SearchIcon />
      </button>
    </form>
  );
}

export default SearchForm;
