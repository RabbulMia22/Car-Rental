
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layout/HomeLayout';
import Home from '../pages/Home/Home';
import OurService from '../pages/OurService/OurService';
import OurCar from '../pages/OurCar/OurCar';
import About from '../pages/About/About';
import OurBlog from '../pages/OurBlog/OurBlog';
import Contact from '../pages/Contact/Contact';
import AddCarForm from '../pages/AddCarForm/AddCarForm';
import CarDetails from '../components/CarDetails/CarDetails';
import ReserveCar from '../components/ReserveCar/ReserveCar';
import AhuthenticationLayout from '../layout/AhuthenticationLayout';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import PrivateRoutes from '../privateRoutes/PrivateRoutes';
import DasshboardLayout from '../layout/DashboardLayout';
import BookedCar from '../pages/BookedCar/BookedCar';
import BookingCar from '../pages/AdminDashBoard/BookingCar';
import DashBoardHome from '../pages/AdminDashBoard/DashBoardHome';
import AllCar from '../pages/AdminDashBoard/AllCar';
import UserCarMap from '../pages/UserCarMap/UserCarMap';

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
        path: "car/:id",
        element: <CarDetails />
      },
      {
        path: "reserve/:id",
        element: <PrivateRoutes><ReserveCar /></PrivateRoutes>
      },
      {
        path: "booked",
        element: <PrivateRoutes><BookedCar /></PrivateRoutes>
      },
     
    ]
   },
   {
    element:<AhuthenticationLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
   },
   {
    path: "dashboard",
    element: <DasshboardLayout />,
    children: [
      {
        index: true,
        element: <DashBoardHome />
      },

      {
        path: "bookings",
        element: <BookingCar />
      },
      {
        path: "add-car",
        element: <AddCarForm />
      },
      {
        path: "all-cars",
        element: <AllCar />
      },
    ]
   }
])