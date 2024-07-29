import axios from "axios";
import { useState } from "react";

export const useAxios = () => {

  const [data, setData] = useState([]);

  const GET = async (url) => {
    const res = await axios.get(url);
    console.log("GET", res);
    setData(res?.data);
  };

  const PUT = async (url, index, param) => {
    await axios.put(`${url}/` + index, param);
    GET(`${url}/${index}`);
  };

  const POST = async (url, index, param) => {
    await axios.post(`${url}/` + index, param);
    GET(`${url}/${index}`);
  };

  const DELETE = async (url, index, param) => {
    await axios.delete(`${url}/` + index, param);
    GET(`${url}/${index}`);
  };

  return { data, setData, GET, PUT, POST, DELETE };
};

