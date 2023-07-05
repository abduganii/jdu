
import PlusBtn from '../../buttun/plusBtn'
import SkillBtn from '../../buttun/skill'
import DoteBtn from '../../buttun/doteBtn'

import React, { useState } from 'react'
import { SelectIcon } from '../../icons'
import cls from "./StudentList.module.scss"
import { useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar'
import { StudentSelect, StudentSelectDel } from '../../../../services/recruter'

export default function StudentList({ isSelcted, avatar, name, id, loginId, skills = [], rate }) {
    const router = useNavigate()
    const [color, setColor] = useState(isSelcted)

    return (
        <li className={cls.StudentList}>
            <div className={cls.StudentList__select} onClick={(e) => {
                if (color) {
                    StudentSelectDel(id)
                } else {
                    StudentSelect(id)
                }
                setColor(!color)
            }}>
                <SelectIcon fill={`${color ? "#F7C02F" : "none"}`} border={"#F7C02F"} />
            </div>
            <div className={cls.StudentList__pirson} onClick={() => router(`/recruitor/students/${id}`)}>
                {avatar ? <img
                    src={avatar}
                    width={48}
                    height={48}
                    alt="img"
                /> : <Avatar name={name} size="48" round={true} />}
                <div className={cls.StudentList__pirson__div}>
                    <p className={cls.StudentList__pirson__name}>{name}</p>
                    <p className={cls.StudentList__pirson__id}> ID:{loginId}</p>
                </div>
            </div>
            {skills.length !== 0 ? <div className={cls.StudentList__skill}>
                {skills.slice(0, 3).map(e => (
                    <SkillBtn name={e?.skill?.name} color={e?.skill?.color} backround={'rgba(241, 101, 41, 0.1)'} />
                ))}
                {(skills?.length - 3) > 0 ? <PlusBtn lenght={skills.length - 3} /> : ""}

            </div> : <div className={cls.StudentList__skill}></div>}
            <div className={cls.StudentList__progres}>
                <progress className={cls.StudentList__progres__progress} value={rate} max="100">70 %</progress>
                <p className={cls.StudentList__progres__text}>{rate}%</p>
            </div>
            <DoteBtn style={{ marginLeft: "auto" }} onClick={(e) => console.log(e)} />
            <DoteBtn />

            <hr className={cls.StudentList__line} />
        </li>
    )
}
