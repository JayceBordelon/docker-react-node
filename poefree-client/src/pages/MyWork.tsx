import { useAuthValidation } from '../hooks/hooks';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { fetchPoemsForCurrentUser } from '../api/poemService';
import { Poem } from '../types/poem';

export default function MyWork() {
    const [userPoems, setUserPoems] = useState<Poem[]>([]);
    useEffect(() => {
        fetchPoemsForCurrentUser()
            .then((poems) => setUserPoems(poems))
            .catch((err) => console.error(err));
    }, []);
    useAuthValidation();
    return <Layout children={<></>} />;
}
