import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { NavLink } from "./nav-link";

export function Header() {
    
  return (
    <header className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="Nlw Unite Icon" />

      <nav className="flex items-center gap-5">
        <NavLink href="#" className="text-zinc-300">
          Eventos
        </NavLink>
        <NavLink href="#">Participantes</NavLink>
      </nav>
    </header>
  );
}
