'use client'

import { useRef, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import paramsToObject from '../../../utils/paramsToObject.js'
import { CloseIcon, FilterIcon } from '../icons.jsx'

import { filterRate, YearsRate } from './data.js'

import cls from "./filter.module.scss"

export default function Filter({ page }) {
    const navigate = useNavigate()
    const [cahneSet, SetCahnegSet] = useState(true)
    const [inoutVal, SetInoutVal] = useState()
    const [inoutVal1, SetInoutVal1] = useState()
    const [filterRateText, setRateFilter] = useState("人気")
    const [ys, setY] = useState(false)
    const [w, setW] = useState(false)
    const [x, setX] = useState(false)
    const [h, setH] = useState(false)
    const y = useRef()

    const [params, setSearchParams] = useSearchParams()

    useEffect(() => {
        filterRate.forEach(e => console.log(e))
    }, [params])

    return (
        <div className={cls.Filter}>
            <button className={cls.Filter__btn} onClick={() => {
                SetInoutVal('')
                SetInoutVal1('')
                SetCahnegSet(true)
                setSearchParams({ ...paramsToObject(params.entries()), companyName: "", Group: "", rate: "", year: "" })
                setY(false)
                setW(false)
                setH(false)
                setX(false)
            }}>
                {cahneSet ? <FilterIcon /> : <CloseIcon />}
                フィルター
            </button>
            {page == 'recruiter' ? <>
                <div className={cls.Filter__Select} onClick={() => {
                    setY(true)
                    setW(true)
                }}>
                    <p className={cls.Filter__Select__p}>会社名</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                    />
                    <div className={`${cls.Filter__Select__dropdown} ${w ? "displayBlock" : "displayNone"}`}>
                        <input
                            className={cls.Filter__Select__dropdown__search}
                            type="text"
                            value={inoutVal}
                            placeholder='入力'
                            onChange={(e) => {
                                setSearchParams({ ...paramsToObject(params.entries()), companyName: e.target.value })
                                SetCahnegSet(false)
                                SetInoutVal1(e.target.value)
                            }}
                        />
                    </div>
                </div>

            </> : <>
                <div className={cls.Filter__Select} onClick={() => {
                    setY(true)
                    setW(true)
                }}>
                    <p className={cls.Filter__Select__p}>グループ</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                    />
                    <div className={`${cls.Filter__Select__dropdown} ${w ? "displayBlock" : "displayNone"}`}>
                        <input
                            className={cls.Filter__Select__dropdown__search}
                            type="text"
                            value={inoutVal1}
                            placeholder='グループを入力'
                            onChange={(e) => {
                                setSearchParams({ ...paramsToObject(params.entries()), Group: e.target.value })
                                SetCahnegSet(false)
                                SetInoutVal1(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className={cls.Filter__Select} onClick={() => {
                    setY(true)
                    setX(true)
                    SetCahnegSet(false)
                }}>
                    <p className={cls.Filter__Select__p} > rate</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                    />
                    <div className={`${cls.Filter__Select__dropdown} ${x ? "displayBlock" : "displayNone"}`}>
                        {filterRate?.map(e => (
                            <p key={e?.id}
                                className={`${cls.Filter__Select__dropdown__text} ${params.get('rate') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                onClick={() => {
                                    setSearchParams({ ...paramsToObject(params.entries()), rate: e?.link })
                                    SetCahnegSet(false)
                                    setY(false)
                                    setX(false)
                                }}>{e.text}</p>
                        ))}
                    </div>
                </div>
                <div className={cls.Filter__Select} onClick={() => {
                    setH(true)
                    setY(true)
                    SetCahnegSet(false)
                }}>
                    <p className={cls.Filter__Select__p}>{filterRateText}</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                        objectFit="contain"
                    />
                    <div className={`${cls.Filter__Select__dropdown} ${h ? "displayBlock" : "displayNone"}`}>
                        {YearsRate?.map(e => (
                            <p
                                key={e?.id}
                                className={`${cls.Filter__Select__dropdown__text}  ${params.get('year') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                onClick={() => {
                                    setY(false)
                                    setH(false)
                                    setSearchParams({ ...paramsToObject(params.entries()), year: e?.link })
                                    SetCahnegSet(false)
                                }}

                            >
                                {e.text}
                            </p>
                        ))}

                    </div>
                </div>

            </>}

            <div ref={y} onClick={(e) => {
                if (e.target == y.current) {
                    setY(false)
                    setW(false)
                    setH(false)
                    setX(false)

                }
            }} className={`${cls.Filter__backround} ${ys ? "displayBlock" : "displayNone"}`}></div>
        </div >
    )
}
