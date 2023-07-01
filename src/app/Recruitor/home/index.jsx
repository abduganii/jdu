import { useEffect, useState } from "react";
import HomePage from "../../../components/Pages/Recruitor/homePage";


export default function RecHome({ data, role, count }) {

  return (
    <>
      <HomePage data={data} role={role} count={count} />
    </>
  )
}
