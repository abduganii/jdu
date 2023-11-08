import HomePage from "../../../components/Pages/Student/home";

export default function StudentHome({ data, user, count }) {
  return (
    <>
      <HomePage data={data} user={user} count={count} />
    </>
  )
}
