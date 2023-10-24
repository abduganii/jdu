import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useInView } from 'react-intersection-observer'

import { SpecialisationsGet } from "../../../services/specialisations";
import { StudentsGet } from "../../../services/student";
import StudentPage from "../../../components/Pages/Decan/Student";
import StudentTeachPage from "../../../components/Pages/Teacher/Student";

export default function Teachertudent({ role }) {
  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const { data: specialisation } = useQuery('specialisation', SpecialisationsGet)

  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['student', params.get('Group'), params.get('rate'), params.get('year'), params.get('search')],
    async ({ pageParam = 1 }) => await StudentsGet({
      limit: 15,
      page: pageParam,
      group: params.get('Group') || '',
      search: params.get('search') || '',
      rate: params.get('rate') || '',
      year: params.get('year') || ''
    }) || {},
    {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage);
        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )

  const students = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])
  return (
    <>
      <StudentTeachPage data={students} role={role} Specialisation={specialisation} ref={ref} />
    </>
  )
}