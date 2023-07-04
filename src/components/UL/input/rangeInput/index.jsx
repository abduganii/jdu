'use client'
import { useEffect, useState } from 'react'
import cls from "./RangeInput.module.scss"

export default function RangeInput({ lessonType, color, defaultRange, disabled = false, onChange, ...other }) {
    const [rangeValue, setRangeValue] = useState(defaultRange)

    useEffect(() => (
        setRangeValue(defaultRange)
    ), [defaultRange])
    return (
        <div className={cls.RangeInput} {...other}>
            <p className={cls.RangeInput__text}>{lessonType}</p>
            <div className={cls.RangeInput__wrap}>
                <p className={cls.RangeInput__text}>{rangeValue}%</p>
                <input
                    type="range"
                    value={rangeValue}
                    disabled={disabled}
                    className={`${cls.RangeInput__input} ${disabled && cls.RangeInput__disabled}`}
                    style={{ background: color, WebkitSliderThumb: color }}
                    onChange={(e) => {
                        setRangeValue(e.target.value)
                        onChange(e.target.value)
                    }} />
            </div>
        </div>
    )
}
