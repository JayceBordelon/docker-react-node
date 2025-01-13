import { useAuthValidation } from '../hooks/hooks';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { Poem } from '../types/poem';
import { fetchPoemsForCurrentUser } from '../api/poemService';

const MyWorksMapped = () => {
    const [userPoems, setUserPoems] = useState<Poem[]>([]);
    useEffect(() => {
        fetchPoemsForCurrentUser()
            .then((poems) => setUserPoems(poems))
            .catch((err) => console.error(err));
    }, []);
    return <>{JSON.stringify(userPoems)}</>;
};

export default function MyWork() {
    useAuthValidation();
    return <Layout children={<MyWorksMapped />} />;
}
