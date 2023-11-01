import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from 'react-intersection-observer'
import GroupsPage from '../../../components/Pages/Decan/Groups'
import { GruopGet } from "../../../services/gruop";

export default function DecanGroups() {
  const { ref, inView } = useInView()
  const [params, setSearchParams] = useSearchParams()
  const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['group', params.get('search')],
    async ({ pageParam = 1 }) => await GruopGet({
      limit: 15,
      page: pageParam,
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
  const group = data?.pages?.reduce((acc, page) => [...acc, ...page?.row], []) || []


  useEffect(() => {
    console.log(hasNextPage);
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])
  return (
    <>
      <GroupsPage groups={group} ref={ref} />
    </>
  )
}
