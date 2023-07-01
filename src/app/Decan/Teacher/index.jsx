import { useEffect, useState } from "react";
import TeacherPage from "../../../components/Pages/Decan/Teacher";
import { TeacherGet } from "../../../services/teacher";

export default function DecanTeacher() {
  const [data, setData] = useState([])
  const [cahnge, setChage] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const res = await TeacherGet();
      setData(res?.rows)
    }
    fetchData()
      .then((err) => {
        console.log(err);
      })

  }, [cahnge])
  return (

    <>
      <TeacherPage data={data} onChange={() => setChage(!cahnge)} />
    </>
  )
}
