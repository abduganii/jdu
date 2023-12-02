'use client'

import BlueButtun from '../../../UL/buttun/blueBtn'
import CancelBtn from '../../../UL/buttun/cancel'
import Container from '../../../UL/container'
import { DownloadIcons, GalaryIcons, LeftIcon, UploadIcons } from '../../../UL/icons'
import RangeInput from '../../../UL/input/rangeInput'
import SearchSkill from '../../../UL/input/SearchSkill'
import AddInput from '../../../UL/input/AddInput'

import React, { useEffect, useRef, useState } from 'react'
import cls from "./SetStudent.module.scss"
import { useNavigate } from 'react-router-dom'
import LessonTable from '../../../UL/LassonTable'
import SkillBtn from '../../../UL/buttun/skill'
import { Select } from 'antd'
import { useForm } from 'react-hook-form'
import { LessonsAdd, LessonsUpdate } from '../../../../services/Lesson'
import { FileUploadStudent, GetSkills, PhotoUploadStudent, StudentsUpdate } from '../../../../services/student'
import toast, { Toaster } from 'react-hot-toast'
import Avatar from 'react-avatar'
import Loader from '../../../UL/loader'
import CreditInput from '../../../UL/input/creditinput'
import { GetCridents } from '../../../../services/statistic'
import SertificanSkill from '../../../UL/input/sertifican/index.jsx'

