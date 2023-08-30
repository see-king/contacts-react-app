import { TextField } from "@mui/material";
import React from "react";

type SearchBarProps = {
  value?: string,
  onSearch: (search: string) => void
};



const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {

  const onChange = (ev: any) => {
    const {currentTarget} = ev;

    // TODO: add debiounce
    onSearch(currentTarget.value)
  }

  return <div className="search-bar">
    <TextField placeholder="search..." fullWidth onInput={onChange}/>
  </div>;
};

export default SearchBar;
