import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from 'react-intersection-observer'
import TeacherPage from "../../../components/Pages/Decan/Teacher";
import { TeacherGet } from "../../../services/teacher";

export default function DecEmployees() {


  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['teachers', params.get('search')],
    async ({ pageParam = 1 }) => await TeacherGet({
      limit: 15,
      page: pageParam,
      company: params.get('companyName') || '',
      search: params.get('search') || '',
      // lang: 'en'
    }) || {},

    {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage);
        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )
  const teachers = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []


  useEffect(() => {
    console.log(hasNextPage);
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (

    <>
      <TeacherPage data={teachers} ref={ref} />
    </>
  )
}
