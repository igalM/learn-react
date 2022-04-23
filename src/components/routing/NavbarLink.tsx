import { NavLink } from "react-router-dom";

type Props = {
    to: string;
    children: React.ReactNode;
}

export default function NavbarLink({ to, children }: Props) {
    return <li className="nav-item"><NavLink className={(({ isActive }) => isActive ? 'nav-link active' : 'nav-link')} to={to}>{children}</NavLink></li>
}