export default function SetStudent({ data, role }) {
    const x = useRef()
    const y = useRef()
    const router = useNavigate()
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()

    const [avatarArr, setAvatarArr] = useState(data?.images || [])

    const { register: register2, handleSubmit: handleSubmit2, setValue: setValue2, watch: watch2 } = useForm();


    const watchedFiles2 = watch2()
    useEffect(() => {
        setValue2("firstName", data?.firstName)
        setValue2("lastName", data?.lastName)
        setValue2("loginId", data?.loginId)
        setValue2('email', data?.email)
        setValue2('brithday', data?.brithday)
        setValue2('bio', data?.bio)
        setValue2("desc", data?.desc)
        setAvatar(data?.avatar)
        setAvatarArr(data?.images)
    }, [data])


    const AddDataSubmit = async (body) => {
        setLoading(true)
        const formData = new FormData()

        if (body.avatar) formData.append("avatar", body.avatar)
        if (body.firstName) formData.append("firstName", body.firstName)
        if (body.lastName) formData.append("lastName", body.lastName)
        if (body.brithday) formData.append("brithday", body?.brithday)
        if (body.email) formData.append("email", body.email)
        if (body.password) formData.append("password", body.password)
        if (body.bio) formData.append("bio", body.bio)
        if (body.desc) formData.append("desc", body.desc)

        await StudentsUpdate(formData, data?.id)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('student updated')
                    if (role == "decan") {
                        router(`/decan/students/${data?.id}`)
                    } else if (role == "student") {
                        router('/student/me')
                    }

                }
                setLoading(false)
            })
            .catch(err => {
                toast(err.response.data.message)
                setLoading(false)

            })
    }


    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setValue2('avatar', e.target.files[0])
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }

    const hendleimg2 = async (e) => {
        if (e.target.files[0]) {
            const newUrl = URL.createObjectURL(e.target.files[0]);
            setAvatarArr(statu => [...statu, newUrl])
            const formData = new FormData()
            formData.append("image", e.target.files[0])
            await PhotoUploadStudent(formData, data?.id)
                .then(() => setLoading(false))
                .catch(() => setLoading(false))
        }
    }
    return (
        <Container className={cls.SetStudent__container} style={{ marginTop: "100px", marginLeft: "40px" }} >
            <form onSubmit={handleSubmit2(AddDataSubmit)}>
                <div className={cls.SetStudent__logout2__wrap} ref={x} onClick={(e) => {
                    if (e.target == x.current) {
                        x.current.classList.remove("displayBlock")
                    }
                }}>
                    <div className={cls.SetStudent__logout2} ref={y}>
                        <p className={cls.SetStudent__logout2__text}>
                            変更を保存せずに
                            終了しますか?
                        </p>
                        <div>
                            <CancelBtn onClick={() => router(-1)}>
                                はい
                            </CancelBtn>
                            <BlueButtun onClick={() => x.current.classList.remove("displayBlock")} style={{ paddingLeft: "30px" }} >いいえ</BlueButtun>
                        </div>
                    </div>
                </div>

                <div >
                    <div className={cls.SetStudent__top}>
                        <div className={cls.SetStudent__top__Info}>
                            <div onClick={() => x.current.classList.add("displayBlock")}>
                                <LeftIcon />
                                <p className={cls.SetStudent__top__role}>戻る</p>
                            </div>

                            <h3 className={cls.SetStudent__top__Name}>{data?.firstName} {data?.lastName}</h3>
                        </div>
                        <div className={cls.SetStudent__top__btns}>
                            <CancelBtn onClick={() => router(-1)}>
                                キャンセル
                            </CancelBtn>
                            <BlueButtun type={"submit"} style={{ padding: "14px 30px" }}>
                                更新を保存
                            </BlueButtun>
                        </div>
                    </div>
                    {
                        role == "decan" && <>

                            <div className={cls.SetStudent__inputs}>
                                <label className={cls.SetStudent__upload} >
                                    {avatar ?
                                        < img
                                            src={avatar}
                                            width={150}
                                            height={150}
                                            alt="img"

                                        /> : <Avatar name={data?.firstName} size="150" round={true} />
                                    }
                                    <input className={cls.SetStudent__upload__file} type="file" onChange={(e) => hendleimg(e)} />
                                    <div className={cls.SetStudent__upload__icon}>  <UploadIcons /> </div>
                                </label>
                                <div className={cls.SetStudent__content}>
                                    <AddInput
                                        style={{ marginTop: "10px" }}
                                        type={"text"}
                                        label={"名前"}
                                        placeholder={"名前"}
                                        register={{ ...register2('firstName') }}
                                        value={watchedFiles2?.firstName || ''}
                                    />
                                    <AddInput
                                        style={{ marginTop: "10px" }}
                                        type={"text"}
                                        label={"名字"}
                                        placeholder={"名字"}
                                        register={{ ...register2('lastName') }}
                                        value={watchedFiles2?.lastName || ''}
                                    />
                                    <AddInput
                                        style={{ marginTop: "10px" }}
                                        type={"text"}
                                        label={"ID"}
                                        placeholder={"LoginID"}
                                        register={{ ...register2('loginId') }}
                                        disabled={true}
                                        value={watchedFiles2?.loginId || ''}
                                    />

                                    <AddInput
                                        register={{ ...register2('brithday') }}
                                        type={"date"}
                                        label={"brithday"}
                                        placeholder={"brithday"}
                                        value={watchedFiles2?.brithday || ''}
                                        onChange={() => clearErrors("brithday")}
                                        style={{ marginTop: "10px" }}
                                    />
                                    <AddInput
                                        style={{ marginTop: "10px" }}
                                        type={"text"}
                                        label={"電子メール"}
                                        placeholder={"電子メール"}
                                        value={watchedFiles2?.email || ''}
                                        onChange={() => clearErrors("email")}
                                        register={{ ...register2('email') }}
                                    />
                                    <AddInput
                                        style={{ marginTop: "10px" }}
                                        type={"password"}
                                        label={"パスワード"}
                                        placeholder={"パスワード"}
                                        onChange={() => clearErrors("password")}
                                        register={{ ...register2('password') }}
                                    />
                                </div>
                            </div>
                        </>
                    }
                    <AddInput
                        style={{ marginTop: "10px", width: "100%" }}
                        type={"textarea"}
                        label={"Bio"}
                        value={watchedFiles2?.bio || 'bio'}
                        placeholder={"bio"}
                        onChange={() => clearErrors("bio")}
                        register={{ ...register2('bio') }}
                    />

                </div>

                <div className={cls.SetStudent__wrap}>
                    <div className={cls.SetStudent__wrap__img}>
                        <p className={cls.SetStudent__wrap__text}>Gallery</p>
                        <div className={cls.SetStudent__wrap__img__box}>

                            <label>
                                <div>
                                    <GalaryIcons />
                                    <p>upload photo</p>
                                </div>
                                <input type="file" onChange={(e) => hendleimg2(e)} />
                            </label>
                            {
                                avatarArr && avatarArr.map((e, i) => (
                                    <div key={i} className={cls.SetStudent__wrap__cartume}>
                                        <img src={e} alt="img" />
                                        <div
                                            className={cls.SetStudent__wrap__cartume__div}
                                            onClick={async () => {
                                                setAvatarArr(state => state.filter(el => el !== e))
                                                await PhotoUploadStudent({ url: e }, data?.id)
                                                    .then(() => toast('photo deleted successfully'))
                                                    .catch(() => toast('failed to upload'))
                                            }}
                                        >X</div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                </div>
                <AddInput
                    style={{ marginTop: "10px", width: "100%" }}
                    type={"textarea"}
                    label={"Description"}
                    placeholder={"Description"}
                    value={watchedFiles2?.desc || ''}
                    onChange={() => clearErrors("desc")}
                    register={{ ...register2('desc') }}
                />
            </form>
            <Toaster />
            {loading && <Loader onClick={() => setLoading(false)} />}

        </Container >
    )
}