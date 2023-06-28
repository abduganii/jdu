import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StudentsPage from "../../../components/Pages/Recruitor/StudentsPage";
import { StudentsGet, StudentsGetSearch } from "../../../services/student";

export default function RecStudent({ data }) {
    const [datas, setData] = useState([])
    const location = useLocation()
    const query = location?.search.split('?')?.[1]?.split('=')?.[1]
    const [change, setChange] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const res = await StudentsGetSearch(query);
            setData(res?.rows)
        }

        if (query?.length === 0) {
            setChange(!change)
        }
        if (query) {
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
        fetchData()
            .then((err) => {
                console.log(err);
            })


    }, [change])
    return (
        <>
            <StudentsPage data={datas} student={data} />
        </>
    )
}
