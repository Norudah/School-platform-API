import { useState, useEffect } from "react";
import axios from "axios";

export const useRequest = () => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    try {
      params.url = `http://localhost:9000${params.url}`;
      const result = await axios.request(params);
      setResponse(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [response, error, loading, fetchData];
  // return fetchData;
};

// Exemple to use in component:

// const { response, loading, error } = useRequest({
//         method: 'POST',
//         url: '/posts',
//         headers: {
//           accept: '*/*'
//         },
//         data: {
//             userId: 1,
//             id: 19392,
//             title: 'title',
//             body: 'Sample text',
//         },
//     });
