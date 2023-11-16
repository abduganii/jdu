
import BlueButtun from '../../UL/buttun/blueBtn'
import CancelBtn from '../../UL/buttun/cancel'
import Container from '../../UL/container'
import { eyeOpenIcons, eyeCloseIcons, UploadIcons, LeftIcon } from '../../UL/icons'
import SettingsInput from '../../UL/input/settingsInput'
import BackBtn2 from '../../UL/buttun/backBtns'

import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import cls from "./Settings.module.scss"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Avatar from 'react-avatar'
import { CanactGet, CanactUpdate, DecanUpdate } from '../../../services/decan'
import { RecruitorUpdate } from '../../../services/recruter'
import Loader from '../../UL/loader'
import { StudentsUpdate } from '../../../services/student'
import { SectionGet, TeacherUpdate } from '../../../services/teacher'
import { ParentUpdate } from '../../../services/parent'

const lavozim = [
    {
        id: "bolim boshlig'i",
        name: "bolim boshlig'i",
    },
    {
        id: "leader",
        name: "leader",
    },
    {
        id: "masul hodim",
        name: "masul hodim",
    }

]

export default function SettingsPage({ data }) {
    const x = useRef()
    const y = useRef()
    const router = useNavigate()
    const [curPass, setcurPass] = useState('password')
    const [eyeicons, setEyeicons] = useState(true)
    const [eyeicons1, setEyeicons1] = useState(true)
    const [eyeicons2, setEyeicons2] = useState(true)
    const [newPass, setnewPass] = useState('password')
    const [conPass, setconPass] = useState('password')
    const [avatar, setAvatar] = useState(data?.avatar)
    const [cantactId, setCantactId] = useState(data?.avatar)
    const [loader, setLoager] = useState(false)
    const [section, setSection] = useState()
    const [section1, setSection1] = useState()
    const [section2, setSection2] = useState()
    const [section3, setSection3] = useState()
    const [section4, setSection4] = useState()
    const { register, handleSubmit, setValue, clearErrors, setError, watch, formState: { errors } } = useForm();

    const watchedFiles = watch()
    useEffect(() => {
        setAvatar(data?.avatar)
        setValue("avatar", data?.avatar)
        setValue("firstName", data?.firstName)
        setValue("lastName", data?.lastName)
        setValue("email", data?.email)
        setValue("loginId", data?.loginId)
        setValue("companyName", data?.companyName)
        setValue("brithday", data?.brithday)
        setValue("phoneNumber", data?.phoneNumber)
        setValue("specialisation", data?.specialisation)
        setSection1(data?.section)
        setSection3(data?.specialisation)
        setSection4(data?.position)




        const fetchData = async () => {
            const data = await SectionGet()
            setSection(data)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })

        if (data?.role == "decan") {
            const fetchData = async () => {
                const res = await CanactGet();
                setValue("phoneNumber", res[0]?.phoneNumber)
                setValue("emailInfo", res[0]?.emailInfo)
                setValue("startTime", res[0]?.startTime)
                setValue("endTime", res[0]?.endTime)
                setValue("location", res[0]?.location)
                setCantactId(res[0]?.id)
            }
            fetchData()
                .then((err) => {
                    console.log(err);
                })
        }

    }, [data])

    const addData = async (body) => {
        setLoager(true)
        const formData = new FormData()
        if (body.avatar) formData.append("avatar", body.avatar)
        if (body.firstName) formData.append("firstName", body?.firstName)
        if (body.lastName) formData.append("lastName", body?.lastName)
        if (body.companyName) formData.append("companyName", body?.companyName)
        if (body.phoneNumber) formData.append("phoneNumber", body?.phoneNumber)
        if (body.email) formData.append("email", body?.email)
        if (body.loginId) formData.append("loginId", body?.loginId)
        if (body.specialisation) formData.append("specialisation", body?.specialisation)
        if (body.password) formData.append("password", body?.password)
        if (body.currentPassword) formData.append("currentPassword", body?.currentPassword)
        if (body.brithday) formData.append("brithday", body?.brithday)

        if (body.startTime) formData.append("startTime", body?.startTime)
        if (body.endTime) formData.append("endTime", body?.endTime)
        if (body.location) formData.append("location", body?.location)
        if (body.emailInfo) formData.append("emailInfo", body?.emailInfo)
        if ((!body.password.length && !body.currentPassword.length && !body.confirmPassword.length) || (body.password.length && body.currentPassword.length && body.confirmPassword.length)) {
            if (data?.role == 'decan') {
                await DecanUpdate(formData)
                    .then((data) => {
                        CanactUpdate(formData, cantactId)
                            .then((data) => {
                                router('/decan/home')
                                setLoager(false)
                            })
                            .catch(err => {
                                setLoager(false)
                            })
                    })
                    .catch(err => {
                        if (err.response.data.message.includes('current')) {
                            setError('currentPassword', { type: 'custom', message: "現在のパスワードは正しくありません" })
                        }
                        if (err.response.data.message === "email must be unique") {
                            setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                        }
                        if (err.response.data.message === "loginId must be unique") {
                            setError('loginId', { type: 'custom', message: "ログイン ID は一意である必要があります" })
                        }
                        if (err.response.data.message === "Validation len on password failed") {
                            setError('password', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
                        }
                        if (err.response.data.message.includes('confirm')) {
                            setError('confirmPassword', { type: 'custom', message: "パスワードをもう一度確認してください" })
                        }
                        setLoager(false)
                    })
            }
            if (data?.role == 'teacher' || data?.role == "staff") {
                await TeacherUpdate(formData, data?.id)
                    .then((data) => {
                        router(`/${data?.role}/home`)
                        setLoager(false)
                    })
                    .catch(err => {
                        if (err.response.data.message.includes('current')) {
                            setError('currentPassword', { type: 'custom', message: "現在のパスワードは正しくありません" })
                        }
                        if (err.response.data.message === "email must be unique") {
                            setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                        }
                        if (err.response.data.message === "loginId must be unique") {
                            setError('loginId', { type: 'custom', message: "ログイン ID は一意である必要があります" })
                        }
                        if (err.response.data.message === "Validation len on password failed") {
                            setError('password', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
                        }
                        if (err.response.data.message.includes('confirm')) {
                            setError('confirmPassword', { type: 'custom', message: "パスワードをもう一度確認してください" })
                        }
                        setLoager(false)
                    })
            }
            if (data?.role == 'recruitor') {
                await RecruitorUpdate(formData, data?.id)
                    .then((data) => {
                        router('/recruitor/home')
                        setLoager(false)
                    })
                    .catch(err => {
                        if (err.response.data.message.includes('current')) {
                            setError('currentPassword', { type: 'custom', message: "現在のパスワードは正しくありません" })
                        }
                        if (err.response.data.message === "email must be unique") {
                            setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                        }
                        if (err.response.data.message === "Validation len on password failed") {
                            setError('password', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
                        }
                        if (err.response.data.message.includes('confirm')) {
                            setError('confirmPassword', { type: 'custom', message: "パスワードが正しくないことを確認する" })
                        }
                        setLoager(false)
                    })

            }
            if (data?.role == 'student') {
                await StudentsUpdate(formData, data?.id)
                    .then((data) => {
                        router('/student/home')
                        setLoager(false)
                    })
                    .catch(err => {
                        if (err.response.data.message.includes('current')) {
                            setError('currentPassword', { type: 'custom', message: "現在のパスワードは正しくありません" })
                        }
                        if (err.response.data.message === "email must be unique") {
                            setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                        }
                        if (err.response.data.message === "Validation len on password failed") {
                            setError('password', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
                        }
                        if (err.response.data.message.includes('confirm')) {
                            setError('confirmPassword', { type: 'custom', message: "パスワードが正しくないことを確認する" })
                        }
                        setLoager(false)
                    })

            }
            if (data?.role == 'parent') {
                await ParentUpdate(formData, data?.id)
                    .then((data) => {
                        router('/student/home')
                        setLoager(false)
                    })
                    .catch(err => {
                        if (err.response.data.message.includes('current')) {
                            setError('currentPassword', { type: 'custom', message: "現在のパスワードは正しくありません" })
                        }
                        if (err.response.data.message === "email must be unique") {
                            setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                        }
                        if (err.response.data.message === "Validation len on password failed") {
                            setError('password', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
                        }
                        if (err.response.data.message.includes('confirm')) {
                            setError('confirmPassword', { type: 'custom', message: "パスワードが正しくないことを確認する" })
                        }
                        setLoager(false)
                    })

            }
        } else {
            setLoager(false)
            if (!body.currentPassword.length) setError('currentPassword', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
            if (!body.password.length) setError('password', { type: 'custom', message: "パスワードを入力してください" })
            if (!body.currentPassword.length) setError('currentPassword', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })


        }
    }

    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setValue('avatar', e.target.files[0])
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }


    return (
        <>

            <div className={cls.SettingsPage__logout2__wrap} ref={x} onClick={(e) => {
                if (e.target == x.current) {
                    x.current.classList.remove("displayBlock")
                }

            }}>
                <div className={cls.SettingsPage__logout2} ref={y}>
                    <p className={cls.SettingsPage__logout2__text}>変更を保存せずに終了しますか?
                    </p>
                    <div>
                        <CancelBtn onClick={() => router(-1)}>
                            はい
                        </CancelBtn>
                        <BlueButtun onClick={() => x.current.classList.remove("displayBlock")} style={{ paddingLeft: "30px" }}  >
                            いいえ</BlueButtun>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(addData)}>
                <Container className={cls.SettingsPage__container}>
                    <div className={cls.SettingsPage__top} >
                        <div className={cls.SettingsPage__top__Info}>
                            <h3 className={cls.SettingsPage__top__fName}>{watchedFiles?.firstName} {watchedFiles?.lastName}</h3>
                        </div>
                        <div className={cls.SettingsPage__top__div}>
                            <CancelBtn onClick={() => router(-1)}>
                                キャンセル
                            </CancelBtn>
                            <BlueButtun type='submit'>変更内容を保存</BlueButtun>
                        </div>
                    </div>
                    <div className={cls.SettingsPage__form}>
                        <div className={cls.SettingsPage__upload} >
                            {
                                avatar ? <img
                                    src={avatar || watchedFiles?.avatar}
                                    width={150}
                                    height={150}
                                    alt="img"

                                /> : <Avatar name={data?.firstName} size="150" round={true} />
                            }


                            <label className={cls.SettingsPage__upload__icon}>
                                <input
                                    className={cls.SettingsPage__upload__file}
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => hendleimg(e)}
                                />
                                <UploadIcons />
                            </label>
                        </div>
                        <div className={cls.SettingsPage__inputs}>

                            <SettingsInput
                                className={cls.SettingsPage__inputs__wrap}
                                label={"名前"}
                                placeholder={"名前"}
                                type={"text"}
                                register={{ ...register("firstName", { required: "名前は必要です！" }) }}
                                alert={errors.firstName?.message}
                                onChange={() => clearErrors("firstName")}
                            />
                            <SettingsInput
                                className={cls.SettingsPage__inputs__wrap}

                                label={"名字"}
                                placeholder={"名字"}
                                type={"text"}
                                register={{ ...register("lastName", { required: " 名字は必要です！" }) }}
                                alert={errors.lastName?.message}
                                onChange={() => clearErrors("lastName")}
                            />

                            {data?.role == "recruitor" && <>
                                <SettingsInput
                                    className={cls.SettingsPage__inputs__wrap}

                                    label={"会社名"}
                                    placeholder={"会社名"}
                                    type={"text"}
                                    register={{ ...register("companyName", { required: "会社名は必要です！" }) }}
                                    alert={errors.companyName?.message}
                                    onChange={() => clearErrors("companyName")}
                                />
                                <SettingsInput
                                    className={cls.SettingsPage__inputs__wrap}
                                    label={"電話番号"}
                                    placeholder={"998"}
                                    type={"text"}
                                    register={{ ...register("phoneNumber", { required: "電話番号は必要です！" }) }}
                                    alert={errors.phoneNumber?.message}
                                    onChange={() => clearErrors("phoneNumber")}
                                />
                            </>
                            }

                            {data?.role == "teacher" &&
                                <>
                                    <SettingsInput
                                        className={cls.SettingsPage__inputs__wrap}
                                        type={"select"}
                                        label={"Bo’lim"}

                                        placeholder={"Bo’lim"}
                                        value={section1}

                                        Specialisation={section}
                                        onChange={(e) => {
                                            const data = section.find(el => el?.id == e)
                                            setSection1(data?.name)
                                            setSection2(data?.specialisations)
                                        }}

                                    />
                                    <SettingsInput
                                        className={cls.SettingsPage__inputs__wrap}
                                        type={"select"}
                                        label={"Specialisation"}
                                        placeholder={"Specialisation"}
                                        value={section3}
                                        Specialisation={section2}

                                        onChange={(e) => {
                                            const data = section2.find(el => el?.id == e)
                                            setSection3(data?.name)
                                        }}
                                    />

                                    <SettingsInput
                                        className={cls.SettingsPage__inputs__wrap}
                                        type={"select"}
                                        label={"Lavozimi"}
                                        placeholder={"Lavozimir"}
                                        value={section4}

                                        Specialisation={lavozim}
                                        onChange={(e) => setSection4(e)}
                                    />
                                </>
                            }
                            {data?.role == "staff" &&
                                <>
                                    <SettingsInput
                                        className={cls.SettingsPage__inputs__wrap}
                                        type={"select"}
                                        label={"Bo’lim"}

                                        placeholder={"Bo’lim"}
                                        value={section1}

                                        Specialisation={section}
                                        onChange={(e) => {
                                            const data = section.find(el => el?.id == e)
                                            setSection1(data?.name)
                                            setSection2(data?.specialisations)
                                        }}

                                    />
                                    <SettingsInput
                                        className={cls.SettingsPage__inputs__wrap}
                                        type={"select"}
                                        label={"Lavozimi"}
                                        placeholder={"Lavozimir"}
                                        value={section4}

                                        Specialisation={lavozim}
                                        onChange={(e) => setSection4(e)}
                                    />
                                </>
                            }

                            {data?.role == "student" &&
                                <SettingsInput
                                    className={cls.SettingsPage__inputs__wrap}
                                    type={"date"}
                                    label={"brithday"}
                                    placeholder={"brithday"}
                                    register={{ ...register("brithday", { required: "電話番号は必要です！" }) }}

                                    alert={errors.brithday?.message}
                                    onChange={() => clearErrors("brithday")}
                                />
                            }
                            {data?.role == "parent" &&
                                <SettingsInput
                                    className={cls.SettingsPage__inputs__wrap}
                                    type={"text"}
                                    label={"phoneNumber"}
                                    placeholder={"phoneNumber"}
                                    register={{ ...register("phoneNumber", { required: "電話番号は必要です！" }) }}
                                    alert={errors.phoneNumber?.message}
                                    onChange={() => clearErrors("phoneNumber")}
                                />
                            }
                            <SettingsInput
                                className={cls.SettingsPage__inputs__wrap}
                                label={"メール"}
                                placeholder={"メール"}
                                type={"email"}
                                register={{ ...register("email", { required: "メールは必要です！" }) }}
                                alert={errors.email?.message}
                                onChange={() => clearErrors("email")}
                                disabled={true}
                            />
                            <SettingsInput
                                className={cls.SettingsPage__inputs__wrap}
                                disabled={true}
                                label={"ログインID"}
                                placeholder={"ログインID"}
                                type={"text"}
                                register={{ ...register("loginId", { required: "ログインIDは必要です!" }) }}
                                alert={errors.loginId?.message}
                                onChange={() => clearErrors("loginId")}
                            />

                        </div>
                    </div>
                    <p className={cls.SettingsPage__passsword}>パスワード</p>
                    <div className={cls.SettingsPage__passsword__wrap2}>
                        <SettingsInput
                            label={"現在のパスワード"}
                            placeholder={"現在のパスワード"}
                            type={curPass}
                            icon={eyeOpenIcons()}
                            icon2={eyeCloseIcons()}
                            eyeOpen={eyeicons}
                            eyeClick={(e) => {
                                setcurPass(state => state == "password" ? "text" : "password")
                                setEyeicons(!eyeicons)
                            }}
                            register={{ ...register("currentPassword") }}
                            alert={errors.currentPassword?.message}
                            onChange={() => clearErrors("currentPassword")}
                        />
                        <SettingsInput
                            label={"新しいパスワード"}
                            placeholder={"新しいパスワード"}
                            type={newPass}
                            icon={eyeOpenIcons()}
                            icon2={eyeCloseIcons()}
                            eyeOpen={eyeicons1}
                            eyeClick={(e) => {
                                setnewPass(state => state == "password" ? "text" : "password")
                                setEyeicons1(!eyeicons1)
                            }}
                            register={{ ...register("password") }}
                            alert={errors.password?.message}
                            onChange={() => clearErrors("password")}
                        />
                        <SettingsInput
                            label={"パスワードを認証する"}
                            placeholder={"パスワードを認証する"}
                            icon={eyeOpenIcons()}
                            icon2={eyeCloseIcons()}
                            eyeOpen={eyeicons2}
                            eyeClick={(e) => {
                                setconPass(state => state == "password" ? "text" : "password")
                                setEyeicons2(!eyeicons2)
                            }}
                            type={conPass}
                            register={{ ...register("confirmPassword") }}
                            alert={errors.confirmPassword?.message}
                            onChange={() => clearErrors("confirmPassword")}
                        />


                    </div>

                    {data?.role == 'decan' &&
                        <>
                            <p className={cls.SettingsPage__passsword}>JDU CONTACTS</p>
                            <div className={cls.SettingsPage__passsword__wrap}>

                                <div className={cls.SettingsPage__passsword__div}>
                                    <SettingsInput

                                        label={"email"}
                                        placeholder={"email"}
                                        type={"email"}
                                        register={{ ...register("emailInfo") }}
                                    />
                                    <SettingsInput

                                        label={"Phone number"}
                                        placeholder={"number"}
                                        type={"text"}
                                        register={{ ...register("phoneNumber") }}
                                    />
                                    <SettingsInput
                                        className={cls.SettingsPage__passsword__time}
                                        style={{ maxWidth: "105px" }}
                                        label={"start time"}
                                        type={"time"}
                                        register={{ ...register("startTime") }}
                                    />
                                    <SettingsInput
                                        className={cls.SettingsPage__passsword__time}
                                        style={{ maxWidth: "105px" }}
                                        label={"time to finish"}
                                        type={"time"}
                                        register={{ ...register("endTime") }}
                                    />
                                </div>
                                <SettingsInput
                                    style={{ maxWidth: "100%" }}
                                    label={"Location"}
                                    placeholder={"Location"}
                                    type={"Location"}
                                    register={{ ...register("location") }}
                                />
                            </div>

                        </>
                    }
                </Container>
            </form>
            {
                loader ? <Loader onClick={() => setLoager(false)} /> : ""
            }
        </>
    )
}
