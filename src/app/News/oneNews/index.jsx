import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OnNewsPage from "../../../components/Pages/NewPage/OnNewsPage";
import { GetNewsById } from "../../../services/news";


export default function OneNews() {
    const [data, setData] = useState([])
    const prams = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const res = await GetNewsById(prams?.id);
            setData(res)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
    }, [])
    return (
        <>
            <OnNewsPage data={data} />
        </>
    )
}
