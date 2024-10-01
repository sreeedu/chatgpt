import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './css/ConversationTile.css';

const ConversationTile = ({ index, conversation, loadConversation, handleRename, handleDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(conversation);
    const [showMenu, setShowMenu] = useState(false); // Show rename/delete options

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleRename(index, newName);
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        handleRename(index, newName);
        setIsEditing(false);
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu); // Toggle menu visibility
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent conversation loading when clicking delete
        handleDelete(index);
    };

    return (
        <div className="conversation-tile" onClick={loadConversation}>
            {isEditing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                    placeholder="Rename conversation"
                />
            ) : (
                <>
                    <span>{conversation}</span>
                    <div className="three-dot-menu" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                        {showMenu && (
                            <div className="menu-options">
                                <div className="menu-item" onClick={() => setIsEditing(true)}>
                                    Rename
                                </div>
                                <div className="menu-item" onClick={handleDeleteClick}>
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ConversationTile;
