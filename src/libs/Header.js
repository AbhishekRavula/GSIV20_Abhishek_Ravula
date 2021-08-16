import HomeIcon from '@material-ui/icons/Home';
import '../styles/header.css';
import { useHistory } from 'react-router-dom'

function Header(props) {

    let history = useHistory()

    return (
       <div className="header">
           <div>
                {props.children}
           </div>
           <div>
                <HomeIcon onClick={() => history.push("/")}/>
           </div>
       </div>
    )
}

export default Header