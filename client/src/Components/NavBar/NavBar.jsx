import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import {
  filterByGenres,
  filterByOrigin,
  sortedAlphabet,
  sortByRating,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

function NavBar({ genres }) {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.sortType);
  const [sortOrder, setSortOrder] = useState(sortType || 'asc');

  const filterGenres = (e) => {
    const genreName = e.target.value;
    dispatch(filterByGenres(genreName));
  };

  const filterOrigin = (e) => {
    const origin = e.target.value;
    dispatch(filterByOrigin(origin));
  };

  // const handleSortAlphabet = () => {
  //   dispatch(sortedAlphabet());
  // };

  const handleSortAlphabet = (selectedOrder) => {
    setSortOrder(selectedOrder);
    dispatch(sortedAlphabet(selectedOrder));
  };

  const handleSortByRating = () => {
    dispatch(sortByRating());
  };

  return (
    <div className={style.div}>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/form">
        <button>Form</button>
      </Link>
      <SearchBar />
      <div>
        <select onChange={(e) => filterGenres(e)}>
          <option>Seleccionar Género</option>
          {genres &&
            genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            ))}
        </select>
        <select onChange={(e) => filterOrigin(e)}>
          <option value="all">Seleccionar Opcion</option>
          <option value="all">ALL</option>
          <option value="database">Base de Datos</option>
          <option value="api">API</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => handleSortAlphabet(e.target.value)}
        >
          <option>Seleccionar</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <button onClick={handleSortByRating}>Ordenar por Rating</button>
      </div>
    </div>
  );
}

export default NavBar;
