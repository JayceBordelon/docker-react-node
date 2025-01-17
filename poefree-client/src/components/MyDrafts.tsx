import React from 'react';
import { Poem } from '../types/poem';

interface MyDraftsProps {
    setUserPoems: React.Dispatch<React.SetStateAction<Poem[]>>;
    userPoems: Poem[];
}

export default function MyDrafts({ setUserPoems, userPoems }: MyDraftsProps) {
    return <div>{JSON.stringify(userPoems)}</div>;
}
