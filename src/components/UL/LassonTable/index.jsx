'use client'
import { useEffect, useState } from "react"

import cls from "./LessonTable.module.scss"

export default function LessonTable({ children, lassons = [], chengeSemestur, onClick, ...other }) {
    const [lessonId, setLessonId] = useState()
    const [semestorId, setsemestorId] = useState()

    useEffect(() => {
        if (!lessonId) {
            setLessonId(lassons?.[0]?.id)
        }
    }, [lassons])

    useEffect(() => {
        const arr = lassons?.find(e => e.id == lessonId)
        setsemestorId(arr?.semesters?.[0]?.id)
    }, [lessonId])


    const arr = lassons?.find(e => e.id == lessonId)
    return (
        <>
            <h3 className={cls.LessonTable__title}>Lessons</h3>
            <div className={cls.LessonTable__list}>
                {lassons && lassons.map(e => (
                    <p
                        key={e?.id}
                        className={`${cls.LessonTable__list__text} ${e?.id === lessonId ? cls.LessonTable__lisActive : ""}`}
                        onClick={() => setLessonId(e?.id)}>
                        {e?.name}
                    </p>
                ))}
            </div>
            <div className={cls.LessonTable__table} >
                <div className={cls.LessonTable__table__semester}>
                    <div className={cls.LessonTable__table__semester__div} >
                        <p className={cls.LessonTable__table__text}>semester:</p>
                        {arr?.semesters?.map(e => (
                            <button
                                key={e}
                                className={`${cls.LessonTable__table__btn} ${semestorId == e?.id ? cls.LessonTable__table__btnActive : ""}`}
                                onClick={() => {
                                    setsemestorId(e?.id)
                                    chengeSemestur(e?.id)
                                }}>
                                {e?.semesterNumber}
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
