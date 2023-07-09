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
import { StudentsAdd, Studentsdelete } from '../../../../services/student'
import { useForm } from 'react-hook-form'
import Loader from '../../../UL/loader'


export default function StudentPage({ data, onChange }) {

    const router = useNavigate()
    const [personId, setPersonId] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()

    const oneStuednt = data.find(e => e.id === personId) || ""

    const { register, handleSubmit, reset, setValue, clearErrors, setError, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const AddStudentFunc = async (data) => {
        setLoading(true)
        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("loginId", data?.loginId)
        formData.append("groupNumber", data?.groupNumber)
        formData.append("courseNumber", data?.courseNumber)
        formData.append("email", data?.email)

        await StudentsAdd(formData)
            .then(res => {
                if (res?.data?.message) {
                    // toast(res?.data?.message)
                    setLoading(false)
                }
                if (res.status == 201) {
                    toast('Student created')
                    setOpenMadal(false)
                    onChange()
                    reset()
                    setLoading(false)
                }
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

    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setValue('avatar', e.target.files[0])
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div className={cls.StudentPage}>
            <div className={cls.StudentPage__filter}>
                <Filter page={"student"} />
                <BlueButtun onClick={() => setOpenMadal(true)}>
                    <PlusIcon />
                    学生を追加
                </BlueButtun>
            </div>
            <TopList text={["学生", "ID", "グループ", "レート", "スキル", "作用"]} />

            {data && data?.map(e => (
                <PersonList
                    onClick={() => router(`/decan/students/${e?.id}`)}
                    id={e?.loginId}
                    key={e?.id}
                    name={`${e?.firstName} ${e?.lastName}`}
                    img={e?.avatar}
                    gruop={e?.groupNumber}
                    skill={e?.itQualification?.skills}
                    rate={e?.universityPercentage?.AllMarks}
                    update={() => router(`/decan/studentsSet/${e?.id}`)}
                    remove={() => setPersonId(e?.id)}
                    student={true}
                />
            ))}{
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={`${oneStuednt?.firstName} ${oneStuednt?.lastName}`}
                    avater={oneStuednt?.avatar}
                    role={'student'}
                    progress={oneStuednt?.universityPercentage?.AllMarks}
                    years={`${oneStuednt?.courseNumber} years`}
                    remove={async () => {
                        setLoading(true)

                        await Studentsdelete(oneStuednt?.id)
                            .then(data => {
                                if (data) {
                                    toast("Student deleted")
                                }
                                setPersonId(false)
                                onChange()
                                setLoading(false)

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
            {openMadal &&
                <AddMadal
                    role={"学生を追加"}
                    OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => {
                        setOpenMadal(false)
                        reset()
                    }}>
                    <AvatarInput
                        onChange={(e) => hendleimg(e)}
                        url={avatar || watchedFiles?.avatar}
                        style={{ marginBottom: '43px' }}
                    />
                    <div className={cls.StudentPage__addInputs}>
                        <AddInput
                            register={{ ...register('firstName', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"名前"}
                            placeholder={"名前"}
                            alert={errors.firstName?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}
                        />
                        <AddInput
                            register={{ ...register('lastName', { required: "名字は必要です！" }) }}
                            type={"text"}
                            label={"名字"}
                            placeholder={"名字"}
                            alert={errors.lastName?.message}
                            onChange={() => clearErrors("lastName")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('loginId', { required: "IDは必要です！" }) }}
                            type={"text"}
                            label={"ID"}
                            placeholder={"ID"}
                            alert={errors.loginId?.message}
                            onChange={() => clearErrors("loginId")}
                            style={{ marginBottom: "20px" }}


                        />

                        <AddInput
                            register={{ ...register('groupNumber', { required: "グループ番号は必要です！" }) }}
                            type={"text"}
                            label={"グループ番号"}
                            placeholder={"グループ番号"}
                            alert={errors.groupNumber?.message}
                            onChange={() => clearErrors("groupNumber")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('courseNumber', { required: "グループ番号は必要です！" }) }}
                            type={"text"}
                            label={"グループ番号"}
                            placeholder={"グループ番号"}
                            alert={errors.courseNumber?.message}
                            onChange={() => clearErrors("courseNumber")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('email', { required: "電子メールは必要です！" }) }}
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}
                        />
                    </div>
                </AddMadal>}
            <Toaster />

            {loading && <Loader />}
        </div>
    )
}
