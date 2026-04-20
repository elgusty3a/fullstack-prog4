import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="app-header">
      <h1>Ejercicio API Render conexion con Backend</h1>
      <nav>
        <NavLink to="/">Usuarios</NavLink>
        <NavLink to="/add">Agegar nuevo</NavLink>
        <NavLink to="/about">Sobre el proyecto</NavLink>
      </nav>
    </header>
  )
}