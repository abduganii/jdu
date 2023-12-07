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
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../../../UL/loader'
import { useQueryClient } from 'react-query'
import ExalInput from '../../../UL/input/exal'
import { ParentAdd, Parentdelete, ParentUpdate, ParentGetById, ParentAllAdd } from '../../../../services/parent'
import { StudentsGetByloginId } from '../../../../services/student'

const PerantPage = React.forwardRef(({ data }, ref) => {

    const queryClient = useQueryClient()
    const [params] = useSearchParams()

    const [personId, setPersonId] = useState(false)
    const [personId1, setPersonId1] = useState()
    const [avatar, setAvatar] = useState()
    const [studentName, setStudentName] = useState()
    const [loading, setLoading] = useState(false)
    const [exal, setexal] = useState()
    const oneStuednt = data.find(e => e.id === personId)
    const router = useNavigate()
    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]
    const [exalError, setExalError] = useState(false)
    const [openMadal, setOpenMadal] = useState(false)

    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const fitchOnePerson = (id) => {
        const fetchData = async () => {
            const res = await ParentGetById(id);
            setValue("avatar", res?.avatar)
            setValue("firstName", res?.firstName)
            setValue("lastName", res?.lastName)
            setValue("phoneNumber", res?.phoneNumber)
            setValue("loginId", res?.loginId)
            setValue("studentId", res?.Students?.[0]?.loginId)
            setValue("email", res?.email)

        }
        fetchData()
            .then((err) => {
            })
    }

    const getlogin = (id) => {
        setValue("studentId", id)
        if (!id?.length) {
            setStudentName(false)
        }
        const fetchData = async () => {
            const res = await StudentsGetByloginId(id);
            if (res) {
                setStudentName(`${res?.firstName} ${res.lastName}`)
            } else {
                setStudentName("student not found")
            }
        }

        fetchData()
            .then((err) => {
            })
    }

    const AddStudentFunc = async (data) => {

        if (exal) {
            setLoading(true)
            const formData = new FormData()
            formData.append("excel", exal)
            await ParentAllAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        setLoading(false)
                    }
                    if (res.status == 201) {
                        toast('Parents created')
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
            setLoading(true)
            await ParentAdd(data)
                .then(res => {
                    if (res?.data?.message) {
                        toast(res?.data?.message)

                    } else if (res.status == 201) {
                        toast('parent created')
                        setOpenMadal(false)

                    }

                    setLoading(false)
                    queryClient.invalidateQueries(['parent', params.get('search')])

                })
                .catch(err => {
                    if (err.response.data.message.includes('loginId') || err.response.data.message.includes('Login')) {
                        setError('loginId', { type: 'custom', message: err.response.data.message })
                        setLoading(false)
                    }
                    if (err.response.data.message.includes('StudentId')) {
                        setError('studentId', { type: 'custom', message: err.response.data.message })
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

    }

    const UpdateStudentFunc = async (data) => {

        setLoading(true)

        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("phoneNumber", data?.phoneNumber)
        formData.append("loginId", data?.loginId)
        formData.append("studentId", data?.studentId)
        formData.append("email", data?.email)
        formData.append("bio", data?.bio)


        await ParentUpdate(formData, personId1)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('parent updated')
                    setOpenMadal(false)

                    setAvatar(null)
                }
                setLoading(false)
                queryClient.invalidateQueries(['parent', params.get('search')])

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
                <Filter page={'recruiter'} />
                <BlueButtun light={true} onClick={() => {
                    setOpenMadal(true)
                    router('?updete=false')
                    reset()
                }
                }>
                    <PlusIcon />
                    リクレーターを追加
                </BlueButtun>
            </div>
            <div className={cls.TeacherPage__div}>
                <TopList text={["Parents fullname", "Parent ID", "Student", "Phone", "Email", "アクション"]} />
                {data && data?.map(e => (
                    <PersonList
                        onClick={() => router(`/decan/parents/${e?.id}`)}
                        key={e?.id}
                        img={e?.avatar}
                        id={e?.loginId}
                        name={`${e?.firstName} ${e?.lastName}`}
                        gruop={e?.Students?.[0].firstName}
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
                <div ref={ref} style={{ padding: "10px" }}></div>
            </div>
            {
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={`${"?.firstName"} ${"oneStuednt?.lastName"}`}
                    avater={oneStuednt?.avatar}
                    role={'Parent'}
                    progress={oneStuednt?.progress}
                    years={oneStuednt?.companyName}
                    remove={async () => {
                        setLoading(true)
                        await Parentdelete(oneStuednt?.id)
                            .then(data => {
                                if (data) {
                                    toast("リクレーターが削除されました")
                                    setLoading(false)
                                }
                                setPersonId(false)
                                setLoading(false)
                                queryClient.invalidateQueries(['parents', params.get('search')])

                            }).catch(err => {
                                toast(err)
                                setLoading(false)

                            })

                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {openMadal && query == 'true' &&
                <AddMadal
                    role={`${query == 'true' ? "採用担当者を更新" : "採用担当者の追加"} `}
                    OnSubmit={handleSubmit(UpdateStudentFunc)}
                    style={{ maxWidth: "775px" }}
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
                            register={{ ...register('phoneNumber', { required: "電話番号は必要です！" }) }}
                            type={"text"}
                            label={"電話番号"}
                            placeholder={"電話番号"}
                            value={watchedFiles?.phoneNumber || ''}
                            alert={errors.phoneNumber?.message}
                            onChange={() => clearErrors("phoneNumber")}
                            style={{ marginBottom: "20px" }}
                        />

                        <AddInput
                            register={{ ...register('loginId', { required: "IDは必要です！" }) }}
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
                            register={{ ...register('studentId', { required: "IDは必要です！" }) }}
                            type={"text"}
                            label={"Student ID"}
                            placeholder={"Id"}
                            value={watchedFiles?.studentId || ''}
                            geterat={true}
                            loginGenerate={(e) => setValue("studentId", e)}
                            alert={errors.studentId?.message}
                            onChange={() => { clearErrors("studentId") }}
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
                    </div>
                </AddMadal>
            }
            {openMadal && query == 'false' &&
                <AddMadal
                    role={`${query == 'true' ? "採用担当者を更新" : "採用担当者の追加"} `}
                    OnSubmit={handleSubmit(AddStudentFunc)}
                    closeMadal={() => {
                        setOpenMadal(false)
                        setAvatar(null)
                        reset()
                    }}> <div className={cls.TeacherPage__addInputs}>

                        <AddInput
                            register={{ ...register('loginId') }}
                            type={"text"}
                            label={"ID"}
                            placeholder={"ID"}
                            geterat={true}
                            loginGenerate={(e) => setValue("loginId", e)}
                            alert={errors.loginId?.message}
                            onChange={() => clearErrors("loginId")}
                            style={{ marginBottom: "20px" }}
                            disabled={exal ? true : false}
                        />

                        <AddInput
                            register={{ ...register('email') }}
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}
                            disabled={exal ? true : false}
                        />
                    </div>
                    <div className={cls.TeacherPage__addInputs} style={{ alignItems: "center" }}>
                        <AddInput
                            type={"text"}
                            label={"Student ID"}
                            placeholder={"Student ID"}
                            onChange={(e) => {
                                getlogin(e.target.value)
                            }}
                            style={{ marginBottom: "20px" }}
                            disabled={exal ? true : false}
                        />

                        {studentName ? <p> {studentName}</p> : ""}
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
                </AddMadal>
            }
            <Toaster />

            {loading && <Loader onClick={() => setLoading(false)} />}
        </div >
    )
})

export default PerantPage;