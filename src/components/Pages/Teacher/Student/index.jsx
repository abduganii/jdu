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
import { useGetWindowWidth } from '../../../../hooks/useGetWindowWith'


const StudentTeachPage = React.forwardRef(({ data, role }, ref) => {
    const widthwindow = useGetWindowWidth()
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
                <Filter decan={true} page={"student"} >
                    <BlueButtun light={true} onClick={() => {

                        setOpenMadal(true)
                        setexal(null)
                    }}>
                        日本語能力試験を追加
                    </BlueButtun>
                </Filter>

            </div>

            <div className={cls.StudentPage__page}>
                <div className={cls.StudentPage__page__div}>
                    <TopList teacher={true} text={["学生", widthwindow > 600 ? "学生ID" : null, widthwindow > 600 ? "グループ" : null, widthwindow > 1200 ? "JLPT" : null, widthwindow > 1200 ? "JDU日本語認定" : null, null]} />

                    {data && data?.map(e => (
                        <PersonList
                            onClick={() => router(`/${role}/students/${e?.id}`)}
                            id={e?.loginId}
                            key={e?.id}
                            name={`${e?.firstName} ${e?.lastName}`}
                            img={e?.avatar}
                            gruop={widthwindow > 600 ? e?.group?.name || "-" : null}
                            rate={widthwindow > 1200 ? e?.jlpt || "-" : null}
                            skill={widthwindow > 1200 ? e?.jdu || "-" : null}
                            student={true}
                        />
                    ))}


                    <div ref={ref} style={{ padding: "10px" }}></div>
                </div>
                <GruopList
                    setGrupIdIm={setGrupIdIm}
                />
            </div>

            {openMadal &&
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