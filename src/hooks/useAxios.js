import axios from "axios";
import { useState } from "react";
export const instance = axios.create({
  baseURL: "http://localhost:3001/blog",
  timeout: 1800000,
});

// export const GET = async (url, index) => {
//   // 먼저 유알엘 넣고 파람은 마지막에 인덱스 값 넣도록 해서 호출을 하도록
//   const data = await instance.get(`${url}/${index}`);
//   return data;
// };

// export const PUT = async (url, index, postData) => {
//   // 먼저 유알엘 넣고 파람은 마지막에 인덱스 값 넣도록 해서 호출을 하도록
//   const data = await instance.put(`${url}/${index}`, postData);
//   return data;
// };

export const useAxios = (method, url, index, param) => {
  const [data, setData] = useState(null);

  switch (method) {
    case "GET":
      // eslint-disable-next-line no-case-declarations
      const get = axios.get(`${url}/${index}`, {});
      get.then((res) => {
        console.log("res", res);
        // console.log(JSON.parse(res?.data));
        setData(JSON.parse(res?.data));
      });

      return { data };

    case "POST":
      // eslint-disable-next-line no-case-declarations
      const post = axios.post(`${url}/${index}`, { param });
      post.then((res) => {
        setData(JSON.parse(res?.data));
      });
      return { data };

    case "PUT":
      // eslint-disable-next-line no-case-declarations
      const put = axios.put(`${url}/${index}`, { param });
      put.then((res) => {
        setData(JSON.parse(res?.data));
      });

      return { data };
    case "DELETE":
      // eslint-disable-next-line no-case-declarations
      const del = axios.delete(`${url}/${index}`, { param });
      del.then((res) => {
        setData(res?.data);
      });
      return { data };

    default:
  }
};

// const useAxios = () => {

//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = import.meta.env.VITE_BASE_URL;

//   // 기본 axios 인스턴스 생성
//   const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     timeout: 10000,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   // get
//   const axiosGetData = async () => {
//     try {
//       const response = await axiosInstance
//         .get(BASE_URL)
//         .then((res) => {
//           if (!res.ok) {
//             throw Error("could not fetch the data for that resource");
//           }
//           return response.data;
//         })
//         .then((data) => {
//           setData(data);
//           setIsLoading(false);
//           setError(null);
//         });

//     } catch (err) {
//       if (err.name === "AbortError") {
//         console.log("axios aborted");
//       } else {
//         setIsLoading(false);
//         setError(err.message);
//       }
//     }
//   };
// };

// // put
// const axiosPutData = async () => {
//   try {
//     const response = await axiosInstance
//       .put(BASE_URL,data)
//       .then((res) => {
//         if (!res.ok) {
//           throw Error("could not fetch the data for that resource");
//         }
//         return response.data;
//       })
//       .then((data) => {
//         setData(data);
//         setIsLoading(false);
//         setError(null);
//       });

//   } catch (err) {
//     if (err.name === "AbortError") {
//       console.log("axios aborted");
//     } else {
//       setIsLoading(false);
//       setError(err.message);
//     }
//   }
// };

// };
