import { useEffect, useState } from "react";
import HomePage from "../../../components/Pages/Recruitor/homePage";


export default function RecHome({ data }) {

  return (
    <>
      <HomePage data={data} />
    </>
  )
}
