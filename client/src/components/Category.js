import React from 'react'
import './styles/Category.css'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

const Category = ({title, movies}) => {
	const { t } = useTranslation()

	const scroll = (size) => {
		var slider = document.getElementById(`slider${title}`)
		slider.scrollLeft = slider.scrollLeft + size
	}

	return (
		movies === [] ? <div /> :
		<div>
			<h2 className='title'>{t(title)}</h2>
			<div className='container' id={`slider${title}`}>
				{movies.map((movie) => (
					<img key={`${movie?.id}`} className='thumbnail' src={movie?.medium_cover_image} alt={movie?.title} />
				))}
				<button className='arrowScrollBkgr left-0' onClick={()=>scroll(-window.innerWidth*0.65)}>
					<MdChevronLeft className='arrowScroll'/>
				</button>
				<button className='arrowScrollBkgr right-0' onClick={()=>scroll(window.innerWidth*0.65)}>
					<MdChevronRight className='arrowScroll'/>
				</button>
			</div>
		</div>
	)
}

export default Category

