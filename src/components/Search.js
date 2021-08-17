import "../styles/search.css";
import SearchIcon from "@material-ui/icons/Search";
import { fetchMovies, fetchSearchResults } from "../store/reducer";
import { useDispatch } from "react-redux";
import { SET_MOVIES, SET_IS_SEARCHING } from "../store/actions";

function SearchNav() {
  const dispatch = useDispatch();

  const onSearchTermChanged = (event) => {
    if (event.target.value !== "") {
      dispatch({type: SET_IS_SEARCHING, isSearching: true});
      dispatch(fetchSearchResults(event.target.value, SET_MOVIES, 1));
    } else {
      dispatch({type: SET_IS_SEARCHING, isSearching: false});
      dispatch(fetchMovies(SET_MOVIES));
    }
  };

  return (
    <div className="searchInput">
      <i className="searchIcon">
        <SearchIcon />
      </i>
      <input
        type="text"
        placeholder="Search"
        onChange={onSearchTermChanged}
      />
    </div>
  );
}
export default SearchNav;
