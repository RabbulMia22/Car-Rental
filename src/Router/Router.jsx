
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layout/HomeLayout';
import Home from '../pages/Home/Home';
import OurService from '../pages/OurService/OurService';
import OurCar from '../pages/OurCar/OurCar';
import About from '../pages/About/About';
import OurBlog from '../pages/OurBlog/OurBlog';
import Contact from '../pages/Contact/Contact';
import AddCarForm from '../pages/AddCarForm/AddCarForm';

export const Router = createBrowserRouter([
   {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "our-services",
        element: <OurService />
      },
      {
        path: "our-cars",
        element: <OurCar />
      },
      {
        path: "aboutus",
        element: <About />
      },
      {
        path: "blogs",
        element: <OurBlog />
      },
       {
        path: "contact",
        element: <Contact />
      },
      {
        path: "add-car",
        element: <AddCarForm />
      }

    ]
   }
])