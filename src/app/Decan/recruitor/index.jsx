import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecruitorPage from "../../../components/Pages/Decan/Recrotuir";
import { RecruitorGet, RecruitorGetSearch } from "../../../services/recruter";

export default function DecanRecruitor() {
  const [data, setData] = useState([])
  const [cahnge, setChage] = useState(false)
  const location = useLocation()
  const query = location?.search.split('?')?.[1]?.split('=')?.[1]


  useEffect(() => {
    const fetchData = async () => {
      const res = await RecruitorGetSearch(query)
      setData(res?.rows)
    }
    if (query === "true" || query === "false" || query == undefined) {
      console.log("error")
    } else {

      fetchData()
        .catch((err) => {
          console.log(err);
        })

    }
  }, [query])

  useEffect(() => {
    const fetchData = async () => {
      const res = await RecruitorGet();
      setData(res?.rows)
    }
    fetchData()
      .then((err) => {
        console.log(err);
      })

  }, [cahnge])

  return (
    <>
      <RecruitorPage data={data} onChange={() => setChage(!cahnge)} />
    </>
  )
}