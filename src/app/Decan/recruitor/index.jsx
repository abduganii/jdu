import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecruitorPage from "../../../components/Pages/Decan/Recrotuir";
import { RecruitorGet, RecruitorGetSearch } from "../../../services/recruter";

export default function DecanRecruitor() {
  const [data, setData] = useState([])
  const [cahnge, setChage] = useState(false)
  const [params] = useSearchParams()
  useEffect(() => {
    const fetchData = async () => {
      const res = await RecruitorGetSearch(`${params.get('search') ? `?search=${params.get('search')}` : "?search="}${params.get('companyName') ? `&company=${params.get('companyName')}` : ""}`)
      setData(res?.rows)
    }
    fetchData()
      .then((err) => {
        console.log(err);
      })
  }, [params])


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