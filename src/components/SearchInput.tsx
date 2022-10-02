import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export interface ISearchInputProps {
  setSearchQuery: (searchQuery: string) => void;
}

export function SearchInput(props: ISearchInputProps) {
  const { setSearchQuery } = props;
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 150)

  useEffect(() => {
    setSearchQuery(debouncedQuery)
  }, [debouncedQuery, setSearchQuery]) 
  return (
    <div>
      <label htmlFor="Search" className="mt-3">
        Search! Try me!
      </label>
      <input
        id="search"
        className="form-control full-width"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={(event) => {
          console.log('Firing')
          setQuery(event.target.value);
        }}
      />
    </div>
  );
}
