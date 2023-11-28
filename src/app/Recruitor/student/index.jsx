import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import StudentsPage from "../../../components/Pages/Recruitor/StudentsPage";
import { StudentsGet, StudentsGetSearch } from "../../../services/student";

export default function RecStudent({ role }) {
  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()

  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['student', params.get('Group'), params.get('year'), params.get('search')],
    async ({ pageParam = 1 }) => await StudentsGet({
      limit: 15,
      page: pageParam,
      group: params.get('Group') || '',
      search: params.get('search') || '',
      year: params.get('year') || ''
    }) || {},
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )

  let students = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []
  let students2 = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []
  if (!params.get('Group') && !params.get('year') && !params.get('search')) {
    students = null
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <>
      <StudentsPage data={students} data2={students2} role={role} ref={ref} />
    </>
  )
}
