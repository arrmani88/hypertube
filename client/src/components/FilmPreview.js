import React, { useRef } from 'react'
import styled from '@emotion/styled';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const tmpBckImg = 'https://image.tmdb.org/t/p/original/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg'
const tmpPstImg = 'https://img.yts.mx/assets/images/movies/spider_man_homecoming_2017/large-cover.jpg'

const SIZE = 60;
const DotGrid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: ${SIZE}px ${SIZE}px;
  background-image: radial-gradient(
    circle at 1px 1px,
    white 2px,
    transparent 0
  );
  background-position: center;
  transform: translateZ(-100px);
`;
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  perspective: 1000px;
`;
// ----------------------------
const Card = styled.div`
	width: 300px;
	height: 400px;
	position: absolute;
`;
const RotationWrapper = styled(motion.div)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transform-style: preserve-3d;
`;
const CardWrapper = styled(motion.div)`
	border-radius: 20px;
	backdrop-filter: blur(3px) brightness(120%);
`;
// ----------
const BackdropImage = styled.img`
	width: 100%;
	height: 70%;
	transform: translateZ(-100px);
	position: absolute;
	object-fit: cover;
	border-radius: 50px;
`
const InfoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 55%;
	height: 25%;
	border: 1px solid rgba(200 200 200 / 0.2);
	transform: translateZ(275px);
	border-radius: 20px;
	backdrop-filter: blur(10px) brightness(120%);
	bottom: -7%;
`
// text-shadow: 0 1px 0 #999;
const PosterImage = styled.img`
	height: 200px;
	width: 80px;
`

const FilmPreview = () => {
	const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
	const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
	const cardRef = useRef(null)
	const dampen = 140;
	const rotateX = useTransform(mouseY, (newMouseY) => {
		if (!cardRef.current) return 0;
		const rect = cardRef.current.getBoundingClientRect();
		const newRotateX = newMouseY - rect.top - rect.height / 2;
		return -newRotateX / dampen;
	});
	const rotateY = useTransform(mouseX, (newMouseX) => {
		if (!cardRef.current) return 0;
		const rect = cardRef.current.getBoundingClientRect();
		const newRotateY = newMouseX - rect.left - rect.width / 2;
		return newRotateY / dampen;
	});
	useEffect(() => {
		const handleMouseMove = (e) => {
			animate(mouseX, e.clientX);
			animate(mouseY, e.clientY);
		};
		if (typeof window === 'undefined') return;
		window.addEventListener('mousemove', handleMouseMove);
		return () => { window.removeEventListener('mousemove', handleMouseMove) }
	}, []);

	return (
		<Container>
			<RotationWrapper style={{ rotateX, rotateY }}>
				<BackdropImage src={tmpBckImg} />
				<Card ref={cardRef} />
				<InfoContainer>
					<PosterImage src={tmpPstImg} />
				</InfoContainer>
			</RotationWrapper>
		</Container>
	)
}

export default FilmPreview