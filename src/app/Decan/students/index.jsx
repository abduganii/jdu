import { useEffect, useState } from "react";
import StudentPage from "../../../components/Pages/Decan/Student";
import { SpecialisationsGet } from "../../../services/specialisations";
import { StudentsGet } from "../../../services/student";

export default function DecanStudent() {
  const [data, setData] = useState([])
  const [Specialisation, setSpecialisation] = useState([])
  const [cahnge, setChage] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const res = await StudentsGet();
      setData(res?.rows)
    }
    const fetchSpecialisations = async () => {
      const res = await SpecialisationsGet();
      setSpecialisation(res)
    }
    fetchData()
      .then((err) => {
        console.log(err);
      })
    fetchSpecialisations()
      .then((err) => {
        console.log(err);
      })

  }, [cahnge])
  return (
    <>
      <StudentPage data={data} Specialisation={Specialisation} onChange={() => setChage(!cahnge)} />
    </>
  )
}
