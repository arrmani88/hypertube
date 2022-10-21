import React from 'react'

const line = {
	width: "100%",
	borderBottom: "1px solid lightgray"
}

const container = {
	display: "flex",
	alignItems: "center",
	flexDirection: "row",
	padding: "20px"
}

const content = {
	margin: "0 10px 0 10px",
	color: "white",
	fontSize: "25px"
}

const Divider = ({children}) => {
  return (
	<div style={container}>
		<div style={line}/>
		<div style={content}>{children}</div>
		<div style={line}/>
	</div>
  )
}

export default Divider

