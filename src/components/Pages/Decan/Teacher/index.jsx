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
import { TeacherAdd, TeacherAllAdd } from '../../../../services/teacher'
import { useForm } from 'react-hook-form'
import Loader from '../../../UL/loader'
import ExalInput from '../../../UL/input/exal'


export default function TeacherPage({ data }) {
    const [personId, setPersonId] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)
    const oneStuednt = Student.find(e => e.id === personId)
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState("teacher")
    const router = useNavigate()
    const [exalError, setExalError] = useState(false)
    const [personId1, setPersonId1] = useState()
    const [avatar, setAvatar] = useState()

    const [exal, setexal] = useState()

    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]



    const { register, handleSubmit, reset, clearErrors, setError, watch, formState: { errors } } = useForm();
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
        setLoading(true)

        if (exal) {
            const formData = new FormData()
            formData.append("excel", exal)
            formData.append("role", role)
            await TeacherAllAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        setLoading(false)
                    }
                    if (res.status == 201) {
                        toast('Em created')
                        setOpenMadal(false)
                        reset()
                        setLoading(false)
                    }
                    setexal(null)
                })
                .catch(err => {
                    setLoading(false)
                    setExalError(true)
                })
        } else {
            await TeacherAdd({ role: role, ...data })
                .then(res => {
                    if (res?.data?.message) {
                        toast(res?.data?.message)

                    } else if (res.status == 201) {
                        toast('recrutiar created')
                        setOpenMadal(false)
                    }
                    setLoading(false)
                    queryClient.invalidateQueries(['recruiters', params.get('search')])

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

    const UpdatetudentFunc = async (data) => {
        console.log("update")
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
                <BlueButtun light={true} onClick={() => {
                    setOpenMadal(true)
                    router('?updete=false')
                    reset()

                }}>
                    <PlusIcon />
                    Add  Employee
                </BlueButtun>
            </div>
            <TopList text={["Employee", "Employee ID", "Specialisation", "Phone", "E-mail", "Actions"]} />
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
                            router('?updete=true')
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

                        toast("employees deleted")
                        setPersonId(false)

                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {
                openMadal && query == "true" &&
                <AddMadal
                    role={"Update employees"}
                    style={{ maxWidth: "775px" }}
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
                            onChange={() => clearErrors("firstName")}
                            alert={errors.firstName?.message}
                            value={watchedFiles?.firstName || ''}
                        />
                        <AddInput
                            register={{ ...register('lastName', { required: true }) }}
                            type={"text"}
                            label={"Lastname"}
                            placeholder={"Lastname"}
                            onChange={() => clearErrors("lastName")}
                            alert={errors.lastName?.message}
                            value={watchedFiles?.lastName || ''}
                        />
                        <AddInput
                            register={{ ...register('loginId', { required: true }) }}
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            onChange={() => clearErrors("loginId")}
                            alert={errors.loginId?.message}
                            value={watchedFiles?.loginId || ''}
                            geterat={true}
                            loginGenerate={(e) => setValue("loginId", e)}
                        />
                        <AddInput
                            register={{ ...register('Bolim', { required: true }) }}
                            type={"select"}
                            label={"Bo’lim"}
                            placeholder={"Bo’lim"}
                            value={watchedFiles?.Bolim || ''}
                        />

                        <AddInput
                            register={{ ...register('specialisation', { required: true }) }}
                            type={"select"}
                            label={"Specialisation"}
                            placeholder={"Specialisation"}
                            value={watchedFiles?.specialisation || ''}
                        />
                        <AddInput
                            register={{ ...register('Lavozimi', { required: true }) }}
                            type={"select"}
                            label={"Lavozimi"}
                            placeholder={"Lavozimir"}
                            value={watchedFiles?.Lavozimi || ''}
                        />
                        <AddInput
                            register={{ ...register('email', { required: true }) }}
                            type={"text"}
                            label={"E-mail"}
                            placeholder={"E-mail"}
                            value={watchedFiles?.email || ''}
                        />


                    </div>
                </AddMadal>
            }

            {
                openMadal && query == "false" &&
                <AddMadal
                    role={"Add employees"}
                    OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => setOpenMadal(false)}>

                    <div className={cls.TeacherPage__checkBox}>
                        <label>
                            <input name='role'
                                type={"radio"}
                                value={"teacher"}
                                checked={role == "teacher" ? true : false}

                                onChange={(e) => setRole(e.target.value)}
                            />
                            <p>  Teacher</p>
                        </label>
                        <label>
                            <input
                                name='role'
                                type={"radio"}
                                value={"staff"}
                                checked={role == "shaff" ? true : false}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <p>Employee</p>
                        </label>
                    </div>
                    <div className={cls.TeacherPage__addInputs}>

                        <AddInput
                            register={!exal && { ...register('loginId', { required: "IDは必要です！" }) }}
                            type={"text"}
                            label={"ID"}
                            placeholder={"ID"}
                            style={{ marginBottom: "20px" }}
                            onChange={() => clearErrors("loginId")}
                            alert={errors.loginId?.message}
                            value={watchedFiles?.loginId || ''}
                            disabled={exal ? true : false}
                        />

                        <AddInput
                            register={!exal && { ...register('email', { required: "電子メールは必要です！" }) }}
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            style={{ marginBottom: "20px" }}
                            onChange={() => clearErrors("loginId")}
                            alert={errors.email?.message}
                            value={watchedFiles?.email || ''}
                            disabled={exal ? true : false}
                        />
                    </div>

                    <ExalInput setResolv={setexal} exalError={exalError} resolv={exal} onChange={() => {
                        reset()
                        setExalError(false)
                    }} />
                </AddMadal>
            }
            <Toaster />
            {loading && <Loader onClick={() => setLoading(false)} />}
        </div>
    )
}
