import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useInView } from 'react-intersection-observer'

import { SpecialisationsGet } from "../../../services/specialisations";
import StudentTeachPage from "../../../components/Pages/Teacher/Student";
import { GroupGetById } from "../../../services/gruop";

export default function Teachertudent({ role }) {

  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const param = useParams()
  const { data: specialisation } = useQuery('specialisation', SpecialisationsGet)

  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['student', params.get('Group'), params.get('rate'), params.get('year'), params.get('search')],
    async () => await GroupGetById(param?.id, {

      group: params.get('Group') || '',
      search: params.get('search') || '',
      rate: params.get('rate') || '',
      year: params.get('year') || ''
    }) || {},
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])
  return (
    <>
      <StudentTeachPage data={data?.pages[0]} role={role} Specialisation={specialisation} ref={ref} />
    </>
  )
}