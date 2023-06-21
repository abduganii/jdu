

import React from 'react'
import { RightIcon } from '../../icons'

import cls from "./TopStudent.module.scss"

export default function TopStudentList({ name, avatar, progress, onClick }) {
    return (
        <div className={cls.TopStudentList} onClick={onClick}>
            <div className={cls.TopStudentList__img}>

                <img
                    src={avatar}
                    alt="img"
                    width={44}
                    height={44}
                    objectFit="cover"

                />
            </div>
            <div className={cls.TopStudentList__right}>
                <div className={cls.TopStudentList__top}>
                    <p className={cls.TopStudentList__name}>{name}</p>
                    <RightIcon />
                </div>
                <div className={cls.TopStudentList__btm}>
                    <progress className={cls.TopStudentList__btm__progress} value={progress} max="100">70 %</progress>
                    <p className={cls.TopStudentList__btm__text}>{progress}%</p>
                </div>
            </div>
        </div>
    )
}
