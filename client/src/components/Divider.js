import React from 'react'

const dividerLine = {
	width: "100%",
	borderBottom: "1px solid lightgray"
}

const dividerContainer = {
	display: "flex",
	alignItems: "center",
	flexDirection: "row",
	padding: "20px"
}

const dividerContent = {
	margin: "0 10px 0 10px",
	color: "white",
	fontSize: "25px"
}

const Divider = ({children}) => {
  return (
	<div style={dividerContainer}>
		<div style={dividerLine}/>
		<div style={dividerContent}>{children}</div>
		<div style={dividerLine}/>
	</div>
  )
}

export default Divider

