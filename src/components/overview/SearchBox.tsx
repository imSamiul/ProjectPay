import { useState } from "react";

function SearchBox() {
  const [searchText, setSearchText] = useState("");

  function searchTextChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Search:</h2>
      <input
        type="text"
        value={searchText}
        onChange={searchTextChangeHandler}
        placeholder="Type to search project by Name or ID"
        className="input bg-martinique-100 w-full "
      />
    </div>
  );
}

export default SearchBox;
