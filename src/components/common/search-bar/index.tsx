import { TextField, debounce } from "@mui/material";
import React from "react";

type SearchBarProps = {
  value?: string,
  onSearch: (search: string) => void
};



const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {

  const debouncedSearch = debounce( onSearch, 200 )

  const onChange = (ev: any) => {
    const {target} = ev;
    debouncedSearch(target.value)
  }

  return <div className="search-bar">
    <TextField placeholder="search..." fullWidth onInput={onChange}/>
  </div>;
};

export default SearchBar;
