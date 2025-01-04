import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [serverRes, setServerRes] = useState<string>("");
  useEffect(() => {
    fetch("http://localhost:3000")
    .then(res => res.json())
    .then(jsonRes => setServerRes(JSON.stringify(jsonRes)))
    .then(final => console.info("CLIENT: established client connectivity to server.", final))
    .catch(err => console.error(err));
  }, []);
  return (
    <h1>
    {serverRes ? serverRes : 'Loading...'}
    </h1>
  )
}

export default App
