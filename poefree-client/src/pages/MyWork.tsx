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
    return (
        <>
            {userPoems.length > 0 ? (
                JSON.stringify(userPoems)
            ) : (
                <h3>No Poems for you</h3>
            )}
        </>
    );
};

export default function MyWork() {
    useAuthValidation();
    return <Layout children={<MyWorksMapped />} />;
}
