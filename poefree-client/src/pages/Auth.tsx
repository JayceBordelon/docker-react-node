import { useState } from 'react';
import { GiQuillInk } from 'react-icons/gi';
import { loginUser, registerUser } from '../api/authService';
import { AxiosError } from 'axios';
import { APIErrorResponse } from '../types/errors';

type AuthFormProps = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    formType: 'login' | 'register';
};

type FormField = {
    type: string;
    name: string;
    placeholder: string;
    required?: boolean;
};

const AuthFormLogo = () => (
    <div className="accent-color auth-logo">
        <GiQuillInk size={45} />
        <h1>Poefree</h1>
    </div>
);

const FormBody = ({ setLogin, formType }: AuthFormProps) => {
    const [formState, setFormState] = useState<Record<string, string>>(
        formType === 'login'
            ? { email: '', password: '' }
            : { username: '', email: '', password: '' },
    );

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const formFields: FormField[] =
        formType === 'login'
            ? [
                  {
                      type: 'email',
                      name: 'email',
                      placeholder: 'Email',
                      required: true,
                  },
                  {
                      type: 'password',
                      name: 'password',
                      placeholder: 'Password',
                      required: true,
                  },
              ]
            : [
                  {
                      type: 'text',
                      name: 'username',
                      placeholder: 'Username',
                      required: true,
                  },
                  {
                      type: 'email',
                      name: 'email',
                      placeholder: 'Email',
                      required: true,
                  },
                  {
                      type: 'password',
                      name: 'password',
                      placeholder: 'Password',
                      required: true,
                  },
              ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (formType === 'login') {
                const { email, password } = formState;

                if (!email || !password) {
                    setError('Please fill out all required fields.');
                    return;
                }

                const response = await loginUser({ email, password });
                console.log('Login Successful:', response);
                // Handle successful login, e.g., save token or redirect
            } else {
                const { username, email, password } = formState;

                if (!username || !email || !password) {
                    setError('Please fill out all required fields.');
                    return;
                }

                const response = await registerUser({
                    username,
                    email,
                    password,
                });
                console.log('Registration Successful:', response);
                setLogin(true); // Switch to login form after registration
            }
        } catch (error: APIErrorResponse | any) {
            console.error(error);
            if (error && error.data) {
                const serverErrors = error.data.errors || [error.data.message];
                setError(serverErrors.join(' --&-- '));
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {formFields.map((field) => (
                <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formState[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                />
            ))}
            <button type="submit" onClick={handleSubmit} disabled={loading}>
                {loading
                    ? formType === 'login'
                        ? 'Logging in...'
                        : 'Registering...'
                    : formType === 'login'
                      ? 'Login'
                      : 'Register'}
            </button>
            {error && <p className="error-message">{error}</p>}
            <a onClick={() => setLogin(formType === 'register')}>
                {formType === 'login' ? 'Register Instead' : 'Login Instead'}
            </a>
        </>
    );
};

export default function Auth() {
    const [login, setLogin] = useState<boolean>(true);

    return (
        <main className="auth-page">
            <form className="auth-form">
                <AuthFormLogo />
                <FormBody
                    setLogin={setLogin}
                    formType={login ? 'login' : 'register'}
                />
            </form>
        </main>
    );
}
