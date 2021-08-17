import HomeIcon from "@material-ui/icons/Home";
import "../styles/header.css";
import { useHistory } from "react-router-dom";
import { SET_IS_SEARCHING } from "../store/actions";
import { useDispatch } from "react-redux";
import { fetchMovies } from '../store/reducer';
import { SET_MOVIES } from '../store/actions';

function Header(props) {
  let history = useHistory();
  let dispatch = useDispatch();

  const onHomeClick = () => {
    dispatch({ type: SET_IS_SEARCHING, isSearching: false });
    dispatch(fetchMovies(SET_MOVIES))
    history.push("/");
  };

  return (
    <div className="header">
      <div>{props.children}</div>
      <div>
        <HomeIcon onClick={onHomeClick} />
      </div>
    </div>
  );
}

export default Header;
