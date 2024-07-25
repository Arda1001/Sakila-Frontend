import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    return (
        <div className="error-container">
            <div>
                <h1>404</h1>
                <p>Page Not Found</p>
                <Link to="/">
                    <button className="nav-button">Go Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
