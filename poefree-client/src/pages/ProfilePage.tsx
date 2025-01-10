import React from 'react';
import { useAuthValidation } from '../hooks/hooks';
import Layout from '../components/Layout';

export default function ProfilePage() {
    useAuthValidation();
    return <Layout children={<h1>Profile</h1>} />;
}
