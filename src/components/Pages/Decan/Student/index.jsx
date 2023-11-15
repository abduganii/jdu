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
import { StudentsAdd, StudentsAllAdd, Studentsdelete } from '../../../../services/student'
import { useForm } from 'react-hook-form'
import Loader from '../../../UL/loader'
import { useQueryClient } from 'react-query'
import ExalInput from '../../../UL/input/exal'

const StudentPage = React.forwardRef(({ data }, ref) => {
    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    const router = useNavigate()
    const [personId, setPersonId] = useState(false)
    const [exal, setexal] = useState()
    const [openMadal, setOpenMadal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [exalError, setExalError] = useState(false)
    const oneStuednt = data?.students?.find(e => e.id === personId) || ""

    const { register, handleSubmit, reset, clearErrors, setError, watch, formState: { errors } } = useForm();

    const AddStudentFunc = async (e) => {
        setLoading(true)
        if (exal) {
            const formData = new FormData()
            formData.append("groupId", data?.id)
            formData.append("excel", exal)
            await StudentsAllAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        setLoading(false)
                    }
                    if (res.status == 201) {
                        toast('Students created')
                        setOpenMadal(false)
                        reset()
                        setLoading(false)
                    }
                    setexal(null)
                })
                .catch(err => {
                    setExalError(true)
                    setLoading(false)
                })
        } else {
            const formData = new FormData()
            formData.append("loginId", e?.loginId)
            formData.append("email", e?.email)
            formData.append("groupId", data?.id)

            await StudentsAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        setLoading(false)
                    }
                    if (res.status == 201) {
                        toast('Student created')
                        setOpenMadal(false)
                        reset()
                        setLoading(false)
                    }
                    queryClient.invalidateQueries(['student', params.get('Group'), params.get('rate'), params.get('year'), params.get('search')])
                })
                .catch(err => {
                    if (err.response.data.message.includes('loginId') || err.response.data.message.includes('Login')) {
                        setError('loginId', { type: 'custom', message: "IDまたはパスワードが間違っています" })
                        setLoading(false)
                    }
                    if (err.response.data.message == "Validation isEmail on email failed") {
                        setError('email', { type: 'custom', message: "メールが存在しないか、スペルが間違っています" })
                        setLoading(false)
                    } if (err.response.data.message === "email must be unique") {
                        setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                    }
                    if (err.response.data.message === "Validation len on password failed") {
                        setError('password', { type: 'custom', message: " パスワードの最小の長さは 8 文字である必要があります" })
                    }
                    if (err.response.data.message.includes("type integer")) {
                        setError('courseNumber', { type: 'custom', message: "コース番号は数値でなければなりません" })
                    }
                    setLoading(false)
                })
        }
    }


    return (
        <div className={cls.StudentPage}>
            <div className={cls.StudentPage__filter}>
                <Filter page={"student"} back={true} />
                <BlueButtun light={true} onClick={() => setOpenMadal(true)}>
                    <PlusIcon />
                    学生を追加
                </BlueButtun>
            </div>
            <TopList text={["学生", "ID", "グループ", "レート", "", "アクション"]} />

            {data?.students && data?.students?.map(e => (
                <PersonList
                    onClick={() => router(`/decan/students/${e?.id}`)}
                    id={e?.loginId}
                    key={e?.id}
                    name={`${e?.firstName} ${e?.lastName}`}
                    img={e?.avatar}
                    gruop={data?.name}
                    // skill={e?.itQualification?.skills}
                    rate={e?.universityPercentage?.AllMarks || "0"}
                    update={() => router(`/decan/studentsSet/${e?.id}`)}
                    remove={() => setPersonId(e?.id)}
                    student={true}
                />
            ))}
            <div ref={ref} style={{ padding: "10px" }}></div>
            {
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={`${oneStuednt?.firstName} ${oneStuednt?.lastName}`}
                    avater={oneStuednt?.avatar}
                    role={'student'}
                    progress={oneStuednt?.universityPercentage?.AllMarks}
                    years={`${oneStuednt?.courseNumber}年生 `}
                    remove={async () => {
                        setLoading(true)

                        await Studentsdelete(oneStuednt?.id)
                            .then(data => {
                                if (data) {
                                    toast("学生が削除されました")
                                    setLoading(false)
                                }
                                setPersonId(false)
                                setLoading(false)
                                queryClient.invalidateQueries(['student', params.get('Group'), params.get('rate'), params.get('year'), params.get('search')])
                            })
                            .catch(err => {
                                toast(err)
                                setLoading(false)

                            })
                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {
                openMadal &&
                <AddMadal
                    role={"学生を追加"}
                    OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => {
                        setOpenMadal(false)
                        reset()
                    }}>

                    <div className={cls.StudentPage__addInputs}>

                        <AddInput
                            register={!exal && { ...register('loginId', { required: "IDは必要です！" }) }}
                            type={"text"}
                            label={"ID"}
                            placeholder={"ID"}
                            alert={errors.loginId?.message}
                            onChange={() => clearErrors("loginId")}
                            style={{ marginBottom: "20px" }}
                            disabled={exal ? true : false}
                        />

                        <AddInput
                            register={!exal && { ...register('email', { required: "電子メールは必要です！" }) }}
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}
                            disabled={exal ? true : false}
                        />
                    </div>

                    <ExalInput
                        setResolv={setexal}
                        resolv={exal}
                        exalError={exalError}
                        onChange={(e) => {
                            reset()
                            setExalError(false)
                        }}
                    />
                </AddMadal>}
            <Toaster />

            {loading && <Loader onClick={() => setLoading(false)} />}

        </div>
    )
})
export default StudentPage;