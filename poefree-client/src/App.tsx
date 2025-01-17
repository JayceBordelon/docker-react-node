import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyWork from './pages/MyWork';
import Auth from './pages/Auth';
import { getServerHealth } from './api/healthService';
import Loading from './components/Loading';

const App: React.FC = () => {
    const [serverHealthy, setServerHealthy] = useState(true);

    useEffect(() => {
        const checkServerHealth = async () => {
            const isHealthy = await getServerHealth();
            setServerHealthy(isHealthy);
        };

        const intervalId = setInterval(
            () => {
                checkServerHealth();
            },
            import.meta.env.VITE_SERVER_HEALTH_CHECK_DELAY | 1000,
        );

        if (serverHealthy) {
            clearInterval(intervalId);
        } else {
            setServerHealthy(false);
        }

        return () => clearInterval(intervalId);
    }, [serverHealthy]);

    return (
        <Router>
            {!serverHealthy ? (
                <div className="screen-height">
                    <Loading size={75} message={'Waking Server'} />
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/work" element={<MyWork />} />
                </Routes>
            )}
        </Router>
    );
};

export default App;
