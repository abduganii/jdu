
import PlusBtn from '../../buttun/plusBtn'
import SkillBtn from '../../buttun/skill'
import DoteBtn from '../../buttun/doteBtn'

import React, { useRef, useState } from 'react'
import { SelectIcon } from '../../icons'
import cls from "./StudentList.module.scss"
import { useNavigate, useSearchParams } from 'react-router-dom'
import Avatar from 'react-avatar'
import { StudentSelect, StudentSelectDel } from '../../../../services/recruter'
import ListModal from '../../madals/listMadal'
import { useQueryClient } from 'react-query'

export default function StudentList({ isSelcted, avatar, name, student, id, loginId, select, skills = [], rate }) {
    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    const router = useNavigate()
    const [useId, setIseId] = useState()
    const [clickTrue, setClick] = useState(false)
    const [color, setColor] = useState(isSelcted)
    const [number, setNumber] = useState(0)
    const x = useRef()
    const o = useRef()
    const u = useRef()

    return (
        <div style={{ position: 'relative' }}>
            <li className={cls.StudentList}>
                <div className={cls.StudentList__personWrap}>
                    <div className={cls.StudentList__select} onClick={(e) => {
                        if (color) {
                            StudentSelectDel(id)
                            queryClient.invalidateQueries(['student', params.get('Group'), params.get('rate'), params.get('year'), params.get('search')])
                        } else {
                            StudentSelect(id)
                            queryClient.invalidateQueries(['student', params.get('Group'), params.get('rate'), params.get('year'), params.get('search')])
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
                </div>

                {skills.length !== 0 ? <div className={cls.StudentList__skill} style={clickTrue ? { overflowX: "auto" } : { overflow: "hidden" }}>
                    {skills?.slice(0, (number + 3))?.map(e => (
                        <SkillBtn
                            name={e?.skill?.name}
                            color={e?.skill?.color}
                            backround={e?.skill?.color} />
                    ))}
                    {
                        (skills?.length - (number + 3)) > 0 ?
                            <PlusBtn
                                label={"+"}
                                ref={o}
                                onClick={() => {
                                    setNumber(number + skills?.length)
                                    setClick(true)
                                }}
                                lenght={skills.length - (number + 3)}
                            />
                            : clickTrue ? <PlusBtn
                                label={"<"}
                                ref={u}
                                onClick={() => {
                                    setNumber(number - skills?.length)
                                    setClick(false)
                                }}
                            /> : ""
                    }

                </div> : student ? <div className={cls.StudentList__skill}></div> : ""}
                <div className={cls.StudentList__progres}>
                    <progress className={cls.StudentList__progres__progress} value={rate} max="100">70 %</progress>
                    <p className={cls.StudentList__progres__text}>{Math.round(rate)}%</p>
                </div>
                <DoteBtn onClick={(e) => setIseId(true)} style={{ marginLeft: "100px" }} />


                <hr className={cls.StudentList__line} />

            </li>
            <div
                ref={x}
                onClick={e => {
                    if (e.target == x.current) {
                        setIseId(false)
                    }
                }}
                style={useId ? { display: "flex" } : { display: "none" }}
                className={cls.backround}
            ></div>
            <ListModal
                role={"student"}
                lebel={color ? "取り消す" : " お気に入り"}
                select={(e) => {
                    if (color) {
                        StudentSelectDel(id)
                    } else {
                        StudentSelect(id)
                    }
                    setColor(!color)
                    setIseId(false)
                }}
                style={useId ? { display: "block" } : { display: "none" }}
            />
        </div>


    )
}
