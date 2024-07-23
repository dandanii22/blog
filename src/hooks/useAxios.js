import axios from "axios";
import { useState } from "react";

export const useAxios = () => {
  // let url = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState(null);

  const GET = async (url, index) => {
    const res = await axios.get(`${url}/` + index);
    setData(res?.data);
  };

  const PUT = async (url, index, param) => {
    await axios.put(`${url}/${index}`, param);
    GET(url, index);
  };

  const POST = async (url, index, param) => {
    await axios.post(`${url}/` + index, param);
    GET(url, index);
  };

  const DELETE = async (url, index, param) => {
    await axios.delete(`${url}/` + index, param);
    GET(url, index);
  };

  return { data, setData, GET, PUT, POST, DELETE };
};
