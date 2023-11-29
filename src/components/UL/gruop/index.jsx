import RightAsideWrapper from '../Aside/RightAsideWrapper'
import cls from "./topStudents.module.scss"
// import { Student } from './data'
import TopStudentList from '../list/topStudent'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ListModal from '../madals/listMadal'
import DoteBtn from '../buttun/doteBtn'
import { GruopPlusIcons } from '../icons'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { GruopGet } from '../../../services/gruop'
import { useEffect, useRef, useState } from 'react'
import paramsToObject from '../../../utils/paramsToObject.js'
export default function GruopList({ setGrupId1, setGrupIdIm, fitchOnePerson1, fitchOnePerson, gruop = [], update, countGr, CreateGruop, count }) {
    const router = useNavigate()
    const { ref, inView } = useInView()
    const [params, setSearchParams] = useSearchParams()
    const { data, isLoading: isNewsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
        ['group'],
        async ({ pageParam = 1 }) => await GruopGet({
            limit: 15,
            page: pageParam,
            // lang: 'en'
        }) || {},
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage?.count > pages?.length * 15 ? pages.length + 1 : undefined
            }
        }

    )
    const group = data?.pages?.reduce((acc, page) => [...acc, ...page?.row], []) || []


    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView])
    const [useId, setIseId] = useState()
    const x = useRef()
    const y = useRef()

    return (
        <RightAsideWrapper style={{ padding: "24px 20px 10px 24px", position: "relative", margin: "10px 0 78px 0" }}>
            <div >
                <div className={cls.TopStudents} >
                    <div className={cls.TopStudents__wrap}>
                        <h3 className={cls.TopStudents__title}>University Groups</h3>
                        <p className={cls.TopStudents__text}>{count}24 groups for 1376 students </p>
                    </div>
                    <div className={cls.TopStudents__btn} onClick={CreateGruop}><GruopPlusIcons /></div>
                </div>

                {group && group?.map(e => (
                    (
                        <div style={{ position: 'relative' }}>

                            <div className={`${cls.GruopList} ${e?.name == params.get('group') ? cls.GruopListactive : ""}`}>
                                <div className={cls.GruopList__name} onClick={
                                    () => {
                                        setGrupIdIm(e?.id)
                                        setSearchParams({ ...paramsToObject(params.entries()), group: e?.name })
                                    }}>{e?.name}</div>
                                <div className={cls.GruopList__div} onClick={
                                    () => {
                                        setGrupIdIm(e?.id)
                                        setSearchParams({ ...paramsToObject(params.entries()), group: e?.name })
                                    }}>
                                    <h3 className={cls.GruopList__title}>{e?.collection}</h3>
                                    <p className={cls.GruopList__student}>{e?.students} students</p>
                                </div>

                                <DoteBtn style={{ margin: "0 0 0 auto" }} onClick={() => setIseId(e?.id)} />

                            </div>

                            <div ref={x}
                                onClick={e => {
                                    if (e.target == x.current) {
                                        setIseId(false)
                                    }
                                }}
                                style={useId ? { display: "flex" } : { display: "none" }}
                                className={cls.backround}
                            >
                            </div>
                            <ListModal
                                //   onClick={onClick}
                                remove={() => {
                                    setIseId(false)
                                    fitchOnePerson1(e?.id)
                                    remove()
                                }
                                }
                                update={() => {
                                    setIseId(false)
                                    update()
                                    setGrupId1(e?.id)
                                    fitchOnePerson(e?.id)
                                }}
                                style={useId == e?.id ? { display: "block" } : { display: "none" }} />
                        </div>

                    )
                ))
                }

                {/* <div className={`${cls.GruopList} ${cls.GruopList__archive}`}>
                    <div className={cls.GruopList__name}>000</div>
                    <div className={cls.GruopList__div}>
                        <h3 className={cls.GruopList__title}>Archive</h3>
                        <p className={cls.GruopList__student}>0 students</p>
                    </div>


                </div> */}

                <div ref={ref} style={{ padding: "10px" }}></div>

            </div>

        </RightAsideWrapper>
    )
}
