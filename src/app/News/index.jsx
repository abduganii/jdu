import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewPage from "../../components/Pages/NewPage";
import { GetNews, SearchNews } from "../../services/news";

export default function News({ user }) {
    const [data, setData] = useState([])
    const location = useLocation()
    const query = location?.search.split('?')?.[1]?.split('=')?.[1]
    console.log(query)
    useEffect(() => {
        const fetchData = async () => {
            const res = await SearchNews(query);
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
