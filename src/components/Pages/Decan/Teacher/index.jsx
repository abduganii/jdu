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
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { TeacherAdd, TeacherAllAdd, Teacherdelete, TeacherGetById, TeacherUpdate } from '../../../../services/teacher'
import { useForm } from 'react-hook-form'
import Loader from '../../../UL/loader'
import ExalInput from '../../../UL/input/exal'
import { useQueryClient } from 'react-query'

const TeacherPage = React.forwardRef(({ data }, ref) => {
    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    const [personId, setPersonId] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)
    const oneStuednt = data.find(e => e.id === personId)
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState("teacher")
    const router = useNavigate()
    const [exalError, setExalError] = useState(false)
    const [personId1, setPersonId1] = useState()
    const [avatar, setAvatar] = useState()

    const [exal, setexal] = useState()

    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]


    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const fitchOnePerson = (id) => {

        const fetchData = async () => {
            const res = await TeacherGetById(id);
            setValue("avatar", res?.rows[0]?.avatar)
            setValue("firstName", res?.rows[0]?.firstName)
            setValue("lastName", res?.rows[0]?.lastName)
            setValue("companyName", res?.rows[0]?.companyName)
            setValue("specialisation", res?.rows[0]?.specialisation)
            setValue("phoneNumber", res?.rows[0]?.phoneNumber)
            setValue("email", res?.rows[0]?.email)
            setValue("loginId", res?.rows[0]?.loginId)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
    }



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
                    queryClient.invalidateQueries(['teachers', params.get('search')])

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
        setLoading(true)
        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("email", data?.email)
        formData.append("loginId", data?.loginId)
        formData.append("isActive", true)
        formData.append("phoneNumber", data?.phoneNumber)
        formData.append("bio", data?.bio)


        await TeacherUpdate(formData, personId1)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('registor seccessful')
                    setOpenMadal(false)
                    setAvatar(null)
                }
                setLoading(false)
                queryClient.invalidateQueries(['teachers', params.get('search')])

            })
            .catch(err => {
                if (err.response.data.message.includes('loginId') || err.response.data.message.includes('Login')) {
                    setError('loginId', { type: 'custom', message: err.response.data.message })
                    setLoading(false)
                }
                if (err.response.data.message == "Validation isEmail on email failed") {
                    setError('email', { type: 'custom', message: "メールが存在しないか、スペルが間違っています" })
                    setLoading(false)
                } if (err.response.data.message === "email must be unique") {
                    setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                }
                if (err.response.data.message === "Validation len on password failed") {
                    setError('password', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
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
                        onClick={() => router(`/decan/employees/${e?.id}`)}
                        key={e?.id}
                        img={e?.avatar}
                        id={e?.loginId}
                        name={e?.firstName}
                        gruop={e?.specialisation || "null"}
                        phone={e?.phoneNumber}
                        email={e?.email}
                        remove={() => setPersonId(e?.id)}
                        update={() => {
                            router('?updete=true')
                            setOpenMadal(true)
                            setPersonId(false)
                            setPersonId1(e?.id)
                            fitchOnePerson(e?.id)
                        }}
                    />
                ))

            }
            {
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={oneStuednt?.firstName}
                    avater={oneStuednt?.specialisation}
                    role={'teacher'}
                    progress={oneStuednt?.progress}
                    years={"2years"}
                    remove={async () => {
                        setLoading(true)
                        await Teacherdelete(oneStuednt?.id)
                            .then(data => {
                                if (data) {
                                    toast("emloy deleted")
                                    setLoading(false)
                                }
                                setPersonId(false)

                                setLoading(false)
                                queryClient.invalidateQueries(['teachers', params.get('search')])

                            }).catch(err => {
                                toast(err)
                                setLoading(false)

                            })


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
                    OnSubmit={handleSubmit(UpdatetudentFunc)}
                    closeMadal={() => {
                        setOpenMadal(false)
                        setAvatar(null)
                        reset()
                    }}>
                    <AvatarInput
                        onChange={(e) => hendleimg(e)}
                        url={avatar || watchedFiles?.avatar}
                        style={{ marginBottom: '43px' }}
                    />
                    <div className={cls.TeacherPage__addInputs}>
                        <AddInput
                            register={{ ...register('firstName', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"名前"}
                            placeholder={"名前"}
                            value={watchedFiles?.firstName || ''}
                            alert={errors.firstName?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('lastName', { required: "名字は必要です！" }) }}
                            type={"text"}
                            label={"名字"}
                            placeholder={"名字"}
                            value={watchedFiles?.lastName || ''}
                            alert={errors.lastName?.message}
                            onChange={() => clearErrors("lastName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            value={watchedFiles?.loginId || ''}
                            alert={errors.loginId?.message}
                            style={{ marginBottom: "20px" }}
                            onChange={() => clearErrors("loginId")}
                        />
                        <AddInput
                            type={"select"}
                            label={"Bo’lim"}
                            placeholder={"Bo’lim"}
                            style={{ marginBottom: "20px" }}

                        />

                        <AddInput
                            type={"select"}
                            label={"Specialisation"}
                            placeholder={"Specialisation"}
                            style={{ marginBottom: "20px" }}

                        />

                        <AddInput
                            type={"select"}
                            label={"Lavozimi"}
                            placeholder={"Lavozimir"}
                            style={{ marginBottom: "20px" }}

                        />

                        <AddInput
                            register={{ ...register('email', { required: "メールは必要です！" }) }}
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            value={watchedFiles?.email || ''}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}


                        />

                        <AddInput
                            register={{ ...register('phoneNumber', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"phoneNumber"}
                            placeholder={"phoneNumber"}
                            value={watchedFiles?.phoneNumber || ''}
                            alert={errors.phoneNumber?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

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
})

export default TeacherPage;