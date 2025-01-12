import { useAuthValidation } from '../hooks/hooks';
import Layout from '../components/Layout';
import { getUserFromSession } from '../util/sessionHandler';

export default function MyWork() {
    useAuthValidation();
    const session = getUserFromSession();
    if (session === null) {
        return <>ERRORORROROROROR</>;
    }
    return <Layout children={<h1>{session.username}'s Poetry</h1>} />;
}
