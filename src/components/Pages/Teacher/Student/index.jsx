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
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StudentsAdd, Studentsdelete } from '../../../../services/student'
import { useForm } from 'react-hook-form'
import Loader from '../../../UL/loader'
import { useQueryClient } from 'react-query'
import ExalInput from '../../../UL/input/exal'


const StudentTeachPage = React.forwardRef(({ data, role }, ref) => {
    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    const router = useNavigate()
    const [personId, setPersonId] = useState(false)
    const [exal, setexal] = useState()
    const [openMadal, setOpenMadal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [Sunject, setSunject] = useState("JLPT & JDU")

    // const oneStuednt = data.find(e => e.id === personId) || ""




    return (
        <div className={cls.StudentPage}>
            <div className={cls.StudentPage__filter}>
                <Filter page={"student"} />
                {
                    role == "teacher" && <BlueButtun light={true} onClick={() => setOpenMadal(true)}>
                        Mark for semester
                    </BlueButtun>
                }
            </div>
            <TopList text={["学生", "ID", "グループ", "レート", "スキル", "アクション"]} />

            {data?.students && data?.students?.map(e => (
                <PersonList
                    onClick={() => router(`/${role}/students/${e?.id}`)}
                    id={e?.loginId}
                    key={e?.id}
                    name={`${e?.firstName} ${e?.lastName}`}
                    img={e?.avatar}
                    gruop={data?.name}
                    // skill={e?.itQualification?.skills}
                    rate={e?.universityPercentage?.AllMarks || "0"}
                    remove={() => setPersonId(e?.id)}
                    student={true}
                />
            ))}
            <div ref={ref} style={{ padding: "10px" }}></div>

            {openMadal && role == "teacher" &&
                <AddMadal
                    role={"学生を追加"}
                    // OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => {
                        setOpenMadal(false)
                    }}>

                    <div className={cls.StudentPage__checkBox}>
                        <label>
                            <input
                                name='role'
                                type={"radio"}
                                value={"JLPT & JDU"}
                                checked={Sunject == "JLPT & JDU" ? true : false}
                                onChange={(e) => setSunject(e.target.value)}
                            />
                            <p>  JLPT & JDU</p>
                        </label>
                        <label>
                            <input
                                name='role'
                                type={"radio"}
                                value={"Credits"}
                                checked={Sunject == "Credits" ? true : false}
                                onChange={(e) => setSunject(e.target.value)}
                            />
                            <p>Credits</p>
                        </label>
                    </div>

                    {
                        Sunject == "Credits" ? <div className={cls.StudentPage__addInputs}>
                            <AddInput
                                // register={{ ...register('specialisation', { required: true }) }}
                                type={"select"}
                                label={"Semester"}
                                placeholder={"Semester"}
                                style={{ marginBottom: "20px" }}
                                disabled={exal ? true : false}

                            />
                            <AddInput
                                // register={{ ...register('specialisation', { required: true }) }}
                                type={"select"}
                                label={"Science"}
                                placeholder={"Science"}
                                style={{ marginBottom: "20px" }}

                                disabled={exal ? true : false}
                            />
                        </div> : ""
                    }

                    <ExalInput
                        setResolv={setexal}
                        resolv={exal}
                    // onChange={() => reset()} 
                    />
                </AddMadal>}
            <Toaster />

            {loading && <Loader onClick={() => setLoading(false)} />}
        </div>
    )
})
export default StudentTeachPage;