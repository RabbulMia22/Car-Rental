import React from 'react'
import axios from 'axios';

function useAxiosSecure() {
  const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});
  return axiosSecure;
}

export default useAxiosSecure;