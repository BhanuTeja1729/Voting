import React from 'react';

const MessageDisplay = ({ message }) => {
    return (
        <div style={{ position: 'absolute', top: '200px', left: '20px', color: 'white', fontSize: '18px' }}>
            {message}
        </div>
    );
};

export default MessageDisplay;
