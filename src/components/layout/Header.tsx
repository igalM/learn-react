import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context";
import NavbarLink from "../routing/NavbarLink";

export default function Header() {
    const { user } = useAuthContext();

    let navbar = <ul className="nav navbar-nav pull-xs-right">
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="/login">Sign in</NavbarLink>
        <NavbarLink to="/register">Sign up</NavbarLink>
    </ul>;

    if (user) {
        navbar = <ul className="nav navbar-nav pull-xs-right">
            <NavbarLink to="/">Home</NavbarLink>
            <NavbarLink to="/editor"><i className="ion-compose"></i>&nbsp;New Article</NavbarLink>
            <NavbarLink to="/settings"><i className="ion-gear-a"></i>&nbsp;Settings</NavbarLink>
            <NavbarLink to="/profile">My Profile</NavbarLink>
        </ul>
    }

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="/">conduit</Link>
                {navbar}
            </div>
        </nav>
    )
}