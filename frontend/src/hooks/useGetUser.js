import {
  useEffect,
  useState
} from "react";
import {
  useCookies
} from "react-cookie";
import APIUser from "../services/api-users";


export function useGetUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["mr-token"]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const data = await APIUser.getUserFromToken(cookies["mr-token"])
        .catch(err => setError(err));
      setData(data);
      setLoading(false);
    }
    fetchData()
  }, []);
  return [data, loading, error]
}
