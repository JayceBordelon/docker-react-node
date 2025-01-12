import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/authService';
import { handleSessionLogin, userIsLoggedIn } from '../util/sessionHandler';
import { PAGE_ROUTES } from '../constants/contants';
import { APIErrorResponse } from '../types/errors';
import { UserAuthResponse } from '../types/responses';
import Loading from './Loading';

type AuthFormProps = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    formType: 'login' | 'register';
};

const formFieldDefinitions = {
    login: [
        { type: 'email', name: 'email', placeholder: 'Email', required: true },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            required: true,
        },
    ],
    register: [
        {
            type: 'text',
            name: 'username',
            placeholder: 'Username',
            required: true,
        },
        { type: 'email', name: 'email', placeholder: 'Email', required: true },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            required: true,
        },
        {
            type: 'password',
            name: 'passwordConfirmation',
            placeholder: 'Password confirmation',
            required: true,
        },
    ],
};

const AuthFormBody = ({ setLogin, formType }: AuthFormProps) => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userIsLoggedIn()) navigate(PAGE_ROUTES.feed);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        const isEmpty = Object.values(formState).some((value) => !value.trim());
        if (isEmpty) {
            setError('Please fill out all required fields.');
            return false;
        }

        if (
            formType === 'register' &&
            formState.password !== formState.passwordConfirmation
        ) {
            setError('Passwords do not match.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!validateForm()) return;

            if (formType === 'login') {
                const response: UserAuthResponse = await loginUser(
                    formState as { email: string; password: string },
                );
                console.log(response);
                handleSessionLogin(response.data, navigate);
            } else {
                const response: UserAuthResponse = await registerUser(
                    formState as {
                        username: string;
                        email: string;
                        password: string;
                    },
                );
                console.log(response);
                handleSessionLogin(response.data, navigate);
            }
        } catch (err) {
            const errorResponse = err as APIErrorResponse;
            setError(
                errorResponse.errors?.join(' --&-- ') ||
                    'An unexpected error occurred.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {formFieldDefinitions[formType].map((field) => (
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
            {loading && <Loading size={25} message="" />}
            <a onClick={() => setLogin(formType === 'register')}>
                {formType === 'login' ? 'Register Instead' : 'Login Instead'}
            </a>
        </>
    );
};

export default AuthFormBody;
