import { useState, useEffect } from 'react';
import { fetchPoemsForCurrentUser } from '../api/poemService';
import { Poem } from '../types/poem';

interface MyPoemsProps {
    setUserPoems: React.Dispatch<React.SetStateAction<Poem[]>>;
    userPoems: Poem[];
}

export const MyPoems = ({ setUserPoems, userPoems }: MyPoemsProps) => {
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
