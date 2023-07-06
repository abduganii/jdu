import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StudentPage from "../../../components/Pages/Decan/Student";
import { SpecialisationsGet } from "../../../services/specialisations";
import { StudentsGet, StudentsGetSearch } from "../../../services/student";

export default function DecanStudent() {
  const [data, setData] = useState([])
  const [Specialisation, setSpecialisation] = useState([])
  const [cahnge, setChage] = useState(false)
  const [params] = useSearchParams()

  useEffect(() => {

    const fetchData = async () => {
      const res = await StudentsGetSearch(`${params.get('search') ? `?search=${params.get('search')}` : "?search="}${params.get('Group') ? `&group=${params.get('Group')}` : ""}${params.get('rate') ? `&rate=${params.get('rate')}` : ""}${params.get('year') ? `&year=${params.get('year')}` : ""}`)
      setData(res?.rows)
    }
    fetchData()
      .then((err) => {
        console.log(err);
      })
  }, [params])

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
