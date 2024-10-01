import React, { useState } from 'react';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';
import WelcomePage from './WelcomePage';
import ConversationTile from './ConversationTile';
import './css/App.css';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [showWelcomePage, setShowWelcomePage] = useState(true);
    const [previousConversations, setPreviousConversations] = useState([]);
    const [activeConversationIndex, setActiveConversationIndex] = useState(null);
    const [showTopicOptions, setShowTopicOptions] = useState(false);

    const handleSend = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message.text, file: message.file, isUser: true }
        ]);

        // Simulate bot reply
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'This is a bot reply.', isUser: false }
            ]);
        }, 1000);
    };

    const startConversation = () => {
        saveCurrentConversation();
        setMessages([]);
        setActiveConversationIndex(null);
        setShowTopicOptions(true);
        setShowWelcomePage(false);
    };

    const loadConversation = (conversation, index) => {
        saveCurrentConversation();
        setMessages(conversation.messages);
        setActiveConversationIndex(index);
        setShowTopicOptions(false);
    };

    const saveCurrentConversation = () => {
        const currentConversation = messages.map((msg) => msg.text).join('\n');

        if (activeConversationIndex !== null) {
            setPreviousConversations((prev) =>
                prev.map((conv, index) =>
                    index === activeConversationIndex ? { ...conv, messages: messages } : conv
                )
            );
        } else if (currentConversation) {
            setPreviousConversations((prev) => [
                ...prev,
                { name: `Conversation ${prev.length + 1}`, messages: messages }
            ]);
        }
    };

    const handleNewConversation = () => {
        saveCurrentConversation();
        setMessages([]);
        setActiveConversationIndex(null);
        setShowTopicOptions(true);
    };

    const handleRenameConversation = (index, newName) => {
        setPreviousConversations((prevConversations) => {
            const updatedConversations = [...prevConversations];
            updatedConversations[index] = { ...updatedConversations[index], name: newName };
            return updatedConversations;
        });
    };

    const handleDeleteConversation = (index) => {
        setPreviousConversations((prevConversations) =>
            prevConversations.filter((_, i) => i !== index)
        );
        // setMessages([]); // Clear messages when a conversation is deleted
        setActiveConversationIndex(null); // Reset active conversation index
    };

    const handleTopicSelection = (topic) => {
        setMessages([{ text: `Let's learn about ${topic}!`, isUser: false }]);
        setShowTopicOptions(false);
    };

    return (
        <div className="app">
            {showWelcomePage ? (
                <WelcomePage startConversation={startConversation} />
            ) : (
                <div className="chat-container">
                    <div className="side-panel">
                        <button onClick={handleNewConversation}>Start New Conversation</button>
                        <h3>Previous Conversations</h3>
                        <div className="conversation-buttons">
                            {previousConversations.map((conversation, index) => (
                                <ConversationTile
                                    key={index}
                                    index={index}
                                    conversation={conversation.name}
                                    loadConversation={() => loadConversation(conversation, index)}
                                    handleRename={handleRenameConversation}
                                    handleDelete={handleDeleteConversation} // Pass the delete function
                                />
                            ))}
                        </div>
                    </div>
                    <div className="chat-content">
                        {showTopicOptions ? (
                            <div className="topic-selection">
                                <h2>What do You Want to Learn?</h2>
                                <button onClick={() => handleTopicSelection('Linked Lists')}>Linked Lists</button>
                                <button onClick={() => handleTopicSelection('Trees')}>Trees</button>
                                <button onClick={() => handleTopicSelection('Stack')}>Stack</button>
                                <button onClick={() => handleTopicSelection('Queue')}>Queue</button>
                                <button onClick={() => handleTopicSelection('Step')}>Step</button>
                            </div>
                        ) : (
                            <>
                                <ChatLog messages={messages} />
                                <ChatInput onSend={handleSend} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
