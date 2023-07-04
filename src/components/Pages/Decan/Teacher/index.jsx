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
import { useLocation, useNavigate } from 'react-router-dom'
import { TeacherAdd } from '../../../../services/teacher'
import { useForm } from 'react-hook-form'


export default function TeacherPage({ data, onChange }) {
    const [personId, setPersonId] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)
    const oneStuednt = Student.find(e => e.id === personId)
    const router = useNavigate()

    const [personId1, setPersonId1] = useState()
    const [avatar, setAvatar] = useState()


    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]



    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const watchedFiles = watch()
    // const fitchOnePerson = (id) => {
    //     const fetchData = async () => {
    //         const res = await RecruitorGetById(id);

    //         setValue("avatar", res?.avatar)
    //         setValue("firstName", res?.firstName)
    //         setValue("lastName", res?.lastName)
    //         setValue("companyName", res?.companyName)
    //         setValue("specialisation", res?.specialisation)
    //         setValue("phoneNumber", res?.phoneNumber)
    //         setValue("email", res?.email)
    //         setValue("loginId", res?.loginId)
    //         setValue("password", res?.password)
    //         setValue("bio", res?.bio)
    //     }
    //     fetchData()
    //         .then((err) => {
    //             console.log(err);
    //         })
    // }

    const AddStudentFunc = async (data) => {
        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("fatherName", data?.fatherName)
        formData.append("specialisation", data?.specialisation)
        formData.append("university", data?.university)
        formData.append("phoneNumber", data?.phoneNumber)
        formData.append("email", data?.email)
        formData.append("loginId", data?.loginId)
        if (data?.password) formData.append("password", data?.password)
        formData.append("bio", data?.bio)

        if (query == "true") {
            // await RecruitorUpdate(formData, personId1)
            //     .then(res => {
            //         if (res?.data?.message) {
            //             toast(res?.data?.message)
            //         } else if (res.status == 203) {
            //             toast('recrutiar updated')
            //             setOpenMadal(false)
            //             onChange()
            //             setAvatar(null)
            //         }
            //     })
            //     .catch(err => toast(err.response.data.message))
        } else {
            await TeacherAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        toast(res?.data?.message)
                    } else if (res.status == 201) {
                        toast('teacher created')
                        setOpenMadal(false)
                        onChange()
                    }
                })
                .catch(err => toast(err.response.data.message))
        }
    }


    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setValue('avatar', e.target.files[0])
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }


    return (
        <div className={cls.TeacherPage}>
            <div className={cls.TeacherPage__filter}>
                <Filter />
                <BlueButtun onClick={() => {
                    setOpenMadal(true)
                    reset()
                }}>
                    <PlusIcon />
                    Add Teacher
                </BlueButtun>
            </div>
            <TopList text={["Teacher", "Teacher ID", "Father Name", "Number", "E-mail", "Actions"]} />
            {data &&
                data?.map(e => (
                    <PersonList
                        onClick={() => router(`/decan/recruitors/${e?.id}`)}
                        key={e?.id}
                        img={e?.avatar}
                        id={e?.loginId}
                        name={e?.firstName}
                        gruop={e?.fatherName}
                        phone={e?.phoneNumber}
                        email={e?.email}
                        remove={() => setPersonId(e?.id)}
                        update={() => {
                            // router('?updete=true')
                            setOpenMadal(true)
                            setPersonId(false)
                        }}
                    />
                ))

            }
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
            {
                openMadal &&
                <AddMadal
                    role={"teacher"}
                    OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => setOpenMadal(false)}>
                    <AvatarInput
                        onChange={(e) => hendleimg(e)}
                        url={avatar || watchedFiles?.avatar}
                        style={{ marginBottom: '43px' }}
                    />
                    <div className={cls.TeacherPage__addInputs}>
                        <AddInput
                            register={{ ...register('firstName') }}
                            type={"text"}
                            label={"Firstname"}
                            placeholder={"Firstname"}
                            value={watchedFiles?.firstName || ''}
                        />
                        <AddInput
                            register={{ ...register('lastName', { required: true }) }}
                            type={"text"}
                            label={"Lastname"}
                            placeholder={"Lastname"}
                            value={watchedFiles?.lastName || ''}
                        />
                        <AddInput
                            register={{ ...register('fatherName', { required: true }) }}
                            type={"text"}
                            label={"Father name"}
                            placeholder={"Father name"}
                            value={watchedFiles?.fatherName || ''}
                        />
                        <AddInput
                            register={{ ...register('specialisation', { required: true }) }}
                            type={"text"}
                            label={"Specialisation"}
                            placeholder={"Specialisation"}
                            value={watchedFiles?.specialisation || ''}
                        />
                        <AddInput
                            register={{ ...register('university', { required: true }) }}
                            type={"text"}
                            label={"University"}
                            placeholder={"University"}
                            value={watchedFiles?.university || ''}
                        />
                        <AddInput
                            register={{ ...register('phoneNumber', { required: true }) }}
                            type={"text"}
                            label={"Phone number"}
                            placeholder={"Phone number"}
                            value={watchedFiles?.phoneNumber || ''}

                        />
                        <AddInput
                            register={{ ...register('email', { required: true }) }}
                            type={"text"}
                            label={"E-mail"}
                            placeholder={"E-mail"}
                            value={watchedFiles?.email || ''}

                        />
                        <AddInput
                            register={{ ...register('loginId', { required: true }) }}
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            value={watchedFiles?.loginId || ''}
                            geterat={true}
                            loginGenerate={(e) => setValue("loginId", e)}
                        />
                        <AddInput
                            register={{ ...register('password') }}
                            type={"text"}
                            label={"Password"}
                            placeholder={"Password"}
                            value={watchedFiles?.password || ''}
                            geterat={true}
                            passwordGenerate={(e) => setValue("password", e)}
                        />
                        {/* <AddInput
                            register={{ ...register('bio', { required: true }) }}
                            type={"textarea"}
                            label={"Bio"}
                            placeholder={"Bio"}
                            value={watchedFiles?.bio || ''}
                        /> */}
                    </div>
                </AddMadal>
            }
            <Toaster />
        </div>
    )
}
