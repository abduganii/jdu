import HomePage from "../../../components/Pages/Parants/home";

export default function ParentHome({ data, user, count }) {
    return (
        <>
            <HomePage data={data} user={user} count={count} />
        </>
    )
}
