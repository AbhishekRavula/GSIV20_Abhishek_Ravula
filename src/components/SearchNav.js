import '../styles/SearchNav.css'
import SearchIcon from '@material-ui/icons/Search';
import Header from '../libs/Header'

function SearchNav() {
    return (
        <Header>
            <div className="searchInput">
                <i className="searchIcon"><SearchIcon /></i>
                <input type="text" placeholder="Search" />
            </div>
        </Header>
        
    )
}
export default SearchNav