import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/issuer">Issuer</Link></li>
                        <li><Link to="/holder">Holder</Link></li>
                        <li><Link to="/verifier">Verifier</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>&copy; 2024 SSI QR Code Demo</p>
            </footer>
        </div>
    );
};

export default Layout;