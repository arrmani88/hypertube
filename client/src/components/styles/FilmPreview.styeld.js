import styled from '@emotion/styled';
import { motion } from 'framer-motion'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 2000px;
  overflow: hidden;
  perspective: 1000px;
  /* scale: 0.6; */
`;
export const Card = styled.div`
	width: 300px;
	height: 400px;
	position: absolute;
`;
export const RotationWrapper = styled(motion.div)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transform-style: preserve-3d;
`;
export const BackdropImage = styled.img`
	width: 100%;
	height: 70%;
	transform: translateZ(-100px);
	position: absolute;
	object-fit: cover;
	border-radius: 50px;
`
export const GlassWall = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 55%;
	height: 27%;
	border: 1px solid rgba(200 200 200 / 0.2);
	transform: translateZ(275px);
	border-radius: 20px;
	backdrop-filter: blur(10px) brightness(55%);
	bottom: -7%;
	box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
	padding-left: 4%;
`
export const PosterImageContainer = styled.div`
	width: 100%;
	height: 100%;
	padding-left: 10%;
	margin-bottom: 30px;
`
export const PosterImage = styled.img`
	width: 220px;
	top: -23%;
	position: relative;
	border-radius: 20px;
	box-shadow: rgb(0,0,0) -15px 20px 30px -4px;
`
export const DetailsContainer = styled.div`
	/* padding-left: calc(10% + 150px + 30px); */
	padding-left: 40px;
	padding-top: 20px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 100%;
	width: 100%;
	color: white;
	/* display: none; */
`
export const Title = styled.h1`
	font-size: 30px;
	font-family: 'Microgamma';
	font-weight: 600;
	text-shadow: 0 1px 0 #999;
	text-shadow: 3px 12px 8px rgb(0 0 0);
`
export const GenresContainer = styled.div`
	display: flex;
	position: relative;
	margin: 10px 15px 10px 0;
	min-height: 25px;
	flex-direction: column;
	align-items: baseline;
`
export const MovieDetailTitle = styled.h1`
	font-size: 17px;
	color: white;
	height: 100%;
	text-shadow: -2px 9px 6px rgb(0 0 0);
	padding-right: 20px;
	min-width: 125px;
`
export const Genres = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	width: fit-content;
	min-height: 25px;
	flex-direction: row;
`
export const Genre = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	background-color: rgb(61, 61, 61);
	font-size: 15px;
	height: 15px;
	color: white;
	padding: 15px 25px 15px 25px;
	margin: 0 5px 5px 0;
	box-shadow: 2px 8px 14px -1px rgb(0 0 0);
`
export const MovieStatisticsContainer = styled.div`
	display: flex;
	align-items: flex-start;
	width: fit-content;
	text-shadow: 3px 9px 6px rgb(0 0 0);
`
export const MovieStat = styled.h1`
	font-size: 17px;
	color: white;
`
export const Separator = styled.h1`
	margin: 0 20px 0 20px;
	font-size: 25px;
`
export const ImdbLogo = styled.img`
	width: 40px;
	margin-right: 10px;
	box-shadow: 2px 8px 14px -1px rgb(0 0 0);
`
export const MovieDetailContainer = styled.div`
	display: flex;
	position: relative;
	margin: 5px 15px 5px 0;
	min-height: 25px;
	flex-direction: row;
	align-items: baseline;
`
export const MovieDetailContent = styled.h1`
	font-size: 15px;
	color: white;
	text-shadow: 3px 9px 6px rgb(0 0 0);
	${props => props.scale && `scale: ${props.scale};`}
`
export const ImageAndButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	top: -105px;
    position: relative;
	/* width: 100%; */
`