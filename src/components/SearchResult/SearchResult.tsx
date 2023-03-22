import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultList from "../SearchResultList/SearchResultList";

function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParam = searchParams.get("search");

  useEffect(() => {
    document.title = urlParam
      ? `Search: ${urlParam} | Experis Connect`
      : "Experis Connect";
  }, [urlParam]);

  return (
    <div>
      <h1>Search results for &laquo;{urlParam}&raquo;</h1>
      <SearchResultList search={urlParam} />
    </div>
  );
}

export default SearchResult;
