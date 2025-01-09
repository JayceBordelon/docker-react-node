import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h3 className="footer-title accent-color">Poefree</h3>
                    <p>Share and explore poetry, freely.</p>
                </div>
                <div className="footer-links">
                    <h4>Meet the Dev</h4>
                    <div className="social-links">
                        <a
                            href="https://www.linkedin.com/in/jaycebordelon/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <FaLinkedin />
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/JayceBordelon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <FaGithub />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} Poefree. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
