import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OnePerson from "../../../../components/Pages/OnePerson";
import { RecruitorGetById } from "../../../../services/recruter";


export default function DecanRecruitorBuId() {

    const [data, setData] = useState([])
    const param = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const res = await RecruitorGetById(param?.id);
            setData(res)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })

    }, []);

    return (
        <>
            <OnePerson
                avatar={data?.avatar}
                firstName={data?.firstName}
                lastName={data?.lastName}
                loginId={data?.loginId}
                work={data?.specialisation}
                bio={data?.bio}
            />
        </>
    )
}