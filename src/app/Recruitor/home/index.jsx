import { useEffect, useState } from "react";
import HomePage from "../../../components/Pages/Recruitor/homePage";


export default function RecHome({ data, user, count }) {

  return (
    <>
      <HomePage data={data} user={user} count={count} />
    </>
  )
}
