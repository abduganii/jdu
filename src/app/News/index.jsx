import { useEffect, useState } from "react";
import NewPage from "../../components/Pages/NewPage";
import { GetNews } from "../../services/news";

export default function News({ user }) {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await GetNews();
            setData(res?.rows)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })

    }, [])
    return (
        <>
            <NewPage data={data} user={user} />
        </>
    )
}
