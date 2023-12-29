import axios from "axios";
export const GET_NAME = "GET_NAME";
export const GET_GAMES = "GET_GAMES";
export const FILTER_BY_DETAIL = "FILTER_BY_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const SORT_ALPHABET = "SORT_ALPHABET";
export const SORT_BY_RATING = "SORT_BY_RATING";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const CREATE_GAME = "CREATE_GAME";

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      if (name) {
        let url = `http://localhost:3001/videogames/name?name=${name}`;
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        dispatch({
          type: GET_NAME,
          payload: data,
        });
      } else {
        dispatch(getGames());
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };
};

export const getGames = () => {
  return async function (dispatch) {
    try {
      const serverData = await axios.get("http://localhost:3001/videogames");
      const games = serverData.data;
      // console.log(games);
      dispatch({
        type: GET_GAMES,
        payload: games,
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
};

export const filterByDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      dispatch({ type: FILTER_BY_DETAIL, payload: data });
    } catch (error) {
      console.error("Error al obtener detalles del videojuego:", error);
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    let genres = await axios.get("http://localhost:3001/genres");
    try {
      dispatch({
        type: GET_GENRES,
        payload: genres.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const filterByGenres = (genreName) => {
  return function (dispatch) {
    try {
      dispatch({
        type: FILTER_BY_GENRES,
        payload: genreName,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const filterByOrigin = (option) => {
  return function (dispatch) {
    try {
      dispatch({
        type: FILTER_BY_ORIGIN,
        payload: option,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const sortedAlphabet = (order) => {
  return {
    type: SORT_ALPHABET,
    payload: order,
  };
};

export const sortByRating = (sortOrder) => {
  return {
    type: SORT_BY_RATING,
    payload: sortOrder,
  };
};

export const changePage = (pageNumber) => ({
  type: CHANGE_PAGE,
  payload: pageNumber,
});

export const createGame = (gameData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames",
        gameData
      );
      const newGame = response.data;
      dispatch({
        type: CREATE_GAME,
        payload: newGame,
      });
    } catch (error) {
      console.error("Error al crear el juego:", error.message);
    }
  };
};
