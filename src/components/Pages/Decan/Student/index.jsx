'use client'
import BlueButtun from '../../../UL/buttun/blueBtn'
import Filter from '../../../UL/filter'
import { PlusIcon } from '../../../UL/icons'
import TopList from '../../../UL/list/TopList'
import PersonList from '../../../UL/list/personList'
import DeleteMadel from '../../../UL/madals/deleteModel'
import AddMadal from '../../../UL/madals/AddMadal'
import AvatarInput from '../../../UL/input/AvatarInput'
import AddInput from '../../../UL/input/AddInput'

import React, { useState } from 'react'
import cls from "./StudentPage.module.scss"
import { Student } from "./data"

import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'


export default function StudentPage() {
    const router = useNavigate()
    const [personId, setPersonId] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)
    const oneStuednt = Student.find(e => e.id === personId)

    return (
        <div className={cls.StudentPage}>
            <div className={cls.StudentPage__filter}>
                <Filter />
                <BlueButtun onClick={() => setOpenMadal(true)}>
                    <PlusIcon />
                    Add Student
                </BlueButtun>
            </div>
            <TopList text={["Student", "Student ID", "Group", "Rate", "Skills", "Actions"]} />

            {Student && Student?.map(e => (
                <PersonList
                    onClick={() => router(`/decan/students/${e?.id}`)}
                    id={e?.id}
                    key={e?.id}
                    name={e?.name}
                    img={e?.avater}
                    gruop={"gruop"}
                    skill={e?.skills}
                    rate={e?.progress}
                    update={() => router(`/decan/students/set/${e?.id}`)}
                    remove={() => setPersonId(e?.id)}
                />
            ))}

            {
                personId && <DeleteMadel
                    id={oneStuednt?.id}
                    name={oneStuednt?.name}
                    avater={oneStuednt?.avater}
                    role={'student'}
                    progress={oneStuednt?.progress}
                    years={"2years"}
                    remove={() => {
                        toast("Student deleted")
                        setPersonId(false)
                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {openMadal &&
                <AddMadal
                    role={"student"}
                    OnSubmit={() => {
                        setOpenMadal(false)
                        toast("Student created")
                    }}
                    closeMadal={() => setOpenMadal(false)}>
                    <AvatarInput onChange={(e) => console.log(e)} style={{ marginBottom: '43px' }} />
                    <div className={cls.StudentPage__addInputs}>
                        <AddInput type={"text"} label={"Firstname"} placeholder={"Firstname"} />
                        <AddInput type={"text"} label={"Lastname"} placeholder={"Lastname"} />
                        <AddInput type={"text"} label={"ID"} placeholder={"ID"} />
                        <AddInput type={"text"} label={"Specialisation"} placeholder={"Specialisation"} />
                        <AddInput type={"text"} label={"Group"} placeholder={"Group"} />
                        <AddInput type={"text"} label={"Course number"} placeholder={"Course number"} />
                    </div>
                </AddMadal>}
            <Toaster />
        </div>
    )
}
