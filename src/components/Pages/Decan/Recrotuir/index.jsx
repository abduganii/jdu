import Filter from '../../../UL/filter'
import BlueButtun from '../../../UL/buttun/blueBtn'
import { PlusIcon } from '../../../UL/icons'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import PersonList from '../../../UL/list/personList'
import TopList from '../../../UL/list/TopList'
import AddMadal from '../../../UL/madals/AddMadal'
import DeleteMadel from '../../../UL/madals/deleteModel'


import React, { useState } from 'react'
import { Student } from './data'
import cls from "./Recruitor.module.scss"
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RecruitorAdd, Recruitordelete } from '../../../../services/recruter'

export default function RecruitorPage({ data }) {

    const [personId, setPersonId] = useState(false)
    const oneStuednt = data.find(e => e.id === personId)
    const router = useNavigate()
    const [openMadal, setOpenMadal] = useState(false)

    const { register, handleSubmit, reset, setValue } = useForm();
    console.log(oneStuednt)
    const AddStudentFunc = async (data) => {
        console.log(data);
        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("companyName", data?.companyName)
        formData.append("specialisation", data?.specialisation)
        formData.append("phoneNumber", data?.phoneNumber)
        formData.append("email", data?.email)
        formData.append("loginId", data?.loginId)
        formData.append("password", data?.password)
        formData.append("bio", data?.bio)

        await RecruitorAdd(formData)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 201) {
                    toast('recrutiar created')
                    setOpenMadal(false)
                }
            })
            .catch(err => toast(err.response.data.message))
    }
    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setValue('avatar', e.target.files[0])
        }
    }
    return (
        <div className={cls.TeacherPage}>
            <div className={cls.TeacherPage__filter}>
                <Filter />
                <BlueButtun onClick={() => setOpenMadal(true)}>
                    <PlusIcon />
                    Add Recruitor
                </BlueButtun>
            </div>
            <TopList text={["Recruitor", "Recruitor ID", "Group", "Number", "E-mail", "Actions"]} />
            {data && data?.map(e => (
                <PersonList
                    onClick={() => router(`/decan/recruitors/${e?.id}`)}
                    key={e?.id}
                    img={'/Image/Ellipse08.png'}
                    id={e?.loginId}
                    name={e?.firstName}
                    gruop={e?.companyName}
                    phone={e?.phoneNumber}
                    email={e?.email}
                    remove={() => setPersonId(e?.id)}
                    update={() => {
                        setOpenMadal(true)
                        setPersonId(false)
                    }}
                />
            ))}
            {
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={`${oneStuednt?.firstName} ${oneStuednt?.lastName}`}
                    avater={oneStuednt?.avatar}
                    role={'recruitor'}
                    progress={oneStuednt?.progress}
                    years={"2years"}
                    remove={() => {
                        Recruitordelete(oneStuednt?.id)
                        toast("Recruitor deleted")
                        setPersonId(false)
                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {openMadal &&
                <AddMadal
                    role={"recruitors"}
                    OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => {
                        setOpenMadal(false)
                        reset()
                    }}>
                    <AvatarInput onChange={(e) => hendleimg(e)} style={{ marginBottom: '43px' }} />
                    <div className={cls.TeacherPage__addInputs}>
                        <AddInput
                            register={{ ...register('firstName') }}
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
                            register={{ ...register('companyName', { required: true }) }}
                            type={"text"}
                            label={"Company name"}
                            placeholder={"Company name"}
                        />
                        <AddInput
                            register={{ ...register('specialisation', { required: true }) }}
                            type={"text"}
                            label={"Specialisation"}
                            placeholder={"Specialisation"}
                        />
                        <AddInput
                            register={{ ...register('phoneNumber', { required: true }) }}
                            type={"text"}
                            label={"Phone number"}
                            placeholder={"Phone number"}
                        />
                        <AddInput
                            register={{ ...register('email', { required: true }) }}
                            type={"text"}
                            label={"E-mail"}
                            placeholder={"E-mail"}
                        />
                        <AddInput
                            register={{ ...register('loginId', { required: true }) }}
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                        />
                        <AddInput
                            register={{ ...register('password', { required: true }) }}
                            type={"text"}
                            label={"Password"}
                            placeholder={"Password"}
                        />
                        <AddInput
                            register={{ ...register('bio', { required: true }) }}
                            type={"textarea"}
                            label={"Bio"}
                            placeholder={"Bio"}
                        />

                    </div>
                </AddMadal>
            }
            <Toaster />
        </div >
    )
}