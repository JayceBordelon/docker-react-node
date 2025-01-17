import { useEffect, useState } from 'react';
import { GiQuillInk } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { ENDPOINTS } from '../constants/contants';
import { getRandomProfileImage } from '../api/imageService';
import ManageProfileModal from './ManageProfileModal';
import { getUserFromSession } from '../util/sessionHandler';

const Logo = () => {
    return (
        <Link to="/" className="logo accent-color nav-link">
            <GiQuillInk className="quill" />
            <h1>Poefree</h1>
        </Link>
    );
};

const NavMenu = () => {
    const [editingProfile, setEditingProfile] = useState<boolean>(false);
    const session = getUserFromSession();
    const [profileImageUri, setProfileImageUri] = useState<string>(
        session?.profileImage
            ? `${import.meta.env.VITE_API_URL}${ENDPOINTS.imageBase}/profile/${session.profileImage}`
            : `${import.meta.env.VITE_API_URL}${ENDPOINTS.imageBase}/default/${getRandomProfileImage()}`,
    );
    return (
        <span className="nav-menu">
            <Link to="/" className="nav-link">
                Home
            </Link>
            <Link to="/work" className="nav-link">
                My Work
            </Link>
            <img
                onClick={() => setEditingProfile(true)}
                className="profile-icon"
                src={profileImageUri}
                alt="pic"
                title={session?.username}
            />
            {editingProfile && (
                <ManageProfileModal
                    setEditingProfile={setEditingProfile}
                    setProfileImageUri={setProfileImageUri}
                />
            )}
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
