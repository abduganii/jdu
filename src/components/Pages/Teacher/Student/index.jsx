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
import { StudentsAdd, Studentscertificates, Studentsdelete } from '../../../../services/student'
import { useForm } from 'react-hook-form'
import Loader from '../../../UL/loader'
import { useQueryClient } from 'react-query'
import ExalInput from '../../../UL/input/exal'
import GruopList from '../../../UL/gruop'
import TopList2 from '../../../UL/list/TopList2'


const StudentTeachPage = React.forwardRef(({ data, role }, ref) => {
    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    const router = useNavigate()
    const [exal, setexal] = useState()
    const [openMadal, setOpenMadal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [Sunject, setSunject] = useState("JLPT & JDU")

    const [GrupIdIm, setGrupIdIm] = useState()


    const { register, handleSubmit, setValue, watch } = useForm();
    const AddDataSubmit = async () => {
        setLoading(true)


        const formData = new FormData()
        formData.append("excel", exal)

        await Studentscertificates(formData)
            .then(res => {
                setOpenMadal(false)
                setLoading(false)
                setexal(null)
            })
            .catch(err => {
                toast(err.response.data.message)
                setLoading(false)

            })
    }
    return (
        <div className={cls.StudentPage}>
            <div className={cls.StudentPage__filter}>
                <Filter page={"student"} />
                {
                    role == "teacher" && <BlueButtun light={true} onClick={() => {
                        setOpenMadal(true)
                        setexal(null)
                    }}>
                        Mark for semester
                    </BlueButtun>
                }
            </div>

            <div className={cls.StudentPage__page}>
                <div className={cls.StudentPage__page__div}>
                    <TopList2 text={["学生", "ID", "グループ", "レート", "スキル", "アクション"]} />

                    {data && data?.map(e => (
                        <PersonList
                            onClick={() => router(`/${role}/students/${e?.id}`)}
                            id={e?.loginId}
                            key={e?.id}
                            name={`${e?.firstName} ${e?.lastName}`}
                            img={e?.avatar}
                            gruop={e?.group?.name}
                            rate={e?.jlpt || "-"}
                            skill={e?.jdu || "-"}
                            student={true}
                        />
                    ))}

                </div>
                <GruopList
                    setGrupIdIm={setGrupIdIm}
                />
            </div>
            <div ref={ref} style={{ padding: "10px" }}></div>

            {openMadal && role == "teacher" &&
                <AddMadal
                    role={"JLPT & JDU"}
                    OnSubmit={handleSubmit(AddDataSubmit)}
                    closeMadal={() => {
                        setOpenMadal(false)
                    }}>

                    {/* <div className={cls.StudentPage__checkBox}>
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
                    </div> */}

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
                        teacher={true}

                    />
                </AddMadal>}
            <Toaster />

            {loading && <Loader onClick={() => setLoading(false)} />}
        </div>
    )
})
export default StudentTeachPage;