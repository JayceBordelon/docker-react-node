import { useState } from 'react';
import AuthFormBody from '../components/AuthFormBody';
import AuthFormLogo from '../components/AuthFormLogo';

export default function Auth() {
    const [login, setLogin] = useState(true);

    return (
        <main className="auth-page">
            <form className="auth-form">
                <AuthFormLogo />
                <AuthFormBody
                    setLogin={setLogin}
                    formType={login ? 'login' : 'register'}
                />
            </form>
        </main>
    );
}
