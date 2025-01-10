import React from 'react';
import { useAuthValidation } from '../hooks/hooks';
import Layout from '../components/Layout';

export default function MyWork() {
    useAuthValidation();
    return <Layout children={<h1>Your Poetry</h1>} />;
}
