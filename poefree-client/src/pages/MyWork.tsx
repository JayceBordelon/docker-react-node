import { useAuthValidation } from '../hooks/hooks';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

export default function MyWork() {
    const session = useAuthValidation();
    if (!session) {
        return <Loading size={75} message="" />;
    }
    return <Layout children={<h1>{session.username}'s Poetry</h1>} />;
}
