import { useEffect, useState } from "react";
import AddNewsPage from "../../../components/Pages/NewPage/AddNews";
import { GetNewsCategory } from "../../../services/news";

export default function AddNews() {
    const [category, setCategory] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await GetNewsCategory();
            setCategory(res)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })

    }, [])
    return (
        <>
            <AddNewsPage categoryArr={category} />
        </>
    )
}
