import React from 'react'

const MessageBox = (props) => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
	{/* it is special type of props that shows the content of message box 
in the place that has been used  */}
      {props.children}
    </div>
    )
}

export default MessageBox;
