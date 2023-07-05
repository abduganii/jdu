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


export default function StudentPage({ data, Specialisation, onChange }) {
    const router = useNavigate()
    const [personId, setPersonId] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()
    const [specialisation, setSpecialisation] = useState()

    const oneStuednt = data.find(e => e.id === personId)

    const { register, handleSubmit, reset, setValue, clearErrors, setError, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const AddStudentFunc = async (data) => {
        setLoading(true)
        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("loginId", data?.loginId)
        formData.append("specialisationId", specialisation)
        formData.append("groupNumber", data?.groupNumber)
        formData.append("courseNumber", data?.courseNumber)
        formData.append("email", data?.email)
        formData.append("password", data?.password)


        if (specialisation) {
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
                        setError('loginId', { type: 'custom', message: err.response.data.message })
                        setLoading(false)
                    }
                    if (err.response.data.message == "Validation isEmail on email failed") {
                        setError('email', { type: 'custom', message: "email does not exist or was misspelled" })
                        setLoading(false)
                    } if (err.response.data.message === "email must be unique") {
                        setError('email', { type: 'custom', message: err.response.data.message })
                    }
                    if (err.response.data.message === "Validation len on password failed") {
                        setError('password', { type: 'custom', message: " Password's min length must be 8" })
                    }
                    setLoading(false)

                })
        } else {
            setError('specialisation', { type: 'custom', message: "specialisation is required" });

        }

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
                    Add Student
                </BlueButtun>
            </div>
            <TopList text={["Student", "Student ID", "Group", "Rate", "Skills", "Actions"]} />

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
            ))}


            {
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
                    role={"Add student"}
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
                            register={{ ...register('firstName', { required: "firstName is required" }) }}
                            type={"text"}
                            label={"Firstname"}
                            placeholder={"Firstname"}
                            alert={errors.firstName?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}
                        />
                        <AddInput
                            register={{ ...register('lastName', { required: "lastName is required" }) }}
                            type={"text"}
                            label={"Lastname"}
                            placeholder={"Lastname"}
                            alert={errors.lastName?.message}
                            onChange={() => clearErrors("lastName")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('loginId', { required: "loginId is required" }) }}
                            type={"text"}
                            label={"ID"}
                            placeholder={"ID"}
                            alert={errors.loginId?.message}
                            onChange={() => clearErrors("loginId")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            type={"select"}
                            label={"Specialisation"}
                            placeholder={"Specialisation"}
                            Specialisation={Specialisation}
                            onChange={(e) => {
                                setSpecialisation(e)
                            }}
                            alert={errors.specialisation?.message}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('groupNumber', { required: "groupNumber is required" }) }}
                            type={"text"}
                            label={"Group"}
                            placeholder={"Group"}
                            alert={errors.groupNumber?.message}
                            onChange={() => clearErrors("groupNumber")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('courseNumber', { required: "courseNumber is required" }) }}
                            type={"text"}
                            label={"Course number"}
                            placeholder={"Course number"}
                            alert={errors.courseNumber?.message}
                            onChange={() => clearErrors("courseNumber")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('email', { required: "email is required" }) }}
                            type={"text"}
                            label={"E-mail"}
                            placeholder={"E-mail"}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}
                        />
                        <AddInput
                            register={{ ...register('password', { required: "password is required" }) }}
                            type={"text"}
                            label={"Password"}
                            placeholder={"Password"}
                            geterat={true}
                            passwordGenerate={(e) => setValue("password", e)}
                            alert={errors.password?.message}
                            onChange={() => clearErrors("password")}
                            style={{ marginBottom: "20px" }}

                        />
                    </div>
                </AddMadal>}
            <Toaster />

            {loading && <Loader />}
        </div>
    )
}
