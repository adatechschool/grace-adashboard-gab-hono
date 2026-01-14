import { useState, useEffect } from 'react'
import './App.css'
import { Themes } from './components/Themes';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/themes")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(data)

  return (
    <>
    <Themes data={data} />
    </>
  )
}

export default App