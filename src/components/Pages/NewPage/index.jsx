'use client'
import RightAsideWrapper from '../../UL/Aside/RightAsideWrapper'
import BlueButtun from '../../UL/buttun/blueBtn'
import { PlusIcon } from '../../UL/icons'
import TopNewsList from '../../UL/list/Topnews'
import NewsList from '../../UL/list/newsList'
import Container from '../../UL/container'

import { useState, useEffect } from 'react'

import { Category, News } from './data'
import cls from "./NewPage.module.scss"
import { useLocation, useNavigate } from 'react-router-dom'

export default function NewPage() {
    const router = useNavigate()
    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]
    const [endex, setInedex] = useState(query)
    const [roles, setRoles] = useState("")

    useEffect(() => {

        const role = JSON.parse(localStorage.getItem("role"))
        if (role == "decan") {
            setRoles(true)
        } else {
            setRoles(false)
        }


    }, []);
    return (
        <>
            <Container style={{ marginTop: "112px" }}>
                <div className={cls.NewPage__top}>
                    <p
                        className={`${cls.NewPage__top__text} ${"0" === query ? cls.NewPage__top__textActive : ""} `}
                        onClick={() => {
                            router(`/news?categoryNew=0`)
                            setInedex(0)
                        }}
                    >All News</p>
                    {
                        Category?.map((e, i) => (
                            <p
                                onClick={() => {
                                    router(`/news?categoryNew=${e?.id}`)
                                    setInedex(i + 1)
                                }}
                                className={`${cls.NewPage__top__text} ${e.id == query ? cls.NewPage__top__textActive : ""} `}
                            >{e.text}
                            </p>
                        ))}

                    <div className={cls.NewPage__top__line} style={{ left: 90 * endex }}></div>
                </div>
                {
                    News?.slice(0, 10).map(e => (
                        <NewsList
                            key={e?.id}
                            img={e?.image}
                            category={e?.categore}
                            createAt={e?.createAt}
                            text={e?.title}
                            onClick={() => router(`/news/${e?.id}`)} />
                    ))
                }

            </Container>
            <div className={cls.NewPage__left}>
                {true ? <div className={cls.NewPage__left__btn}>
                    <BlueButtun onClick={() => router(`/newsAdd`)} >
                        <PlusIcon />Add News
                    </BlueButtun>
                </div> : <></>}
                <RightAsideWrapper style={{ padding: "30px 18px", marginTop: 0, top: 0 }} >
                    <h3 className={cls.NewPage__left__title}> News</h3>
                    {News.slice(0, 5).map(e => (
                        <TopNewsList key={e.id} text={e?.title} createAt={e?.createAt} />
                    ))}
                </RightAsideWrapper>
            </div>
        </>
    )
}
