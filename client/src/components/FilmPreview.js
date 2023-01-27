import React, { useRef } from 'react'
import css from '../pages/styles/Movie.module.css'
import imdbLogo from '../images/imdb_logo.png'
import { ImDownload3 } from 'react-icons/im'
import { AiFillHeart } from 'react-icons/ai'
import localeEmoji from 'locale-emoji'
import i18n from "i18next"
import RedButton from './RedButton'
import { BsPlayFill } from 'react-icons/bs'
import { Container, Card, RotationWrapper, BackdropImage, GlassWall, PosterImageContainer, PosterImage, DetailsContainer, Title, GenresContainer, MovieDetailTitle, Genres, Genre, MovieStatisticsContainer, MovieStat, Separator, ImdbLogo, MovieDetailContainer, MovieDetailContent, ImageAndButtonsContainer, } from './styles/FilmPreview.styeld.js'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const dateFormat = { month: "long", day: "numeric", year: "numeric" }

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
		return (newRotateY / dampen / 5) - 50;
	});
	useEffect(() => {
		const handleMouseMove = (e) => {
			animate(mouseX, e.clientX);
			animate(mouseY, e.clientY);
			console.log('new mouseX=', mouseX.current)
			console.log('new mouseY=', mouseY.current)
			console.log('---------------')
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
		<Container as='blablabla' >
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