import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, getGames, getGenres, changePage } from "../../redux/action";
import NavBar from "../../Components/NavBar/NavBar";
import Cards from "../../Components/Cards/Cards";
import Pagination from "../../Components/Pagination/Pagination";
import style from "./Home.module.css";

function Home() {
  const games = useSelector((state) => state.games);
  const genres = useSelector((state) => state.genres);
  const filteredGames = useSelector((state) => state.filteredGames);
  const sortType = useSelector((state) => state.sortType);
  const pagination = useSelector((state) => state.pagination);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
    if (genres.length === 0) {
      dispatch(getGenres());
    }
  }, [dispatch, genres.length]);

  const indexOfLastGame = pagination.currentPage * pagination.gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - pagination.gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  useEffect(() => {
    let sortOrder;
    let sortedGames;
    if (filteredGames.length > 0) {
      if (sortType === "alphabet") {
        sortOrder = sortOrder || "asc";
        sortedGames = [...filteredGames].sort((a, b) =>
          sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
      } else if (sortType === "rating") {
        sortedGames = [...filteredGames].sort((a, b) => b.rating - a.rating);
      } else {
        sortedGames = [...filteredGames];
      }
    }
  }, [dispatch, filteredGames, sortType]);

  const handleSearch = (name) => {
    if (name) {
      dispatch(getByName(name));
    }
  };

  return (
    <div className={style.div}>
      <NavBar handleSearch={handleSearch} genres={genres} />
      <Cards currentGames={currentGames} />
      <div>
        <Pagination
          gamesPerPage={pagination.gamesPerPage}
          totalGames={filteredGames.length}
          currentPage={pagination.currentPage}
          onPageChange={(pageNumber) => dispatch(changePage(pageNumber))}
        />
      </div>
    </div>
  );
}

export default Home;
