import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import './css/ChatInput.css';

const ChatInput = ({ onSend }) => {
    const [inputText, setInputText] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [learningMode, setLearningMode] = useState('learn'); // Flag variable
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputText || attachedFile) {
                onSend({ text: inputText, file: attachedFile, mode: learningMode }); // Include learning mode in sent data
                setInputText('');
                setAttachedFile(null); // Clear attached file after sending
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (attachedFile) {
                setShowPopup(true); // Show popup if a file is already attached
            } else {
                setAttachedFile(file); // Attach the new file if none is currently attached
            }
        }
    };

    const handleAttachClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Close the popup without removing the current attachment
    };

    const handleRemoveFile = () => {
        setAttachedFile(null); // Allow removing the current attachment
        fileInputRef.current.value = ''; // Reset file input value
    };

    const toggleLearningMode = (mode) => {
        setLearningMode(mode); // Change the flag variable based on the selected option
    };

    return (
        <div>
            {/* Toggle Bar */}
            <div className="toggle-bar">
                <button onClick={() => toggleLearningMode('learn')} className={learningMode === 'learn' ? 'active' : ''}>
                    Let's Learn from Scratch!
                </button>
                <button onClick={() => toggleLearningMode('doubt')} className={learningMode === 'doubt' ? 'active' : ''}>
                    I Have a Specific Doubt
                </button>
            </div>

            <div className="chat-input-container">
                {attachedFile && (
                    <div className="file-preview">
                        {attachedFile.type.startsWith('image/') ? (
                            <img
                                src={URL.createObjectURL(attachedFile)}
                                alt="attachment preview"
                                className="attachment-preview"
                            />
                        ) : (
                            <a href={URL.createObjectURL(attachedFile)} target="_blank" rel="noopener noreferrer" className="attachment-preview">
                                View PDF
                            </a>
                        )}
                        <FontAwesomeIcon icon={faTimes} className="remove-icon" onClick={handleRemoveFile} />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                <FontAwesomeIcon icon={faPaperclip} className="file-input" onClick={handleAttachClick} />
                <textarea
                    className="message-input"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                />
                <button className="send-button" onClick={() => {
                    if (inputText || attachedFile) {
                        onSend({ text: inputText, file: attachedFile, mode: learningMode }); // Include learning mode in sent data
                        setInputText('');
                        setAttachedFile(null); // Clear attached file after sending
                    }
                }}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Oops! You can only upload one file at a time.</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatInput;
