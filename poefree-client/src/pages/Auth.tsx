import { useState } from 'react';
import { GiQuillInk } from 'react-icons/gi';

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

const AuthFormLogo = () => {
    return (
        <div className="accent-color auth-logo">
            <GiQuillInk size={45} />
            <h1>Poefree</h1>
        </div>
    );
};

const FormBody = ({ setLogin, formType }: AuthFormProps) => {
    const [formState, setFormState] = useState<Record<string, string>>(
        formType === 'login'
            ? { email: '', password: '' }
            : { username: '', email: '', password: '' },
    );

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(
            `${formType === 'login' ? 'Login' : 'Registration'} Data:`,
            formState,
        );
        // TODO: Add API call here
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
            <button type="submit" onClick={handleSubmit}>
                {formType === 'login' ? 'Login' : 'Register'}
            </button>
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
