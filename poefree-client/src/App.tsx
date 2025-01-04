import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [serverRes, setServerRes] = useState<string>("");
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
    .then(res => res.json())
    .then(jsonRes => setServerRes(JSON.stringify(jsonRes)))
    .then(final => console.info("CLIENT: established client connectivity to server.", final))
    .catch(err => console.error(err));
  }, []);
  return (
    <h4>
    {serverRes ? serverRes : 'Loading...'}
    </h4>
  )
}

export default App
