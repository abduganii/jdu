import { useEffect, useState } from "react";
import RecruitorPage from "../../../components/Pages/Decan/Recrotuir";
import { RecruitorGet } from "../../../services/recruter";

export default function DecanRecruitor() {

  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await RecruitorGet();
      setData(res?.rows)
    }
    fetchData()
      .then((err) => {
        console.log(err);
      })

  }, []);


  return (
    <>
      <RecruitorPage data={data} />
    </>
  )
}