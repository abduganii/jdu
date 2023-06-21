'use client'

import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FilterIcon } from '../icons.jsx'

import { filterRate } from './data.js'

import cls from "./filter.module.scss"

export default function Filter() {
    const navigate = useNavigate()
    const x = useRef()
    const w = useRef()
    const y = useRef()
    return (
        <div className={cls.Filter}>
            <button className={cls.Filter__btn}>
                <FilterIcon />
                Filter
            </button>
            <div className={cls.Filter__Select} onClick={() => {
                y.current.classList.add("displayBlock")
                w.current.classList.toggle('displayBlock')
            }}>
                <p className={cls.Filter__Select__p}>Skills</p>
                <img
                    src={'/Image/icons.svg'}
                    width={16}
                    height={16}
                />
                <div ref={w} className={cls.Filter__Select__dropdown}>
                    {filterRate?.map(e => (
                        <p
                            key={e?.id}
                            className={`${cls.Filter__Select__dropdown__text} `}
                            onClick={() => navigate(`?rate=${e.link}`)}
                        >
                            {e.text}
                        </p>
                    ))}

                </div>
            </div>
            <div className={cls.Filter__Select} onClick={() => {
                y.current.classList.add("displayBlock")
                x.current.classList.toggle('displayBlock')
            }}>
                <p className={cls.Filter__Select__p} >Rate</p>
                <img
                    src={'/Image/icons.svg'}
                    width={16}
                    height={16}
                />
                <div ref={x} className={cls.Filter__Select__dropdown}>
                    {filterRate?.map(e => (
                        <p
                            key={e?.id}
                            className={`${cls.Filter__Select__dropdown__text} `}
                            onClick={() => navigate(`?rate=${e.link}`)}
                        >
                            {e.text}
                        </p>
                    ))}

                </div>
            </div>
            <div className={cls.Filter__Select}>
                <p className={cls.Filter__Select__p}>Year</p>
                <img
                    src={'/Image/icons.svg'}
                    width={16}
                    height={16}
                    objectFit="contain"
                />

            </div>
            <div ref={y} onClick={(e) => {
                if (e.target == y.current) {
                    y.current.classList.remove("displayBlock")
                    x.current.classList.remove("displayBlock")
                    w.current.classList.remove("displayBlock")
                }

            }} className={cls.Filter__backround}></div>
        </div>
    )
}
