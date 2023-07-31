import HomePage from "../../../components/Pages/Recruitor/homePage";

export default function StudentHome({ data, role, count }) {

  return (
    <>
      <HomePage data={data} role={role} count={count} />
    </>
  )
}
