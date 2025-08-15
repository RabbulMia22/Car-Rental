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
    <div>
      <div className='max-w-7xl mx-auto'>
        <Banner />
      </div>
      <div className='max-w-7xl mx-auto'>
        <CarRentalSearch />
      </div>
      <div>
        <Counter />
      </div>
      <div className='max-w-7xl mx-auto'>
        <BrandImage />
      </div>
     <div className='max-w-7xl mx-auto'>
       <Services />
     </div>
     <div>
       <RentalCars />
     </div>
      <div>
        <Blogs />
      </div>
    </div>
  )
}

export default Home