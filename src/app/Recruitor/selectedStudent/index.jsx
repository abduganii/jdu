import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import StudentsPage from "../../../components/Pages/Recruitor/StudentsPage";
import { StudentsGet, StudentsGetSearch } from "../../../services/student";

export default function RecSeelctStudent({ data:topStudent, role, count }) {
    const { ref, inView } = useInView()
    const [params, setSearchParams] = useSearchParams()
  
  
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
            <StudentsPage selected={true} data={students} student={topStudent} role={role} count={count} />
        </>
    )
}
