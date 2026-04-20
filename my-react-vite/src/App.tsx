import { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
// import type { TipoFeriado } from './components/CardUser'
import { Buscador } from './components/Buscador'
import { About } from './pages/About'
import { List } from './pages/List'
import AddUserForm from './pages/AddUserForm'

const API_URL = `http://localhost:3000/users`;

interface Usuarios {
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  birthDate: string,
  fechaAlta: string
}

function App() {
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]); // Estado para almacenar la lista de feriados
  const [loading, setLoading] = useState<boolean>(true); // Estado para indicar si se están cargando los datos
  const [error, setError] = useState<string | null>(null); // Estado para almacenar cualquier error que ocurra durante la obtención de datos
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para almacenar el término de búsqueda

  useEffect(() => {
    async function getUsuarios(): Promise<void> {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
      }
      catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido');
      }
      finally {
        setLoading(false);
      }
    }
    getUsuarios();
  }, [])

  // FILTRO DE BUSQUEDA: Función para determinar si un feriado coincide con el término de búsqueda

  const normalizeSearch = (term: string): string => {
    //esto es para que el buscador pueda encontrar coincidencias aunque el usuario escriba la fecha de diferentes formas
    // (ejemplos: "24 marzo 2026", "24-3-2026", "24/3/2026", "enero", "febrero", etc.)
    const monthMap: Record<string, string> = {
      enero: "1",
      febrero: "2",
      marzo: "3",
      abril: "4",
      mayo: "5",
      junio: "6",
      julio: "7",
      agosto: "8",
      septiembre: "9",
      setiembre: "9",
      octubre: "10",
      noviembre: "11",
      diciembre: "12",
    };

    //sacamos acentos y pasamos a minuscula para que el buscador no sea sensible a eso (esto me lo robe del laburo, lo usamos para búsquedas fonéticas)
    let value = term
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // reemplazamos los nombres de los meses por su número correspondiente
    for (const [month, num] of Object.entries(monthMap)) {
      value = value.replace(new RegExp(`\\b${month}\\b`, "g"), `/${num}/`);
    }

    return value
      .replace(/\s+/g, "/")  // "24 marzo 2026" -> "24/3/2026" // reemplaza espacios por "/"
      .replace(/-/g, "/")    // "24-3-2026" -> "24/3/2026" // reemplaza guiones por "/"
      .replace(/\/+/g, "/"); // limpia ///// en caso de que el usuario haya puesto espacios y guiones juntos, o haya puesto varios espacios o guiones seguidos
  };
  
  // Función para determinar si un feriado coincide con el término de búsqueda
  const isMatchingFeriado = (usuario: Usuarios, searchTerm: string): boolean => {
    const formattedDate = new Date(usuario.fechaAlta + "T03:00:00Z").toLocaleDateString("es-AR");
    const searchLower = normalizeSearch(searchTerm);

    return (
      usuario.firstName.toLowerCase().includes(searchLower) ||
      usuario.lastName.toLowerCase().includes(searchLower) ||
      formattedDate.toLowerCase().includes(searchLower)
    );
  };

  // Filtramos la lista de usuarios según el término de búsqueda
  const filteredUsuarios = usuarios.filter((usuario) =>
    isMatchingFeriado(usuario, searchTerm)
  );

  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={
            <>
              <Buscador searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <List usuarios={filteredUsuarios} loading={loading} error={error} />
            </>
          }
          />
          <Route path="/list" element={<Navigate to="/" replace />} />
          <Route path="/add" element={<AddUserForm /> } />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
