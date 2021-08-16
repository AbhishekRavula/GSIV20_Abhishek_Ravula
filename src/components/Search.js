import '../styles/SearchNav.css';
import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import { fetchSearchResults } from '../store/reducer'
import { useDispatch } from 'react-redux'

function SearchNav() {

    const [searchTerm, setsearchTerm] = useState("")
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchSearchResults(searchTerm))
    }, [searchTerm])

    return (
        <div className="searchInput">
            <i className="searchIcon"><SearchIcon /></i>
            <input type="text" placeholder="Search" value={searchTerm} onChange={(event) => { setsearchTerm(event.target.value) }} />
        </div>
    )
}
export default SearchNav