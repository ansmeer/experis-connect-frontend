import React from "react";
import PostList from "../PostList/PostList";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styles from "../CreatePostForm/createPostForm.module.css";
import { TPostFormData } from "../../types/post";


import { useQuery } from "react-query";
import { groupApi } from "../../apis/groupApi";
import { topicApi } from "../../apis/topicApi";
import { TGroup } from "../../types/group";

import { TTopic, TTopicPost } from "../../types/topic";


type Props = { handleData: (data: TTopicPost) => void };

function CreateTopicForm({ handleData }: Props) {
  const values = {
    name:"" ,
    description: "",
    color:""
    
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
  } = useForm({
    defaultValues: {},
    values,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleData(data as TTopicPost); // TODO remove assertion
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
    <div>
      <h1>Topic Page</h1>
      {/* <PostList /> */}
      

      <form onSubmit={handleSubmit(onSubmit)} className={styles.postForm}>
      <fieldset className={styles.postContent}>
        <label htmlFor="name">Name</label>
        {errors.name && (
          <div className={styles.error} role="alert">
            {errors.name.message}
          </div>
        )}
        <input
          {...register("name", inputTitleRequirements)}
          aria-invalid={errors.name ? "true" : "false"}
        />
        <label htmlFor="description">Content</label>
        {errors.description && (
          <div className={styles.error} role="alert">
            {errors.description.message}
          </div>
        )}
        <textarea
          {...register("description", inputContentRequirements)}
          aria-invalid={errors.description ? "true" : "false"}
        />
     

      
        <label htmlFor="color">Color</label>
        <input type="color" {...register("color")}/>
        
        
      </fieldset>

      <button type="submit">Save</button>
    </form>
    </div>
  );
}

export default CreateTopicForm;
