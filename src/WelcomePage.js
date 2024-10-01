import React from 'react';
import './css/WelcomePage.css'; // Ensure this path is correct
import googleButtonImage from './assets/sign_in_with_google.png'; // Update this path to your actual image

const WelcomePage = ({ startConversation }) => {
    const [isBouncing, setIsBouncing] = React.useState(false);

    const handleClick = () => {
        setIsBouncing(true);
        startConversation();

        // Reset bounce after animation
        setTimeout(() => {
            setIsBouncing(false);
        }, 300); // Duration of the bounce effect
    };

    return (
        <div className="welcome-page">
            <h1>Welcome to LEARNDSA.AI!</h1>
            <p>Learning DSA never got this good! We promise!</p>
            <p>Explore the app and start learning in a fun, interactive way!</p>
            <button className={`sign-in-button ${isBouncing ? 'bounce' : ''}`} onClick={handleClick}>
                <img src={googleButtonImage} alt="Sign in with Google" />
            </button>
        </div>
    );
};

export default WelcomePage;
