import HomeIcon from '@material-ui/icons/Home';
import '../styles/header.css'

function Header(props) {
    return (
       <div className="header">
           <div>
                {props.children}
           </div>
           <div>
                <HomeIcon/>
           </div>
       </div>
    )
}

export default Header