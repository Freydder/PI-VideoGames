import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/action";

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSearchClick = () => {
    dispatch(getByName(name));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearchClick}>Buscar</button>
    </div>
  );
}

export default SearchBar;
