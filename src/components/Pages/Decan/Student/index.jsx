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


export default function StudentPage({ data, Specialisation, onChange }) {
    const router = useNavigate()
    const [personId, setPersonId] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)
    const [avatar, setAvatar] = useState()
    const [specialisation, setSpecialisation] = useState()

    const oneStuednt = data.find(e => e.id === personId)

    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const watchedFiles = watch()
    const AddStudentFunc = async (data) => {
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
                        toast(res?.data?.message)
                    } else if (res.status == 201) {
                        toast('recrutiar created')
                        setOpenMadal(false)
                        onChange()
                        reset()
                    }
                })
                .catch(err => toast(err.response.data.message))
        } else {
            toast('specialisation shuold not be empty')
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
                <Filter />
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
                        await Studentsdelete(oneStuednt?.id)
                            .then(data => {
                                toast("Student deleted")
                                setPersonId(false)
                                onChange()
                            })
                            .catch(err => toast(err))
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
                            register={{ ...register('firstName', { required: true }) }}
                            type={"text"}
                            label={"Firstname"}
                            placeholder={"Firstname"}
                        />
                        <AddInput
                            register={{ ...register('lastName', { required: true }) }}
                            type={"text"}
                            label={"Lastname"}
                            placeholder={"Lastname"}
                        />
                        <AddInput
                            register={{ ...register('loginId', { required: true }) }}
                            type={"text"}
                            label={"ID"}
                            placeholder={"ID"}
                        />
                        <AddInput
                            type={"select"}
                            label={"Specialisation"}
                            placeholder={"Specialisation"}
                            Specialisation={Specialisation}
                            onChange={(e) => setSpecialisation(e)}
                        />
                        <AddInput
                            register={{ ...register('groupNumber', { required: true }) }}
                            type={"text"}
                            label={"Group"}
                            placeholder={"Group"}
                        />
                        <AddInput
                            register={{ ...register('courseNumber', { required: true }) }}
                            type={"text"}
                            label={"Course number"}
                            placeholder={"Course number"}
                        />
                        <AddInput
                            register={{ ...register('email', { required: true }) }}
                            type={"text"}
                            label={"E-mail"}
                            placeholder={"E-mail"}
                        />
                        <AddInput
                            register={{ ...register('password', { required: true }) }}
                            type={"text"}
                            label={"Password"}
                            placeholder={"Password"}
                        />
                    </div>
                </AddMadal>}
            <Toaster />
        </div>
    )
}
