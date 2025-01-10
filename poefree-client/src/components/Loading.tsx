import { FaSpinner } from 'react-icons/fa';
interface LoadingProps {
    message: string | null;
    size: number;
}
export default function Loading({ message, size }: LoadingProps) {
    return (
        <div className="loading-container">
            <FaSpinner size={size} className="loading-spinner" />
            {message && <h2>{message}</h2>}
        </div>
    );
}
