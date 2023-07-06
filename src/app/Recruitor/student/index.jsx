import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import StudentsPage from "../../../components/Pages/Recruitor/StudentsPage";
import { StudentsGet, StudentsGetSearch } from "../../../services/student";

export default function RecStudent({ data, role, count }) {
    const [datas, setData] = useState([])
    const [change, setChage] = useState(false)
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
        fetchData()
            .then((err) => {
                console.log(err);
            })


    }, [change])
    return (
        <>
            <StudentsPage data={datas} student={data} role={role} count={count} />
        </>
    )
}
