import React, { useEffect } from "react";
import Post from "../Post/Post";
import { useSearchParams } from "react-router-dom";
import {useState} from "react"
import { postApi } from "../../apis/postApi";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { TPostWithReplies } from "../../types/post";


function SearchResultList() {


  const [searchParams, setSearchParams] = useSearchParams();
  const[list ,setList]= useState();
  
  const navigate = useNavigate();

  
 
  let isLoaded: Boolean=false;
  let urlParam: string | null = searchParams.get("search")
  

 let variable = fetch(`http://localhost:8080/api/v1/post`)
  .then(res => res.json())
  .then(res => setList(res))

  const { data, isLoading, isError } = useQuery<TPostWithReplies[]>({
    queryKey: ["search", urlParam ],
    queryFn: async () => {
      if(!urlParam)return;
      const postRequest = postApi.get.searchPosts(urlParam);
      console.log(postRequest.uri)
      const response = await fetch(postRequest.uri, postRequest.options);
      if (response.status === 404) {
        navigate("/404");
      }
      return await response.json();
    },
  });

  const searchResults= data?.map(result => <div>{result.id}</div>)


  
  
  return (
    <>
    
      <div>{urlParam}</div>
      <div>{searchResults}</div>
    </>
  );
}

export default SearchResultList;
