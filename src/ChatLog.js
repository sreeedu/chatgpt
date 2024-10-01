import React, { useEffect, useRef } from 'react';
import './css/ChatLog.css';

const ChatLog = ({ messages }) => {
    const chatEndRef = useRef(null); // Create a ref for the chat end

    useEffect(() => {
        // Scroll to the bottom of the chat log whenever messages change
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]); // Effect runs when messages change

    return (
        <div className="chat-box">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
                    {msg.text && <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{msg.text}</pre>}
                    {msg.file && (
                        msg.file.type === 'application/pdf' ? (
                            <a href={URL.createObjectURL(msg.file)} target="_blank" rel="noopener noreferrer" className="attachment">
                                View PDF
                            </a>
                        ) : (
                            <img
                                src={URL.createObjectURL(msg.file)}
                                alt="attachment"
                                className="attachment-thumbnail"
                            />
                        )
                    )}
                </div>
            ))}
            <div ref={chatEndRef} /> {/* This div acts as a scroll target */}
        </div>
    );
};

export default ChatLog;
