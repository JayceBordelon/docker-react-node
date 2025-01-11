import { useEffect, useState } from 'react';
import { GiQuillInk } from 'react-icons/gi';
import { loginUser, registerUser } from '../api/authService';
import { APIErrorResponse } from '../types/errors';
import { getUserSession, populateUserSession } from '../session/sessionHandler';
import { UserAuthResponse } from '../types/responses';
import { useNavigate } from 'react-router-dom';

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
            : {
                  username: '',
                  email: '',
                  password: '',
                  passwordConfirmation: '',
              },
    );
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (getUserSession()) {
            navigate('/');
        }
    }, []);

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
                  {
                      type: 'password',
                      name: 'passwordConfirmation',
                      placeholder: 'Password confirmation',
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

                const response = (await loginUser({
                    email,
                    password,
                })) as UserAuthResponse;
                console.info(response);
                populateUserSession(response.data)
                    .then(() => {
                        navigate('/');
                    })
                    .catch(() => {
                        throw new APIErrorResponse('', 500, [
                            'Error setting user session. Try again later',
                        ]);
                    });
            } else {
                const { username, email, password, passwordConfirmation } =
                    formState;

                if (!username || !email || !password || !passwordConfirmation) {
                    setError('Please fill out all required fields.');
                    return;
                }

                if (passwordConfirmation !== password) {
                    setError(
                        'Your password and password confirmation do not match.',
                    );
                    return;
                }

                const response = (await registerUser({
                    username,
                    email,
                    password,
                })) as UserAuthResponse;
                populateUserSession(response.data)
                    .then(() => {
                        navigate('/');
                    })
                    .catch(() => {
                        throw new APIErrorResponse('', 500, [
                            'Error setting user session. Try again later',
                        ]);
                    });
            }
        } catch (error: APIErrorResponse | any) {
            if (error) {
                const serverErrors = error.errors || [error.message];
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
