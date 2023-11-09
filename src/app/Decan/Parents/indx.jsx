import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from 'react-intersection-observer'

import { RecruitorGet } from "../../../services/recruter";
import PerantPage from "../../../components/Pages/Decan/Parents";



export default function DecParents() {
  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['parents', params.get('search')],
    async ({ pageParam = 1 }) => await RecruitorGet({
      limit: 15,
      page: pageParam,
      search: params.get('search') || ''
    }) || {},

    {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage);
        return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
      }
    }
  )
  const parents = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])
  return (
    <>
      <PerantPage data={[]} ref={ref} />
    </>
  )
}
