import React, { useRef } from 'react'
import css from '../pages/styles/Movie.module.css'
import imdbLogo from '../images/imdb_logo.png'
import { ImDownload3 } from 'react-icons/im'
import { AiFillHeart } from 'react-icons/ai'
import localeEmoji from 'locale-emoji'
import i18n from "i18next"
import RedButton from './RedButton'
import { BsPlayFill } from 'react-icons/bs'

import styled from '@emotion/styled';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const dateFormat = { month: "long", day: "numeric", year: "numeric" }

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 2000px;
  overflow: hidden;
  perspective: 1000px;
`;
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
const BackdropImage = styled.img`
	width: 100%;
	height: 70%;
	transform: translateZ(-100px);
	position: absolute;
	object-fit: cover;
	border-radius: 50px;
`
const GlassWall = styled.div`
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
const PosterImageContainer = styled.div`
	width: 100%;
	height: 100%;
	padding-left: 10%;
	margin-bottom: 30px;
`
const PosterImage = styled.img`
	width: 220px;
	top: -23%;
	position: relative;
	border-radius: 20px;
	box-shadow: rgb(0,0,0) -15px 20px 30px -4px;
`
const DetailsContainer = styled.div`
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
const Title = styled.h1`
	font-size: 30px;
	font-family: 'Microgamma';
	font-weight: 600;
	text-shadow: 0 1px 0 #999;
	text-shadow: 3px 12px 8px rgb(0 0 0);
`
const GenresContainer = styled.div`
	display: flex;
	position: relative;
	margin: 10px 15px 10px 0;
	min-height: 25px;
	flex-direction: column;
	align-items: baseline;
`
const MovieDetailTitle = styled.h1`
	font-size: 17px;
	color: white;
	height: 100%;
	text-shadow: -2px 9px 6px rgb(0 0 0);
	padding-right: 20px;
	min-width: 125px;
`
const Genres = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	width: fit-content;
	min-height: 25px;
	flex-direction: row;
`
const Genre = styled.div`
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
const MovieStatisticsContainer = styled.div`
	display: flex;
	align-items: flex-start;
	width: fit-content;
	text-shadow: 3px 9px 6px rgb(0 0 0);
`
const MovieStat = styled.h1`
	font-size: 17px;
	color: white;
`
const Separator = styled.h1`
	margin: 0 20px 0 20px;
	font-size: 25px;
`
const ImdbLogo = styled.img`
	width: 40px;
	margin-right: 10px;
	box-shadow: 2px 8px 14px -1px rgb(0 0 0);
`
const MovieDetailContainer = styled.div`
	display: flex;
	position: relative;
	margin: 5px 15px 5px 0;
	min-height: 25px;
	flex-direction: row;
	align-items: baseline;
`
const MovieDetailContent = styled.h1`
	font-size: 15px;
	color: white;
	text-shadow: 3px 9px 6px rgb(0 0 0);
	${props => props.scale && `scale: ${props.scale};`}
`
const ImageAndButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	top: -105px;
    position: relative;
	/* width: 100%; */
`


const FilmPreview = ({ movie }) => {
	const { t } = useTranslation()
	const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
	const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
	const cardRef = useRef(null)
	const dampen = 400;
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

	const getDataSource = (dataName) => {
		if (dataName === 'backdrop_path') return movie.sourceTmdb ? `https://image.tmdb.org/t/p/original${movie.sourceTmdb.backdrop_path}` : movie.sourceYts.large_screenshot_image1
		if (dataName === 'popularity') return movie.sourceTmdb ? movie.sourceTmdb.popularity.toFixed() : movie.sourceYts.like_count
	}

	return (
		<Container>
			<RotationWrapper style={{ rotateX, rotateY }}>
				<BackdropImage src={getDataSource('backdrop_path')} />
				<Card ref={cardRef} />
				<GlassWall>
					<ImageAndButtonsContainer>
						<PosterImageContainer>
							<PosterImage src={movie.sourceYts.large_cover_image} />
						</PosterImageContainer>
						<RedButton text={t('play')} tailwind={'text-[15px] h-[10px]'} icon={<BsPlayFill />}/>
					</ImageAndButtonsContainer>
					<DetailsContainer>
						<Title>{movie.sourceYts.title.toUpperCase()}</Title>
						<MovieStatisticsContainer>
							<div className='flex row items-center w-max' >
								<ImdbLogo src={imdbLogo} />
								<MovieStat>{movie.sourceYts.rating}</MovieStat>
								<Separator>|</Separator>
								<MovieStat>{movie.sourceYts.year}</MovieStat>
							</div>
							<Separator>|</Separator>
							<div className='flex row items-center w-max' >
								<ImDownload3 className={css.statsIcon2} />
								<MovieStat>{movie.sourceYts.download_count} </MovieStat>
								<Separator>|</Separator>
								<AiFillHeart className={css.statsIcon2} />
								<MovieStat>{getDataSource('popularity')}</MovieStat>
							</div>
						</MovieStatisticsContainer>
						{/* -------------------------------------------------------------------------------------- */}
						<MovieDetailContainer>
							<MovieDetailTitle>{t('language')}</MovieDetailTitle>
							<div className='ml-[8px]' />
							<MovieDetailContent scale={2.3} >{localeEmoji('en')}</MovieDetailContent>
						</MovieDetailContainer>
						{/* -------------------------------------------------------------------------------------- */}
						{movie.sourceTmdb &&
							<MovieDetailContainer>
								<MovieDetailTitle>{t('adult')}</MovieDetailTitle>
								<MovieDetailContent>{movie.sourceTmdb.adult ? '✅' : '❌'}</MovieDetailContent>
							</MovieDetailContainer>
						}
						{/* -------------------------------------------------------------------------------------- */}
						<MovieDetailContainer>
							<MovieDetailTitle>{t('duration')}</MovieDetailTitle>
							<MovieDetailContent>{(movie.sourceYts.runtime === 0 || !(movie.sourceYts.runtime)) ? (movie.sourceTmdb && movie.sourceTmdb.runtime !== 0 ? movie.sourceTmdb.runtime + ' min' : t('unknown')) : movie.sourceYts.runtime + ' min'}</MovieDetailContent>
						</MovieDetailContainer>
						{/* -------------------------------------------------------------------------------------- */}
						<MovieDetailContainer>
							<MovieDetailTitle>{t('released')}</MovieDetailTitle>
							<MovieDetailContent>{movie.sourceTmdb ? new Date(movie.sourceTmdb.release_date).toLocaleString(i18n.language, dateFormat) : t('unknown')}</MovieDetailContent>
						</MovieDetailContainer>
						{/* -------------------------------------------------------------------------------------- */}
						<GenresContainer>
							<div className='flex'>
								<MovieDetailTitle>{t('genres')}</MovieDetailTitle>
								<Genres>
									{movie.sourceYts.genres.map(genre => (
										<Genre key={genre}>{genre}</Genre>
									))}
								</Genres>
							</div>
						</GenresContainer>
					</DetailsContainer>
				</GlassWall>
			</RotationWrapper>
		</Container>
	)
}

export default FilmPreview