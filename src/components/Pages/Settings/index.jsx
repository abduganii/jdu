
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
import { DecanUpdate } from '../../../services/decan'
import { RecruitorUpdate } from '../../../services/recruter'

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
        setValue("phoneNumber", data?.phoneNumber)
        setValue("specialisation", data?.specialisation)
    }, [data])

    const addData = async (body) => {
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
        if (body.confirmPassword) formData.append("confirmPassword", body?.confirmPassword)

        if (data?.role == 'decan') {
            await DecanUpdate(formData)
                .then((data) => router('/decan/home'))
                .catch(err => {
                    if (err.response.data.message.includes('current')) {
                        setError('currentPassword', { type: 'custom', message: err.response.data.message })
                    }
                    if (err.response.data.message === "email must be unique") {
                        setError('email', { type: 'custom', message: err.response.data.message })
                    }
                    if (err.response.data.message === "loginId must be unique") {
                        setError('loginId', { type: 'custom', message: err.response.data.message })
                    }
                    if (err.response.data.message === "Validation len on password failed") {
                        setError('password', { type: 'custom', message: " Password's min length must be 8" })
                    }
                    if (err.response.data.message.includes('confirm')) {
                        setError('confirmPassword', { type: 'custom', message: err.response.data.message })
                    }
                })
        }
        if (data?.role == 'recruitor') {
            await RecruitorUpdate(formData, data?.id)
                .then((data) => router('/recruitor/home'))
                .catch(err => {
                    if (err.response.data.message.includes('current')) {
                        setError('currentPassword', { type: 'custom', message: err.response.data.message })
                    }
                    if (err.response.data.message === "email must be unique") {
                        setError('email', { type: 'custom', message: err.response.data.message })
                    }
                    if (err.response.data.message === "Validation len on password failed") {
                        setError('password', { type: 'custom', message: " Password's min length must be 8" })
                    }
                    if (err.response.data.message.includes('confirm')) {
                        setError('confirmPassword', { type: 'custom', message: err.response.data.message })
                    }
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
                            <div onClick={() => x.current.classList.add("displayBlock")}>
                                <LeftIcon />
                                <p className={cls.SettingsPage__top__role}>戻る</p>
                            </div>

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
                        <label className={cls.SettingsPage__upload} >
                            {
                                avatar ? <img
                                    src={avatar || watchedFiles?.avatar}
                                    width={150}
                                    height={150}
                                    alt="img"

                                /> : <Avatar name={data?.firstName} size="150" round={true} />
                            }

                            <input
                                className={cls.SettingsPage__upload__file}
                                type="file"
                                onChange={(e) => hendleimg(e)}
                            />
                            <div className={cls.SettingsPage__upload__icon}>  <UploadIcons /> </div>
                        </label>
                        <div className={cls.SettingsPage__inputs}>

                            <SettingsInput
                                className={cls.SettingsPage__inputs__wrap}
                                label={"ファーストネーム"}
                                placeholder={"ファーストネーム"}
                                type={"text"}
                                register={{ ...register("firstName", { required: "firstName is required" }) }}
                                value={watchedFiles?.firstName || ''}
                                alert={errors.firstName?.message}
                                onChange={() => clearErrors("firstName")}
                            />
                            <SettingsInput
                                className={cls.SettingsPage__inputs__wrap}

                                label={"苗字"}
                                placeholder={"苗字"}
                                type={"text"}
                                register={{ ...register("lastName", { required: "firstName is required" }) }}
                                value={watchedFiles?.lastName || ''}
                                alert={errors.lastName?.message}
                                onChange={() => clearErrors("lastName")}
                            />
                            {data?.role == "decan" && <br />}
                            {data?.role == "recruitor" && <>
                                <SettingsInput
                                    className={cls.SettingsPage__inputs__wrap}

                                    label={"会社"}
                                    placeholder={"会社"}
                                    type={"text"}
                                    register={{ ...register("companyName", { required: "firstName is required" }) }}
                                    value={watchedFiles?.companyName || ''}
                                    alert={errors.companyName?.message}
                                    onChange={() => clearErrors("companyName")}
                                />
                                <SettingsInput
                                    className={cls.SettingsPage__inputs__wrap}

                                    label={"電話番号"}
                                    placeholder={"998"}
                                    type={"text"}
                                    register={{ ...register("phoneNumber", { required: "firstName is required" }) }}
                                    value={watchedFiles?.phoneNumber || ''}
                                    alert={errors.phoneNumber?.message}
                                    onChange={() => clearErrors("phoneNumber")}
                                />
                            </>
                            }

                            <SettingsInput
                                className={cls.SettingsPage__inputs__wrap}

                                label={"Eメール"}
                                placeholder={"Eメール"}
                                type={"email"}
                                register={{ ...register("email", { required: "firstName is required" }) }}
                                value={watchedFiles?.email || ''}
                                alert={errors.email?.message}
                                onChange={() => clearErrors("email")}
                            />
                            {data?.role == "decan" && <SettingsInput
                                className={cls.SettingsPage__inputs__wrap}

                                label={"ログインID"}
                                placeholder={"ログインID"}
                                type={"text"}
                                register={{ ...register("loginId", { required: "firstName is required" }) }}
                                value={watchedFiles?.loginId || ''}
                                alert={errors.loginId?.message}
                                onChange={() => clearErrors("loginId")}
                            />}
                            {data?.role == "recruitor" && <SettingsInput
                                className={cls.SettingsPage__inputs__wrap}

                                label={"専門分野"}
                                placeholder={"専門分野"}
                                type={"text"}
                                register={{ ...register("specialisation", { required: "firstName is required" }) }}
                                value={watchedFiles?.specialisation || ''}
                                alert={errors.specialisation?.message}
                                onChange={() => clearErrors("specialisation")}
                            />}



                        </div>
                    </div>



                    <p className={cls.SettingsPage__passsword}>password</p>
                    <div className={cls.SettingsPage__passsword__wrap}>
                        <SettingsInput
                            style={{ maxWidth: "205px" }}
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
                        <div className={cls.SettingsPage__passsword__div}>
                            <SettingsInput
                                style={{ maxWidth: "205px" }}
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
                                style={{ maxWidth: "205px" }}
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
                    </div>
                </Container>
            </form>
        </>
    )
}
