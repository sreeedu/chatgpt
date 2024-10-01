import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatLog from './ChatLog';
import './css/Conversation.css';

const Conversation = ({ onNewConversation }) => {
    const [messages, setMessages] = useState([]);
    const [topic, setTopic] = useState(null); // State for selected topic

    const handleSend = (message) => {
        // Add the message to the chat log
        setMessages([...messages, { ...message, isUser: true }]);
    };

    const handleTopicSelect = (selectedTopic) => {
        setTopic(selectedTopic); // Set the selected topic
        // You can also send a message indicating the selected topic
        handleSend({ text: `Starting conversation about: ${selectedTopic}` });
    };

    return (
        <div className="conversation-container">
            {topic ? (
                <>
                    <ChatLog messages={messages} />
                    <ChatInput onSend={handleSend} />
                </>
            ) : (
                <div className="topic-selection">
                    <h2>What do You Want to Learn?</h2>
                    <div className="topic-options">
                        {['Linked Lists', 'Trees', 'Stack', 'Queue', 'Step'].map((option) => (
                            <button key={option} onClick={() => handleTopicSelect(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Conversation;
