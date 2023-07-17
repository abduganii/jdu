import { useState, useEffect } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RightAsideWrapper from '../../UL/Aside/RightAsideWrapper'
import BlueButtun from '../../UL/buttun/blueBtn'
import { PlusIcon } from '../../UL/icons'
import TopNewsList from '../../UL/list/Topnews'
import NewsList from '../../UL/list/newsList'
import Container from '../../UL/container'
import { GetNews, getNewsCategories } from '../../../services/news'
import { News } from './data'
import cls from "./NewPage.module.scss"
import paramsToObject from '../../../utils/paramsToObject'

export default function NewPage({ user }) {
    const router = useNavigate()
    const { ref, inView } = useInView()
    const [params, setSearchParams] = useSearchParams()
    const [endex, setInedex] = useState(0)
    const { data: categories } = useQuery('categories', getNewsCategories)
    const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
        ['news', params.get('categoryId'), params.get('search')],
        async ({ pageParam = 1 }) => await GetNews({
            limit: 6,
            page: pageParam,
            categoryId: params.get('categoryId') || '',
            search: params.get('search') || '',
            // lang: 'en'
        }) || {},
        {
            getNextPageParam: (lastPage, pages) => {
                console.log(lastPage);
                return lastPage?.count > pages?.length * 6 ? pages.length + 1 : undefined
            }
        }
    )
    const news = data?.pages?.reduce((acc, page) => [...acc, ...page?.rows], []) || []

    useEffect(() => {
        console.log(hasNextPage);
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView])

    return (
        <>
            <Container style={{ marginTop: "112px" }}>
                <div className={cls.NewPage__top}>
                    <p
                        className={`${cls.NewPage__top__text} ${!params.get('categoryId') ? cls.NewPage__top__textActive : ""} `}
                        onClick={() => {
                            setSearchParams({ categoryId: '' })
                            setInedex(0)
                        }}
                    >
                        全ニュース
                    </p>
                    {
                        categories?.map((e, i) => (
                            <p
                                key={e.id}
                                className={`${cls.NewPage__top__text} ${e.id == params.get('categoryId') ? cls.NewPage__top__textActive : ""} `}
                                onClick={() => {
                                    setSearchParams({ ...paramsToObject(params.entries()), categoryId: e.id })
                                    setInedex(i + 1)
                                }}
                            >
                                {e.name}
                            </p>
                        ))}

                    <div className={cls.NewPage__top__line} style={{ left: 90 * endex }}></div>
                </div>
                {
                    news?.length > 0 && news.map(e => (
                        <NewsList
                            id={e?.id}
                            key={e?.id}
                            img={e?.image}
                            category={e?.category?.name}
                            createAt={e?.publishDate}
                            text={e?.languages[0]?.title}
                            role={user?.role}
                            onClick={() => router(`/news/${e?.id}`)}
                        />
                    ))
                }
                <div ref={ref} style={{ padding: '20px' }}></div>
            </Container>
            <div className={cls.NewPage__left}>
                {user?.role === "decan" ? <div className={cls.NewPage__left__btn}>
                    <BlueButtun onClick={() => {
                        router(`/newsAdd`)
                        localStorage.clear("object")
                    }} style={{ marginLeft: "auto", marginRight: "20px" }}>
                        <PlusIcon />ニュース追加
                    </BlueButtun>
                </div> : <></>}
                <RightAsideWrapper style={{ padding: "30px 18px", marginTop: 0, top: 0 }} >
                    <h3 className={cls.NewPage__left__title}> ニュース</h3>
                    {news?.length > 0 && news.slice(0, 5).map(e => (
                        <TopNewsList key={e.id} text={e?.languages[0]?.title} onClick={() => router(`/news/${e?.id}`)} createAt={e?.publishDate} />
                    ))}
                </RightAsideWrapper>
            </div>
        </>
    )
}
