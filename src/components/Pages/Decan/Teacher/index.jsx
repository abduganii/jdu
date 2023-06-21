import BlueButtun from '../../../UL/buttun/blueBtn'

import Filter from '../../../UL/filter'
import { PlusIcon } from '../../../UL/icons'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import PersonList from '../../../UL/list/personList'
import TopList from '../../../UL/list/TopList'
import AddMadal from '../../../UL/madals/AddMadal'
import DeleteMadel from '../../../UL/madals/deleteModel'


import React, { useState } from 'react'
import { Student } from './data'
import cls from "./Teacher.module.scss"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'


export default function TeacherPage() {
    const [personId, setPersonId] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)
    const oneStuednt = Student.find(e => e.id === personId)
    const router = useNavigate()

    return (
        <div className={cls.TeacherPage}>
            <div className={cls.TeacherPage__filter}>
                <Filter />
                <BlueButtun onClick={() => setOpenMadal(true)}>
                    <PlusIcon />
                    Add Teacher
                </BlueButtun>
            </div>
            <TopList text={["Teacher", "Teacher ID", "Group", "Number", "E-mail", "Actions"]} />
            {Student && Student?.map(e => (
                <PersonList
                    onClick={() => router(`/decan/teachers/${e?.id}`)}
                    key={e?.id}
                    img={e?.avater}
                    id={e?.id}
                    name={e?.name}
                    gruop={"gruop"}
                    phone={"999999999999"}
                    email={"email"}
                    update={() => {
                        setOpenMadal(true)
                        setPersonId(false)
                    }}
                    remove={() => setPersonId(e?.id)}
                />
            ))}
            {
                personId && <DeleteMadel
                    id={oneStuednt?.id}
                    name={oneStuednt?.name}
                    avater={oneStuednt?.avater}
                    role={'teacher'}
                    progress={oneStuednt?.progress}
                    years={"2years"}
                    remove={() => {
                        toast("Teacher deleted")
                        setPersonId(false)
                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {openMadal &&
                <AddMadal
                    role={"teacher"}
                    OnSubmit={() => {
                        setOpenMadal(false)
                        toast("Teacher created")
                    }}
                    closeMadal={() => setOpenMadal(false)}>
                    <AvatarInput onChange={(e) => console.log(e)} style={{ marginBottom: '43px' }} />
                    <div className={cls.TeacherPage__addInputs}>
                        <AddInput type={"text"} label={"Firstname"} placeholder={"Firstname"} />
                        <AddInput type={"text"} label={"Lastname"} placeholder={"Lastname"} />
                        <AddInput type={"text"} label={"Fathernamae"} placeholder={"Fathernamae"} />
                        <AddInput type={"text"} label={"Specialisation"} placeholder={"Specialisation"} />
                        <AddInput type={"text"} label={"Science"} placeholder={"Science"} />
                        <AddInput type={"text"} label={"Universitetr"} placeholder={"Universitet"} />
                        <AddInput type={"textarea"} label={"Bio"} placeholder={"Bio"} />
                    </div>
                </AddMadal>}
            <Toaster />
        </div>
    )
}
