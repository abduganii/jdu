
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

    const { register, handleSubmit, setValue, watch } = useForm();
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
                .then((data) => console.log(data))
                .catch(err => console.log(err))
        }
        if (data?.role == 'recruitor') {
            await RecruitorUpdate(formData, data?.id)
                .then((data) => console.log(data))
                .catch(err => console.log(err))
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
                    <p className={cls.SettingsPage__logout2__text}>
                        Do you want to leave without save changes?
                    </p>
                    <div>
                        <CancelBtn onClick={() => router(-1)}>
                            Yes
                        </CancelBtn>
                        <BlueButtun onClick={() => x.current.classList.remove("displayBlock")} style={{ paddingLeft: "30px" }}  >No</BlueButtun>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(addData)}>
                <Container className={cls.SettingsPage__container}>
                    <div className={cls.SettingsPage__top} >
                        <div className={cls.SettingsPage__top__Info}>
                            <div onClick={() => x.current.classList.add("displayBlock")}>
                                <LeftIcon />
                                <p className={cls.SettingsPage__top__role}>Student</p>
                            </div>

                            <h3 className={cls.SettingsPage__top__fName}>{watchedFiles?.firstName} {watchedFiles?.lastName}</h3>
                        </div>
                        <div className={cls.SettingsPage__top__div}>
                            <CancelBtn onClick={() => router(-1)}>
                                Cancel
                            </CancelBtn>
                            <BlueButtun type='submit'>Save changes</BlueButtun>
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
                            <div className={cls.SettingsPage__inputs__div}>
                                <SettingsInput
                                    label={"First name"}
                                    placeholder={"Full name"}
                                    type={"text"}
                                    register={{ ...register("firstName") }}
                                    value={watchedFiles?.firstName || ''}
                                />
                                <SettingsInput
                                    label={"Last name"}
                                    placeholder={"Last name"}
                                    type={"text"}
                                    register={{ ...register("lastName") }}
                                    value={watchedFiles?.lastName || ''}
                                />
                            </div>
                            {data?.role == "recruitor" && <div className={cls.SettingsPage__inputs__div}>
                                <SettingsInput
                                    label={"Company"}
                                    placeholder={"Company"}
                                    type={"text"}
                                    register={{ ...register("companyName") }}
                                    value={watchedFiles?.companyName || ''}
                                />
                                <SettingsInput
                                    label={"Phone Number"}
                                    placeholder={"998 "}
                                    type={"text"}
                                    register={{ ...register("phoneNumber") }}
                                    value={watchedFiles?.phoneNumber || ''}
                                />
                            </div>
                            }
                            <div className={cls.SettingsPage__inputs__div}>
                                <SettingsInput
                                    label={"E-mail"}
                                    placeholder={"E-mail"}
                                    type={"email"}
                                    register={{ ...register("email") }}
                                    value={watchedFiles?.email || ''}
                                />
                                {data?.role == "decan" && <SettingsInput
                                    label={"LoginId"}
                                    placeholder={"LoginId"}
                                    type={"text"}
                                    register={{ ...register("loginId") }}
                                    value={watchedFiles?.loginId || ''}
                                />}
                                {data?.role == "recruitor" && <SettingsInput
                                    label={"Specialisation"}
                                    placeholder={"Specialisation"}
                                    type={"text"}
                                    register={{ ...register("specialisation") }}
                                    value={watchedFiles?.specialisation || ''}
                                />}
                            </div>


                        </div>
                    </div>



                    <p className={cls.SettingsPage__passsword}>password</p>
                    <div className={cls.SettingsPage__passsword__wrap}>
                        <SettingsInput
                            style={{ maxWidth: "205px" }}
                            label={"Current Password"}
                            placeholder={"Current Password"}
                            type={curPass}
                            icon={eyeOpenIcons()}
                            icon2={eyeCloseIcons()}
                            eyeOpen={eyeicons}
                            eyeClick={(e) => {
                                setcurPass(state => state == "password" ? "text" : "password")
                                setEyeicons(!eyeicons)

                            }}

                            register={{ ...register("currentPassword") }}
                        />
                        <div className={cls.SettingsPage__passsword__div}>
                            <SettingsInput
                                style={{ maxWidth: "205px" }}
                                label={"New password"}
                                placeholder={"New password"}
                                type={newPass}
                                icon={eyeOpenIcons()}
                                icon2={eyeCloseIcons()}
                                eyeOpen={eyeicons1}
                                eyeClick={(e) => {
                                    setnewPass(state => state == "password" ? "text" : "password")
                                    setEyeicons1(!eyeicons1)
                                }}
                                register={{ ...register("password") }}
                            />
                            <SettingsInput
                                style={{ maxWidth: "205px" }}
                                label={"Confirm Password"}
                                placeholder={"Confirm Password"}
                                icon={eyeOpenIcons()}
                                icon2={eyeCloseIcons()}
                                eyeOpen={eyeicons2}
                                eyeClick={(e) => {
                                    setconPass(state => state == "password" ? "text" : "password")
                                    setEyeicons2(!eyeicons2)
                                }}
                                type={conPass}
                                register={{ ...register("confirmPassword") }}
                            />

                        </div>
                    </div>
                </Container>
            </form>
        </>
    )
}










