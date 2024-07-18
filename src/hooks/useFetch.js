import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //AbortController은 JS에서 비동기 fetch 작업을 할때 작업을 취소할수 있도록 해주는 인터페이스(ex:fetch 요청이 길어질때 중간에 끊어야함 등등..)
  //AbortController 를 사용한 이유?
  //보통 데이터를 가져올때는 네트워크 통신을 해야하기 때문에 어느정도 시간이 필요함.
  //Home.js에서 fetch를 사용해 데이터를 불러와서 State를 업데이트 시켜주는데 State 업데이트를 완료하기 전에 다른 컴포넌트를 렌더링 해버리니까
  //Home.js를 업데이트 할수 없다고 뜸
  //문제를 해결하기 위해서는 fetch를 통해서 데이터를 가져오고 있는도중에 다른 컴포넌트를 마운트 해서 렌더링 하게 되는 상황에서는 fetch를 중단해야했음
  //문제 해결을 위해 AbortController 와 useEffect의 cleanup fuction을 사용

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsLoading(false);
            setError(err.message);
          }
        });
    }, 200);

    return () => abortCont.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
