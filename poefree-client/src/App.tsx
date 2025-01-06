import { useEffect, useState } from 'react'
import './App.css'
import { request } from './api/apiConfig';

function App() {
  const [serverRes, setServerRes] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request("/", "GET");
        setServerRes(JSON.stringify(response.data));
        console.info("CLIENT: established client connectivity to server.", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <h4>
    {serverRes ? serverRes : 'Loading...'}
    </h4>
  )
}

export default App
