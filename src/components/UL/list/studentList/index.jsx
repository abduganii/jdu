
import PlusBtn from '../../buttun/plusBtn'
import SkillBtn from '../../buttun/skill'
import DoteBtn from '../../buttun/doteBtn'

import React from 'react'
import { SelectIcon } from '../../icons'
import cls from "./StudentList.module.scss"
import { useNavigate } from 'react-router-dom'

export default function StudentList({ isSelcted, avatar, name, id, skills = [], rate }) {
    const router = useNavigate()
    return (
        <li className={cls.StudentList}>
            <div className={cls.StudentList__select}>
                <SelectIcon fill={`${isSelcted ? "#F7C02F" : "none"}`} border={"#F7C02F"} />
            </div>
            <div className={cls.StudentList__pirson} onClick={() => router(`/recruitor/students/${id}`)}>
                <img
                    src={avatar}
                    width={48}
                    height={48}
                />
                <div className={cls.StudentList__pirson__div}>
                    <p className={cls.StudentList__pirson__name}>{name}</p>
                    <p className={cls.StudentList__pirson__id}> ID:{id}</p>
                </div>
            </div>
            <div className={cls.StudentList__skill}>
                {skills.slice(0, 3).map(e => (
                    <SkillBtn name={e} color={'#E44D26'} backround={'rgba(241, 101, 41, 0.1)'} />
                ))}
                <PlusBtn lenght={skills.length - 3} />
            </div>
            <div className={cls.StudentList__progres}>
                <progress className={cls.StudentList__progres__progress} value={rate} max="100">70 %</progress>
                <p className={cls.StudentList__progres__text}>{rate}%</p>
            </div>
            <DoteBtn onClick={(e) => console.log(e)} />
            <hr className={cls.StudentList__line} />
        </li>
    )
}
