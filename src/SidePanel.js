import React, { useState } from 'react';
import './css/SidePanel.css';

const SidePanel = ({ conversations, onNewConversation, onRenameConversation, onTopicSelect }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleRename = (index) => {
        setIsEditing(true);
        setSelectedIndex(index);
        setEditedName(conversations[index].name); // Assume each conversation has a 'name' property
    };

    const handleSaveRename = () => {
        onRenameConversation(selectedIndex, editedName);
        setIsEditing(false);
        setSelectedIndex(null);
        setEditedName('');
    };

    const handleCancelRename = () => {
        setIsEditing(false);
        setSelectedIndex(null);
        setEditedName('');
    };

    const handleNewConversation = () => {
        onNewConversation(); // Trigger the new conversation logic
        onTopicSelect(); // Call this to handle the topic selection logic
    };

    return (
        <div className="side-panel">
            <button className="new-conversation-btn" onClick={handleNewConversation}>
                Start New Conversation
            </button>
            <ul className="conversation-list">
                {conversations.map((conversation, index) => (
                    <li key={index} className="conversation">
                        <div
                            className="conversation-name"
                            onMouseEnter={() => setSelectedIndex(index)}
                            onMouseLeave={() => setSelectedIndex(null)}
                        >
                            {conversation.name}
                            {selectedIndex === index && (
                                <div className="options-menu">
                                    <span className="three-dots" onClick={() => handleRename(index)}>...</span>
                                </div>
                            )}
                        </div>
                        {isEditing && selectedIndex === index && (
                            <div className="rename-input-container">
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                                <button onClick={handleSaveRename}>Save</button>
                                <button onClick={handleCancelRename}>Cancel</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidePanel;
