import React from 'react';

const MessageBox = (props) => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            {console.log(props)}
            {props.children}          
        </div>
    )
}

export default MessageBox;