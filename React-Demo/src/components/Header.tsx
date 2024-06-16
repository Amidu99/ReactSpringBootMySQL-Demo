import {NavLink} from "react-router-dom";

const Header = () => {
    return (
    <header>
        <div className="navigation">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/employees">Employees</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/settings">Settings</NavLink></li>
            </ul>
        </div>
    </header>
    );
}
export default Header;