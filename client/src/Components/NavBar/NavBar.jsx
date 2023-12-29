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
  const imgURL = "https://previews.123rf.com/images/maiborodin/maiborodin2009/maiborodin200900474/155748800-icono-de-vector-de-consola-de-videojuegos-port%C3%A1til-elemento-simple-de-vector-plano.jpg"
  const dispatch = useDispatch();
  const alphabetSortOrder = useSelector((state) => state.alphabetSortOrder);
  const ratingSortOrder = useSelector((state) => state.ratingSortOrder);

  const filterGenres = (e) => {
    const genreName = e.target.value;
    dispatch(filterByGenres(genreName));
  };

  const filterOrigin = (e) => {
    const origin = e.target.value;
    dispatch(filterByOrigin(origin));
  };

  const handleSortAlphabet = (selectedOrder) => {
    dispatch(sortedAlphabet(selectedOrder));
  };

  const handleSortByRating = (selectedOrder) => {
    dispatch(sortByRating(selectedOrder));
  };

  return (
    <div className={style.div}>
    <img className={style.img} src={imgURL} alt="" />
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
          <option value="all">Seleccionar Origen</option>
          <option value="all">ALL</option>
          <option value="database">Base de Datos</option>
          <option value="api">API</option>
        </select>
        <select
          value={alphabetSortOrder}
          onChange={(e) => handleSortAlphabet(e.target.value)}
        >
          <option>Ordenamiento Alfabetico</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        {/* <button onClick={handleSortByRating}>Ordenar por Rating</button> */}
        <select
          value={ratingSortOrder}
          onChange={(e) => handleSortByRating(e.target.value)}
        >
          <option>Seleccionar Rating</option>
          <option value="desc">Mayor</option>
          <option value="asc">Menor</option>
        </select>
      </div>
    </div>
  );
}

export default NavBar;
