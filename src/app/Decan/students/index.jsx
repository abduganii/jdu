import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StudentPage from "../../../components/Pages/Decan/Student";
import { SpecialisationsGet } from "../../../services/specialisations";
import { StudentsGet, StudentsGetSearch } from "../../../services/student";

export default function DecanStudent() {
  const [data, setData] = useState([])
  const [Specialisation, setSpecialisation] = useState([])
  const [cahnge, setChage] = useState(false)
  const [params, setSearchParams] = useSearchParams()
  const [res, setRes] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const res = await StudentsGetSearch("search", params.get('search'))
      setData(res?.rows)
    }
    if (params.get('search') == undefined) {
      console.log("error")
    } else {
      fetchData()
        .then((err) => {
          console.log(err);
        })
    }
  }, [params.get('search')])
  useEffect(() => {
    const fetchData = async () => {
      const res = await StudentsGetSearch("group", params.get('Group'))
      setData(res?.rows)
    }
    if (params.get('Group') == undefined) {
      console.log("error")
    } else {
      fetchData()
        .then((err) => {
          console.log(err);
        })
    }
  }, [params.get('Group')])

  useEffect(() => {
    const fetchData = async () => {
      const res = await StudentsGetSearch("rate", params.get('rate'))
      setData(res?.rows)
    }
    if (params.get('rate') == undefined) {
      console.log("error")
    } else {
      fetchData()
        .then((err) => {
          console.log(err);
        })
    }
  }, [params.get('rate')])

  useEffect(() => {
    const fetchData = async () => {
      const res = await StudentsGetSearch("year", params.get('year'))
      setData(res?.rows)
    }
    if (params.get('year') == undefined) {
      console.log("error")
    } else {
      fetchData()
        .then((err) => {
          console.log(err);
        })
    }
  }, [params.get('year')])

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
