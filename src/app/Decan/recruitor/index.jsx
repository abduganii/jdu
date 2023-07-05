import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecruitorPage from "../../../components/Pages/Decan/Recrotuir";
import { RecruitorGet, RecruitorGetSearch } from "../../../services/recruter";

export default function DecanRecruitor() {
  const [data, setData] = useState([])
  const [cahnge, setChage] = useState(false)
  const [params, setSearchParams] = useSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      const res = await RecruitorGetSearch("search", params.get('search'))
      setData(res?.rows)
    }
    if (params.get('search') === "true" || params.get('search') === "false" || params.get('search') == undefined) {
      console.log("error")
    } else {

      fetchData()
        .catch((err) => {
          console.log(err);
        })

    }
  }, [params.get('search')])
  useEffect(() => {
    const fetchData = async () => {
      const res = await RecruitorGetSearch("company", params.get('companyName'))
      setData(res?.rows)
    }
    if (params.get('companyName') == undefined) {
      console.log("error")
    } else {

      fetchData()
        .catch((err) => {
          console.log(err);
        })

    }
  }, [params.get('companyName')])

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