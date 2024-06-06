import {
  useEffect,
  useState
} from "react";
import {
  useCookies
} from "react-cookie";
import APISupply from "../services/api-tanks";


export function useLoadingTanks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["mr-token"]);

  useEffect(() => {
    async function fetchData(params) {
      setLoading(true);
      setError(null);
      const data = await APISupply.allTanks(cookies["mr-token"])
        .catch(err => setError(err));
      setData(data);
      setLoading(false);
    }
    fetchData()
  }, []);
  return [data, loading, error]
}
