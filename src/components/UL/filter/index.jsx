'use client'

import { useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import paramsToObject from '../../../utils/paramsToObject.js'
import { FilterIcon } from '../icons.jsx'

import { filterRate, YearsRate } from './data.js'

import cls from "./filter.module.scss"

export default function Filter({ page }) {
    const navigate = useNavigate()
    const x = useRef()
    const w = useRef()
    const y = useRef()
    const h = useRef()
    const o = useRef()
    const [params, setSearchParams] = useSearchParams()

    return (
        <div className={cls.Filter}>
            <button className={cls.Filter__btn}>
                <FilterIcon />
                Filter
            </button>
            {page == 'recruiter' ? <>
                <div className={cls.Filter__Select} onClick={() => {
                    y.current.classList.add("displayBlock")
                    o.current.classList.add('displayBlock')
                }}>
                    <p className={cls.Filter__Select__p}>Company name</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                    />
                    <div ref={o} className={cls.Filter__Select__dropdown}>
                        <input
                            className={cls.Filter__Select__dropdown__search}
                            type="text"
                            placeholder='Type group here'
                            onChange={(e) => setSearchParams({ ...paramsToObject(params.entries()), companyName: e.target.value })}
                        />
                    </div>
                </div>
            </> : <>
                <div className={cls.Filter__Select} onClick={() => {
                    y.current.classList.add("displayBlock")
                    w.current.classList.add('displayBlock')
                }}>
                    <p className={cls.Filter__Select__p}>Group</p>
                    <img
                        src={'/Image/Icons.svg'}
                        width={16}
                        height={16}
                    />
                    <div ref={w} className={cls.Filter__Select__dropdown}>
                        <input
                            className={cls.Filter__Select__dropdown__search}
                            type="text"
                            placeholder='Type group here'
                            onChange={(e) => setSearchParams({ ...paramsToObject(params.entries()), Group: e.target.value })}
                        />
                    </div>
                </div>
                <div className={cls.Filter__Select} onClick={() => {
                    y.current.classList.add("displayBlock")
                    x.current.classList.toggle('displayBlock')
                }}>
                    <p className={cls.Filter__Select__p} >Rate</p>
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
                                onClick={() => setSearchParams({ ...paramsToObject(params.entries()), rate: e?.link })}
                            >
                                {e.text}
                            </p>
                        ))}

                    </div>
                </div>
                <div className={cls.Filter__Select} onClick={() => {
                    y.current.classList.add("displayBlock")
                    h.current.classList.toggle("displayBlock")
                }}>
                    <p className={cls.Filter__Select__p}>Year</p>
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
                                onClick={() => setSearchParams({ ...paramsToObject(params.entries()), year: e?.link })}

                            >
                                {e.text}
                            </p>
                        ))}

                    </div>
                </div>
            </>}
            <div ref={y} onClick={(e) => {
                if (e.target == y.current) {
                    y.current.classList.remove("displayBlock")
                    x.current.classList.remove("displayBlock")
                    w.current.classList.remove("displayBlock")
                    h.current.classList.remove("displayBlock")
                    o.current.classList.remove("displayBlock")
                }
            }} className={cls.Filter__backround}></div>
        </div>
    )
}
