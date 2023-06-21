'use client'
import { useState } from 'react'
import cls from "./RangeInput.module.scss"

export default function RangeInput({ lessonType, onChange, ...other }) {
    const [rangeValue, setRangeValue] = useState(0)
    return (
        <div className={cls.RangeInput} {...other}>
            <p className={cls.RangeInput__text}>{lessonType}</p>
            <div className={cls.RangeInput__wrap}>
                <p className={cls.RangeInput__text}>{rangeValue}%</p>
                <input className={cls.RangeInput__input} type="range" value={rangeValue} onChange={(e) => {
                    setRangeValue(e.target.value)
                }} />
            </div>
        </div>
    )
}
