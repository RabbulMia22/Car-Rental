import React from 'react'
import axios from 'axios';

function useAxiosSecure() {
  const axiosSecure = axios.create({
  baseURL: `https://car-rental-server-seven-lovat.vercel.app`,
});
  return axiosSecure;
}

export default useAxiosSecure;