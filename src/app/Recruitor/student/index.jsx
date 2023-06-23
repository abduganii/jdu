import { useEffect, useState } from "react";
import StudentsPage from "../../../components/Pages/Recruitor/StudentsPage";
import { StudentsGet } from "../../../services/student";

export default function RecStudent() {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await StudentsGet();
            setData(res?.rows)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })


    }, [])
    return (
        <>
            <StudentsPage data={data} />
        </>
    )
}
