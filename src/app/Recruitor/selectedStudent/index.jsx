import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import StudentsPage from "../../../components/Pages/Recruitor/StudentsPage";
import { StudentsGet, StudentsGetSearch } from "../../../services/student";

export default function RecSeelctStudent({ data, role, count }) {
    const [datas, setData] = useState([])
    const [Specialisation, setSpecialisation] = useState([])
    const [change, setChage] = useState(false)
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
        fetchData()
            .then((err) => {
                console.log(err);
            })


    }, [change])

    return (
        <>
            <StudentsPage selected={true} data={datas} student={data} role={role} count={count} />
        </>
    )
}
