//App.jsx

import { useState, useEffect } from 'react'
import './App.css'
import { Themes } from './components/Themes';
import { PopUp } from './components/PopUp';

function App() {
  const [data, setData] = useState([]);
  const [openPop, setOpenPop] = useState(false);
  const [themeToEdit, setThemeToEdit] = useState(null);

  const fetchThemes = async () => {
    const res = await fetch("http://localhost:3000/themes");
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const openCreatePopup = () => {
    setThemeToEdit(null); // 👉 modo creación
    setOpenPop(true);
  };

  const openEditPopup = (theme) => {
    setThemeToEdit(theme); // 👉 modo edición
    setOpenPop(true);
  };

  return (
    <>
      <button onClick={openCreatePopup}>Add new Theme</button>

      {openPop && (
        <PopUp
          theme={themeToEdit}   // 👈 NUEVO
          onClose={() => setOpenPop(false)}
          onThemeAdded={fetchThemes}
        />
      )}

      <Themes
        data={data}
        onEditTheme={openEditPopup} // 👈 NUEVO
      />
    </>
  );
}


export default App