import { useState } from 'react';
import { GiQuillInk } from 'react-icons/gi';

const AuthFormLogo = () => {
  return (
    <div className="accent-color auth-logo">
      <GiQuillInk size={35} />
      <h1>Poefree</h1>
    </div>
  );
};

const AuthForm = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    email: '',
  });
  return (
    <form className="auth-form">
      <AuthFormLogo />
    </form>
  );
};

export default function Auth() {
  return (
    <main className="auth-page">
      <AuthForm />
    </main>
  );
}
