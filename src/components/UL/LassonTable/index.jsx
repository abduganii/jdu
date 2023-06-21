'use client'
import { useState } from "react"

import cls from "./LessonTable.module.scss"

export default function LessonTable({ children, lassons = [], onClick, ...other }) {
    const [lessonId, setLessonId] = useState()
    const [semestorId, setsemestorId] = useState()

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <>
            <h3 className={cls.LessonTable__title}>Lessons</h3>
            <div className={cls.LessonTable__list}>
                {lassons && lassons.map(e => (
                    <p
                        key={e?.id}
                        className={`${cls.LessonTable__list__text} ${e?.id === lessonId ? cls.LessonTable__lisActive : ""}`}
                        onClick={() => setLessonId(e?.id)}>
                        {e?.text}
                    </p>
                ))}
            </div>
            <div className={cls.LessonTable__table} >
                <div className={cls.LessonTable__table__semester}>
                    <div className={cls.LessonTable__table__semester__div} >
                        <p className={cls.LessonTable__table__text}>semester:</p>
                        {arr.map(e => (
                            <button
                                key={e}
                                className={`${cls.LessonTable__table__btn} ${semestorId == e ? cls.LessonTable__table__btnActive : ""}`}
                                onClick={() => setsemestorId(e)}>
                                {e}
                            </button>
                        ))}
                    </div>
                    <div className={cls.LessonTable__table__semester__div} >
                        <p className={cls.LessonTable__table__text}>whole:</p>
                        <p className={cls.LessonTable__table__all}>229</p>
                    </div>
                </div>
                {children}

            </div>
        </>
    )
}
