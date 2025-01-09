import { useEffect, useState } from 'react';
import { GiQuillInk } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/" className="logo accent-color nav-link">
            <GiQuillInk className="quill" />
            <h1>Poefree</h1>
        </Link>
    );
};

const NavMenu = () => {
    return (
        <span className="nav-menu">
            <Link to="/work" className="nav-link">
                My Work
            </Link>
            <Link to="/users" className="nav-link">
                Users
            </Link>
            <Link to="/" className="nav-link">
                Feed
            </Link>
        </span>
    );
};

export default function NavBar() {
    const [scrollDirection, setScrollDirection] = useState<
        'up' | 'down' | null
    >(null);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection('up');
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header className={scrollDirection === 'down' ? 'hidden' : ''}>
            <nav>
                <Logo />
                <NavMenu />
            </nav>
        </header>
    );
}
