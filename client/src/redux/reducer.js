import {
  GET_NAME,
  GET_GAMES,
  FILTER_BY_DETAIL,
  GET_GENRES,
  FILTER_BY_GENRES,
  FILTER_BY_ORIGIN,
  SORT_ALPHABET,
  SORT_BY_RATING,
  CHANGE_PAGE,
  CREATE_GAME,
} from "./action";

const initialState = {
  games: [],
  detail: null,
  genres: [],
  filteredGames: [],
  alphabetSortOrder: "asc",
  ratingSortOrder: "asc",
  pagination: {
    currentPage: 1,
    gamesPerPage: 15,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NAME:
      return { ...state, filteredGames: action.payload };
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        filteredGames: action.payload,
      };
    case FILTER_BY_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case FILTER_BY_GENRES:
      const genreName = action.payload;
      if (!genreName || genreName.trim() === "") {
        return {
          ...state,
          filteredGames: state.games,
        };
      }
      const filteredGenre = state.games.filter((game) => {
        const gameGenres = (game.genres || "").split(", ");
        return gameGenres.includes(genreName);
      });
      return {
        ...state,
        filteredGames: filteredGenre,
      };
    case FILTER_BY_ORIGIN:
      const origin = action.payload;
      const filteredGamesByOrigin = state.games.filter((game) => {
        if (origin === "database") {
          return game.createdinDB === true;
        }
        if (origin === "api") {
          return game.createdinDB === false;
        }
        return true;
      });
      return {
        ...state,
        filteredGames: filteredGamesByOrigin,
      };
    case SORT_ALPHABET:
      const alphabetSortOrder = action.payload;
      const sortedAlphabet = [...state.filteredGames].sort((a, b) => {
        if (alphabetSortOrder === "asc") {
          return a.name.localeCompare(b.name);
        }
        if (alphabetSortOrder === "desc") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
      return {
        ...state,
        filteredGames: sortedAlphabet,
        alphabetSortOrder,
      };
    case SORT_BY_RATING:
      const ratingSortOrder = action.payload;
      const sortedByRating = [...state.filteredGames].sort((a, b) =>
        ratingSortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
      );
      return {
        ...state,
        filteredGames: sortedByRating,
        ratingSortOrder,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      };
    case CREATE_GAME:
      return {
        ...state,
        games: [...state.games, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
