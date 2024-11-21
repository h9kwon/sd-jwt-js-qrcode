import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IssuerPage from './pages/IssuerPage';
import HolderPage from './pages/HolderPage';
// import VerifierPage from './VerifierPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/issuer" element={<IssuerPage />} />
                <Route path="/holder" element={<HolderPage />} />
                {/* <Route path="/verifier" element={<VerifierPage />} /> */}
            </Routes>
        </Router>
    );
};

export default App;