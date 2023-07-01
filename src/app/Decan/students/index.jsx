import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StudentPage from "../../../components/Pages/Decan/Student";
import { SpecialisationsGet } from "../../../services/specialisations";
import { StudentsGet, StudentsGetSearch } from "../../../services/student";

export default function DecanStudent() {
  const [data, setData] = useState([])
  const [Specialisation, setSpecialisation] = useState([])
  const [cahnge, setChage] = useState(false)
  const location = useLocation()
  const query = location?.search.split('?')?.[1]?.split('=')?.[1]

  useEffect(() => {
    const fetchData = async () => {
      const res = await StudentsGetSearch(query);
      setData(res?.rows)
    }
    if (query == undefined) {
      console.log("error")
    } else {
      fetchData()
        .then((err) => {
          console.log(err);
        })
    }

  }, [query])

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
