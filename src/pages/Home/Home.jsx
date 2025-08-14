import React from 'react'
import Banner from './Banner/Banner'
import Counter from './Counter/Counter'
import CarRentalSearch from './CarRentalSearch/CarRentalSearch'
import RentalCars from './RentalCars/RentalCars'
import BrandImage from '../BrandImage/BrandImage'
import Services from './Services/Services'
import Blogs from './Blogs/Blogs'


function Home() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Banner />
      <CarRentalSearch />
      <Counter />
      <BrandImage />
      <Services />
      <RentalCars />
      <Blogs />
    </div>
  )
}

export default Home