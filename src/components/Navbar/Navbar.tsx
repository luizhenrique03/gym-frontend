import './Navbar.css';
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Fecha ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2 className="logo">logo</h2>
            </div>

            <div className="navbar-center">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/workouts">Exercises</Link>
                <Link to="/diets">nutrição</Link>
                <Link to="/classes">Aulas</Link>
                <Link to="/progress">progresso</Link>
            </div>

            <div className="navbar-right" ref={menuRef}>
                <button 
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                {menuOpen && (
                    <div className="dropdown-menu">
                        <Link 
                            to="/perfil" 
                            onClick={() => setMenuOpen(false)}
                        >
                            Perfil
                        </Link>

                        <button 
                            className="sair"
                            onClick={() => {
                                console.log("logout");
                                setMenuOpen(false);
                            }}
                        >
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}