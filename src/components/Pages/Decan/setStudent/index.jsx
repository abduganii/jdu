'use client'

import BlueButtun from '../../../UL/buttun/blueBtn'
import CancelBtn from '../../../UL/buttun/cancel'
import Container from '../../../UL/container'
import { DownloadIcons, LeftIcon, UploadIcons } from '../../../UL/icons'
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
import { FileUploadStudent, GetSkills, StudentsUpdate } from '../../../../services/student'
import toast, { Toaster } from 'react-hot-toast'
import Avatar from 'react-avatar'
import Loader from '../../../UL/loader'
import CreditInput from '../../../UL/input/creditinput'
import { GetCridents } from '../../../../services/statistic'
import SertificanSkill from '../../../UL/input/sertifican/index.jsx'

export default function SetStudent({ data }) {
    const x = useRef()
    const y = useRef()
    const router = useNavigate()
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()


    const { register: register2, handleSubmit: handleSubmit2, setValue: setValue2, watch: watch2 } = useForm();
   
    const watchedFiles2 = watch2()



    useEffect(() => {
        setValue2("avatar", data?.avatar)
        setValue2("firstName", data?.firstName)
        setValue2("lastName", data?.lastName)
        setValue2("loginId", data?.loginId)
        setValue2("groupNumber", data?.groupNumber)
        setValue2("courseNumber", data?.courseNumber)
        setValue2('email', data?.email)
        setValue2('description', data?.itQualification?.description)
        setAvatar(data?.avatar)
      

    }, [data])

    const AddDataSubmit = async (body) => {
        setLoading(true)
        const formData = new FormData()

      


        if (body.avatar) formData.append("avatar", body.avatar)
        if (body.firstName) formData.append("firstName", body.firstName)
        if (body.lastName) formData.append("lastName", body.lastName)
        if (body.loginId) formData.append("loginId", body.loginId)
        if (body.groupNumber) formData.append("groupNumber", body.groupNumber)
        if (body.courseNumber) formData.append("courseNumber", body.courseNumber)
        if (body.email) formData.append("email", body.email)
        if (body.password) formData.append("password", body.password)
     
        await StudentsUpdate(formData, data?.id)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('student updated')
                    router('/decan/students')

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

  

    return (
        <Container className={cls.SetStudent__container} style={{ marginTop: "100px", marginLeft: "40px" }} >
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
            <form onSubmit={handleSubmit2(AddDataSubmit)} >

                <div className={cls.SetStudent__top}>
                    <div className={cls.SetStudent__top__Info}>
                        <div onClick={() => x.current.classList.add("displayBlock")}>
                            <LeftIcon />
                            <p className={cls.SetStudent__top__role}>戻る</p>
                        </div>

                        <h3 className={cls.SetStudent__top__fName}>{data?.firstName} {data?.lastName}</h3>
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
                            style={{ marginTop: "10px" }}
                            type={"text"}
                            label={"グループ"}
                            placeholder={"グループ"}
                            register={{ ...register2('groupNumber') }}
                            value={watchedFiles2?.groupNumber || ''}
                        />
                        <AddInput
                            style={{ marginTop: "10px" }}
                            type={"number"}
                            label={"コース番号"}
                            placeholder={"コース番号"}
                            register={{ ...register2('courseNumber') }}
                            value={watchedFiles2?.courseNumber || ''}
                        />
                        <AddInput
                            style={{ marginTop: "10px" }}
                            type={"text"}
                            label={"電子メール"}
                            placeholder={"電子メール"}
                            register={{ ...register2('email') }}
                        />
                        <AddInput
                            style={{ marginTop: "10px" }}
                            type={"password"}
                            label={"パスワード"}
                            placeholder={"パスワード"}
                            register={{ ...register2('password') }}
                        />
                    </div>
                </div>
        
            </form>
            <Toaster />
            {loading && <Loader onClick={() => setLoading(false)} />}

        </Container >
    )
}