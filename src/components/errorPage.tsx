import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    return (
        <div className="error-container">
            <h1>404</h1>
            <p>Page Not Found</p>
            <Link to="/" className="home-link">Go Back to Home</Link>
        </div>
    );
};

export default ErrorPage;
