import type { ReactElement } from 'react';
import Card from '../components/CardUser';
// import type { TipoFeriado } from '../components/CardUser';


type Usuarios = {
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  birthDate: string,
  fechaAlta: string
}


type ListProps = {
  usuarios: Usuarios[];
  loading: boolean;
  error: string | null;
}
//div para mensaje de carga
const loadingDiv = (): ReactElement =>
  <div className="list-page">
    <p>Cargando...</p>
  </div>;

//div para mensaje de error
const errorDiv = (error: string | null): ReactElement =>
  <div className="list-page">
    <p>Error al cargar los usuarios: {error}</p>
  </div>;

//div para mensaje de usuarios vacíos
const emptyUsuariosDiv = (): ReactElement =>
  <div className="list-page">
    <p>No hay usuarios para mostrar.</p>
  </div>;

export const List = ({ usuarios, loading, error }: ListProps) => {
  if (loading) return loadingDiv();
  if (error) return errorDiv(error);
  if (usuarios.length === 0) return emptyUsuariosDiv();

  return (
    <div className="list-page">
      <h2>Lista de Usuarios</h2>
      <main className="list-grid">
        {usuarios.map((usuario) => (
          <Card
            key={`${usuario.email}`}
            firstName={usuario.firstName}
            lastName={usuario.lastName}
            email={usuario.email}
            age={usuario.age}
            birthDate={usuario.birthDate}
            fechaAlta={usuario.fechaAlta}
          />
        ))}
      </main>
    </div>
  );
};