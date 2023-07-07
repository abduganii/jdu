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
import cls from "./Recruitor.module.scss"
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { RecruitorAdd, Recruitordelete, RecruitorGetById, RecruitorUpdate } from '../../../../services/recruter'
import Loader from '../../../UL/loader'

export default function RecruitorPage({ data, onChange }) {
    const [personId, setPersonId] = useState(false)
    const [personId1, setPersonId1] = useState()
    const [avatar, setAvatar] = useState()
    const [loading, setLoading] = useState(false)

    const oneStuednt = data.find(e => e.id === personId)
    const router = useNavigate()
    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]

    const [openMadal, setOpenMadal] = useState(false)

    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const fitchOnePerson = (id) => {
        const fetchData = async () => {

            const res = await RecruitorGetById(id);

            setValue("avatar", res?.avatar)
            setValue("firstName", res?.firstName)
            setValue("lastName", res?.lastName)
            setValue("companyName", res?.companyName)
            setValue("specialisation", res?.specialisation)
            setValue("phoneNumber", res?.phoneNumber)
            setValue("email", res?.email)
            setValue("loginId", res?.loginId)
            setValue("password", res?.password)
            setValue("bio", res?.bio)
        }
        fetchData()
            .then((err) => {
            })
    }

    const AddStudentFunc = async (data) => {
        setLoading(true)

        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("companyName", data?.companyName)
        formData.append("specialisation", data?.specialisation)
        formData.append("phoneNumber", data?.phoneNumber)
        formData.append("email", data?.email)
        formData.append("loginId", data?.loginId)
        if (data?.password) formData.append("password", data?.password)
        formData.append("bio", data?.bio)

        if (query == "true") {
            await RecruitorUpdate(formData, personId1)
                .then(res => {
                    if (res?.data?.message) {
                        toast(res?.data?.message)

                    } else if (res.status == 203) {
                        toast('recrutiar updated')
                        setOpenMadal(false)
                        onChange()
                        setAvatar(null)
                    }
                    setLoading(false)

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
        } else {
            await RecruitorAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        toast(res?.data?.message)
                    } else if (res.status == 201) {
                        toast('recrutiar created')
                        setOpenMadal(false)
                        onChange()
                    }
                    setLoading(false)

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
                        setError('password', { type: 'custom', message: " パスワードの最小の長さは 8 文字である必要があります" })
                    }
                    setLoading(false)

                })
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
                <Filter page={'recruiter'} />
                <BlueButtun onClick={() => {
                    setOpenMadal(true)
                    router('?updete=false')
                    reset()
                }
                }>
                    <PlusIcon />
                    採用担当者の追加
                </BlueButtun>
            </div>
            <TopList text={["リクルーター", "ID", "会社", "電話番号", "メール", "作用"]} />
            {data && data?.map(e => (
                <PersonList
                    onClick={() => router(`/decan/recruitors/${e?.id}`)}
                    key={e?.id}
                    img={e?.avatar}
                    id={e?.loginId}
                    name={e?.firstName}
                    gruop={e?.companyName}
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
            ))}
            {
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={`${oneStuednt?.firstName} ${oneStuednt?.lastName}`}
                    avater={oneStuednt?.avatar}
                    role={'recruitor'}
                    progress={oneStuednt?.progress}
                    years={"2years"}
                    remove={async () => {
                        await Recruitordelete(oneStuednt?.id)
                            .then(data => {
                                if (data) {
                                    toast("Recruitor deleted")
                                }
                                setPersonId(false)
                                onChange()
                                setLoading(false)
                            }).catch(err => {
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
                    role={`${query == 'true' ? "採用担当者を更新" : "採用担当者の追加"} `}
                    OnSubmit={handleSubmit(AddStudentFunc)}
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
                            register={{ ...register('firstName', { required: "名は必須です" }) }}
                            type={"text"}
                            label={"名前"}
                            placeholder={"名前"}
                            value={watchedFiles?.firstName || ''}
                            alert={errors.firstName?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('lastName', { required: "姓は必須です" }) }}
                            type={"text"}
                            label={"苗字"}
                            placeholder={"苗字"}
                            value={watchedFiles?.lastName || ''}
                            alert={errors.lastName?.message}
                            onChange={() => clearErrors("lastName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('companyName', { required: "会社名は必須です" }) }}
                            type={"text"}
                            label={"会社名"}
                            placeholder={"会社名"}
                            value={watchedFiles?.companyName || ''}
                            alert={errors.companyName?.message}
                            onChange={() => clearErrors("companyName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('specialisation', { required: "専門性が必要です" }) }}
                            type={"text"}
                            label={"専門分野"}
                            placeholder={"専門分野"}
                            value={watchedFiles?.specialisation || ''}
                            alert={errors.specialisation?.message}
                            onChange={() => clearErrors("specialisation")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('phoneNumber', { required: "電話番号は必須です" }) }}
                            type={"text"}
                            label={"電話番号"}
                            placeholder={"電話番号"}
                            value={watchedFiles?.phoneNumber || ''}
                            alert={errors.phoneNumber?.message}
                            onChange={() => clearErrors("phoneNumber")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('email', { required: "電子メールは必須です" }) }}
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            value={watchedFiles?.email || ''}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('loginId', { required: "ログインIDは必須です" }) }}
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            value={watchedFiles?.loginId || ''}
                            geterat={true}
                            loginGenerate={(e) => setValue("loginId", e)}
                            alert={errors.loginId?.message}
                            onChange={() => clearErrors("loginId")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('password') }}
                            type={"text"}
                            label={"パスワード"}
                            placeholder={"パスワード"}
                            value={watchedFiles?.password || ''}
                            geterat={true}
                            passwordGenerate={(e) => setValue("password", e)}
                            alert={errors.password?.message}
                            onChange={() => clearErrors("password")}

                            style={{ marginBottom: "20px" }}

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

            {loading && <Loader />}
        </div >
    )
}