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
    const x = useRef()
    const w = useRef()
    const y = useRef()
    const h = useRef()
    const o = useRef()
    const [params, setSearchParams] = useSearchParams()

    return (
        <div className={cls.Filter}>
            <button className={cls.Filter__btn} onClick={() => {
                SetInoutVal('')
                SetInoutVal1('')
                SetCahnegSet(true)
                setSearchParams({ ...paramsToObject(params.entries()), companyName: "", Group: "", rate: "", year: "" })
                o.current.classList.remove('displayBlock')

            }}>
                {cahneSet ? <FilterIcon /> : <CloseIcon />}
                フィルター
            </button>
            {page == 'recruiter' ? <>
                <div className={cls.Filter__Select} onClick={() => {
                    y.current.classList.add("displayBlock")
                    o.current.classList.add('displayBlock')

                }}>
                    <p className={cls.Filter__Select__p}>会社名</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                    />
                    <div ref={o} className={cls.Filter__Select__dropdown}>
                        <input
                            className={cls.Filter__Select__dropdown__search}
                            type="text"
                            placeholder='入力'
                            value={inoutVal}
                            onChange={(e) => {
                                setSearchParams({ ...paramsToObject(params.entries()), companyName: e.target.value })
                                SetCahnegSet(false)
                                SetInoutVal1(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div ref={y} onClick={(e) => {
                    if (e.target == y.current) {
                        y.current.classList.remove("displayBlock")
                        x.current.classList.remove("displayBlock")
                        w.current.classList.remove("displayBlock")
                        h.current.classList.remove("displayBlock")
                        o.current.classList.remove("displayBlock")
                    }
                }} className={cls.Filter__backround}></div>
            </> : <>
                <div className={cls.Filter__Select} onClick={() => {
                    y.current.classList.add("displayBlock")
                    w.current.classList.add('displayBlock')
                }}>
                    <p className={cls.Filter__Select__p}>グループ</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                    />
                    <div ref={w} className={cls.Filter__Select__dropdown}>
                        <input
                            className={cls.Filter__Select__dropdown__search}
                            type="text"
                            value={inoutVal1}
                            placeholder='グループを入力'
                            onChange={(e) => {
                                setSearchParams({ ...paramsToObject(params.entries()), Group: e.target.value })
                                SetCahnegSet(false)
                                SetInoutVal(e.target.value)

                            }}
                        />
                    </div>
                </div>
                <div className={cls.Filter__Select} onClick={() => {
                    y.current.classList.add("displayBlock")
                    x.current.classList.toggle('displayBlock')
                    SetCahnegSet(false)
                }}>
                    <p className={cls.Filter__Select__p} >人気</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                    />
                    <div ref={x} className={cls.Filter__Select__dropdown}>
                        {filterRate?.map(e => (
                            <p
                                key={e?.id}
                                className={`${cls.Filter__Select__dropdown__text}  ${params.get('rate') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                onClick={() => {
                                    setSearchParams({ ...paramsToObject(params.entries()), rate: e?.link })
                                    SetCahnegSet(false)
                                }}
                            >
                                {e.text}
                            </p>
                        ))}

                    </div>
                </div>
                <div className={cls.Filter__Select} onClick={() => {
                    y.current.classList.add("displayBlock")
                    h.current.classList.toggle("displayBlock")
                    SetCahnegSet(false)
                }}>
                    <p className={cls.Filter__Select__p}>年</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                        objectFit="contain"
                    />
                    <div ref={h} className={cls.Filter__Select__dropdown}>
                        {YearsRate?.map(e => (
                            <p
                                key={e?.id}
                                className={`${cls.Filter__Select__dropdown__text}  ${params.get('year') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                onClick={() => {
                                    setSearchParams({ ...paramsToObject(params.entries()), year: e?.link })
                                    SetCahnegSet(false)
                                }}

                            >
                                {e.text}
                            </p>
                        ))}

                    </div>
                </div>
                <div ref={y} onClick={(e) => {
                    if (e.target == y.current) {
                        y.current.classList.remove("displayBlock")
                        x.current.classList.remove("displayBlock")
                        w.current.classList.remove("displayBlock")
                        h.current.classList.remove("displayBlock")
                        o.current.classList.remove("displayBlock")
                    }
                }} className={cls.Filter__backround}></div>
            </>}


        </div>
    )
}
