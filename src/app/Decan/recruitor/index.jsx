import { useEffect, useState } from "react";
import RecruitorPage from "../../../components/Pages/Decan/Recrotuir";
import { RecruitorGet } from "../../../services/recruter";

export default function DecanRecruitor() {
  const [data, setData] = useState([])
  const [cahnge, setChage] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const res = await RecruitorGet();
      setData(res?.rows)
      console.log(res?.rows)
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