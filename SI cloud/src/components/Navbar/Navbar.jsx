import { NavLink } from 'react-router-dom'
import '../Navbar/Navbar.less'

const Navbar = (props) => {
    return(
        <div className="navbar">
            <NavLink className="navlink" to="/"><h3 className="logo">SI cloud</h3></NavLink>
            <NavLink className="navlink" to="/login"><p className="username">{props.name}</p></NavLink>
        </div>
    )
}

export default Navbar