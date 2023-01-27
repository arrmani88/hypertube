import styled from "styled-components"

export const ComponentNamer = (Comp) => {
	return (props) => {
		return <Comp { ...props, as={Comp.displayName} }
	}
}