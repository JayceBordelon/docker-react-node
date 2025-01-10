import Layout from '../components/Layout';
import { useAuthValidation } from '../hooks/hooks';

export default function FeedPage() {
    useAuthValidation();
    return <Layout children={<h1>Poems</h1>} />;
}
