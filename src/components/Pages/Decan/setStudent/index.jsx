'use client'

import BlueButtun from '../../../UL/buttun/blueBtn'
import CancelBtn from '../../../UL/buttun/cancel'
import Container from '../../../UL/container'
import { DownloadIcons, LeftIcon, UploadIcons } from '../../../UL/icons'
import RangeInput from '../../../UL/input/rangeInput'
import SearchSkill from '../../../UL/input/SearchSkill'
import AddInput from '../../../UL/input/AddInput'

import React, { useEffect, useState } from 'react'
import cls from "./SetStudent.module.scss"
import { useNavigate } from 'react-router-dom'
import LessonTable from '../../../UL/LassonTable'
import SkillBtn from '../../../UL/buttun/skill'
import { Select } from 'antd'
import { useForm } from 'react-hook-form'
import { LessonsAdd } from '../../../../services/Lesson'
import { GetSkills, StudentsUpdate } from '../../../../services/student'
import toast, { Toaster } from 'react-hot-toast'
import Avatar from 'react-avatar'

export default function SetStudent({ data, Specialisation }) {
    const router = useNavigate()
    const [lessonId, setLessonId] = useState()
    const [semestorId, setsemestorId] = useState()
    const [avatar, setAvatar] = useState()
    const [lassonsArr, setLessonArr] = useState([])
    const [skills, setSkills] = useState([])
    const [newSkill, setNewArr] = useState(data?.itQualification?.skills)
    const [specialisationtext, setSpecialisationtext] = useState("Specialisation")

    const { register, handleSubmit, setValue, watch, reset } = useForm({ defaultValues: { status: "Incompleted" } });
    const { register: register2, handleSubmit: handleSubmit2, setValue: setValue2, watch: watch2 } = useForm();

    const watchedFiles = watch()
    const watchedFiles2 = watch2()


    useEffect(() => {
        if (!lessonId) {
            setLessonId(data.lessons?.[0]?.id)
        }
    }, [data.lessons])


    useEffect(() => {
        const arr = data.lessons?.find(e => e.id == lessonId)
        setLessonArr(arr?.semesters)
        setsemestorId(arr?.semesters?.[0]?.id)
    }, [lessonId])

    useEffect(() => {
        setNewArr(data?.itQualification?.skills)
        setValue2("avatar", data?.avatar)
        setValue2("firstName", data?.firstName)
        setValue2("lastName", data?.lastName)
        setValue2("loginId", data?.loginId)
        setValue2("groupNumber", data?.groupNumber)
        setValue2("courseNumber", data?.courseNumber)
        setValue2('specialisationId', data?.specialisation?.id)
        setValue2('email', data?.email)
        setSpecialisationtext(data?.specialisation?.name)
        setAvatar(data?.avatar)
        const fetchData = async () => {
            const res = await GetSkills();
            setSkills(res)



        }
        fetchData()
            .then((err) => {
                console.log(err);
            })




    }, [data])


    const updateFieldChanged = index => e => {
        setNewArr(
            newSkill.map((item, i) =>
                i === index
                    ? { ...item, procent: e }
                    : item
            ))
    }

    const AddDataSubmit = async (body) => {
        const formData = new FormData()

        const content = JSON.stringify({
            description: body.description,
            skills: newSkill
        })

        if (body.avatar) formData.append("avatar", body.avatar)
        if (body.firstName) formData.append("firstName", body.firstName)
        if (body.lastName) formData.append("lastName", body.lastName)
        if (body.loginId) formData.append("loginId", body.loginId)
        if (body.groupNumber) formData.append("groupNumber", body.groupNumber)
        if (body.courseNumber) formData.append("courseNumber", body.courseNumber)
        if (body.specialisationId) formData.append("specialisationId", body.specialisationId)
        if (body.email) formData.append("email", body.email)
        formData.append("itQualification", content)
        await StudentsUpdate(formData, data?.id)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('recrutiar updated')
                    // router('/decan/students')

                }
            })
            .catch(err => toast(err.response.data.message))
    }

    const AddLessonFunc = async (body) => {
        await LessonsAdd(body, semestorId)
            .then(res => {
                if (res.status === 201) {
                    setLessonArr(status => {
                        return status.map(el => {
                            if (el.id === semestorId) {
                                return {
                                    ...el,
                                    results: [res.data, ...el.results]
                                }
                            } else {
                                return el
                            }
                        })
                    })
                    reset()
                }
            })
            .catch(err => console.log(err))
    }

    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setValue2('avatar', e.target.files[0])
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <Container className={cls.SetStudent__container} style={{ marginTop: "100px" }} >
            <form onSubmit={handleSubmit2(AddDataSubmit)} >
                <div className={cls.SetStudent__top}>
                    <div className={cls.SetStudent__top__Info}>
                        <div onClick={() => router(-1)}>
                            <LeftIcon />
                            <p className={cls.SetStudent__top__role}>Student</p>
                        </div>

                        <h3 className={cls.SetStudent__top__fName}>Saidakhmetov Bekmurod</h3>
                    </div>
                    <div className={cls.SetStudent__top__btns}>
                        <CancelBtn onClick={() => router(-1)}>
                            Cancel
                        </CancelBtn>
                        <BlueButtun type={"submit"} style={{ padding: "14px 30px" }}>
                            Save changes
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
                            label={"Firstname"}
                            placeholder={"Firstname"}
                            register={{ ...register2('firstName') }}
                            value={watchedFiles2?.firstName || ''}
                        />
                        <AddInput
                            style={{ marginTop: "10px" }}
                            type={"text"}
                            label={"Lastname"}
                            placeholder={"Lastname"}
                            register={{ ...register2('lastName') }}
                            value={watchedFiles2?.lastName || ''}
                        />
                        <AddInput
                            style={{ marginTop: "10px" }}
                            type={"text"}
                            label={"ID"}
                            placeholder={"LoginID"}
                            register={{ ...register2('loginId') }}
                            value={watchedFiles2?.loginId || ''}
                        />
                        <AddInput
                            type={"select"}
                            label={"Specialisation"}
                            placeholder={specialisationtext}
                            Specialisation={Specialisation}
                            onChange={(e) => {
                                setValue2('specialisationId', e)
                            }}
                        />
                        <AddInput
                            style={{ marginTop: "10px" }}
                            type={"text"}
                            label={"Group"}
                            placeholder={"Group"}
                            register={{ ...register2('groupNumber') }}
                            value={watchedFiles2?.groupNumber || ''}
                        />
                        <AddInput
                            style={{ marginTop: "10px" }}
                            type={"text"}
                            label={"Course number"}
                            placeholder={"Course number"}
                            register={{ ...register2('courseNumber') }}
                            value={watchedFiles2?.courseNumber || ''}
                        />
                        <AddInput
                            style={{ marginTop: "10px" }}
                            type={"text"}
                            label={"E-mail"}
                            placeholder={"E-mail"}
                            register={{ ...register2('email') }}
                        />
                        <AddInput
                            style={{ marginTop: "10px" }}
                            type={"password"}
                            label={"Password"}
                            placeholder={"Password"}
                            register={{ ...register2('password') }}
                        />
                    </div>
                </div>
                <h3 className={cls.SetStudent__lesson}>Japan Language tests</h3>
                <p className={cls.SetStudent__lesson__number}>JLPT №4</p>
                <div className={cls.SetStudent__lesson__wrap}>
                    <RangeInput lessonType={"Listening"} />
                    <RangeInput lessonType={"Reading"} />
                    <RangeInput lessonType={"Writing"} />
                    <div className={cls.SetStudent__Sertifacet}>
                        <p className={cls.SetStudent__Sertifacet__text}>Sertifacet</p>
                        <label className={cls.SetStudent__Sertifacet__Download} >
                            <p className={cls.SetStudent__Sertifacet__Download__text}>File not uploaded</p>
                            <DownloadIcons />
                            <input type="file" />
                        </label>
                    </div>
                </div>
                <p className={cls.SetStudent__lesson__number} style={{ marginTop: "33px" }}>NAT Q2 №4</p>
                <div className={cls.SetStudent__lesson__wrap}>
                    <RangeInput lessonType={"Listening"} />
                    <RangeInput lessonType={"Reading"} />
                    <RangeInput lessonType={"Writing"} />
                    <div className={cls.SetStudent__Sertifacet}>
                        <p className={cls.SetStudent__Sertifacet__text}>Sertifacet</p>
                        <label className={cls.SetStudent__Sertifacet__Download} >
                            <p className={cls.SetStudent__Sertifacet__Download__text}>File not uploaded</p>
                            <DownloadIcons />
                            <input type="file" />
                        </label>
                    </div>
                </div>

                <h3 className={cls.SetStudent__lesson} style={{ marginTop: "60px" }}>IT qualification</h3>

                <div className={cls.SetStudent__skill}>
                    <SearchSkill
                        label={"Soft skills"}
                        placeholder={"write name skills"}
                        skill={skills}
                        style={{ marginBottom: "24px" }}
                        onChange={(e) => {
                            skills.map(s => {
                                if (s?.id == e) {
                                    setNewArr(state => [...state, { skillId: e, skill: { name: s.name, color: s?.color }, procent: 0 }])
                                }
                            })
                            setSkills(skills.filter(item => item.id !== e));


                        }}
                    />
                    {newSkill && newSkill?.map((nS, index) => (
                        <RangeInput
                            key={index}
                            style={{ marginBottom: "29px" }}
                            defaultRange={nS?.procent}
                            color={nS?.skill?.color}
                            lessonType={nS?.skill?.name}
                            onChange={updateFieldChanged(index)}
                        />
                    ))}

                </div>
                <AddInput
                    type={"textarea"}
                    label={"Description"}
                    placeholder={"Write here description"}
                    style={{ marginTop: "25px" }}

                    register={{ ...register2('description') }} />
                value={watchedFiles2?.description || ''}
                <h3 className={cls.SetStudent__lesson} style={{ marginTop: "60px" }}> University Percentage</h3>
                <p className={cls.SetStudent__progress}>Subjects Progress</p>
                <div className={cls.SetStudent__skill}>
                    <RangeInput style={{ marginBottom: "29px" }} lessonType={"Attendee"} />
                    <RangeInput style={{ marginBottom: "29px" }} lessonType={"IT course"} />
                    <RangeInput style={{ marginBottom: "29px" }} lessonType={"Japan language"} />
                    <RangeInput style={{ marginBottom: "29px" }} lessonType={"Sanno University"} />
                    <RangeInput style={{ marginBottom: "29px" }} lessonType={"UzSWLUniversity"} />
                    <RangeInput style={{ marginBottom: "29px" }} lessonType={"Co-Work"} />
                    <RangeInput style={{ marginBottom: "29px" }} lessonType={"All marks"} />
                </div>
            </form>
            <LessonTable lassons={data?.lessons} lessonId={lessonId} setsemestorId={setsemestorId} setLessonId={setLessonId} semestorId={semestorId}>
                <form className={cls.SetStudent__lesson__add} onSubmit={handleSubmit(AddLessonFunc)} >
                    <input
                        className={cls.SetStudent__lesson__input}
                        type="text" placeholder='Lesson name'
                        {...register('lessonName', { required: true })}
                    />
                    <Select
                        className={"seclectLesson"}
                        defaultValue={"Incompleted"}
                        options={[{ value: "Incompleted", label: "Incompleted" }, { value: "Completed", label: "Completed" }]}
                        onChange={(e) => setValue('status', e)}
                    />
                    <input
                        className={cls.SetStudent__lesson__input}
                        type="text" placeholder='University name'
                        {...register('university', { required: true })}
                    />
                    <input
                        className={cls.SetStudent__lesson__inputNumber}
                        type="number" placeholder='0'
                        defaultValue={0}
                        {...register('credit')}
                    />
                    <button className={cls.SetStudent__lesson__btn}>add</button>
                </form>
                <div className={cls.SetStudent__list}>
                    <div className={cls.SetStudent__list__top}>
                        <p className={cls.SetStudent__list__top__text}>科目</p>
                        <p className={cls.SetStudent__list__top__text}>状態</p>
                        <p className={cls.SetStudent__list__top__text}>科目</p>
                        <p className={cls.SetStudent__list__top__text}>クレジット</p>
                    </div>
                    {
                        lassonsArr && lassonsArr?.find(e => e?.id == semestorId)?.results?.map(el => (
                            < div className={cls.SetStudent__list__bottom} key={el?.id} >
                                <p className={cls.SetStudent__list__bottom__text}>{el?.lessonName}</p>
                                <p className={cls.SetStudent__list__bottom__text}>
                                    {el?.status}</p>
                                <p className={cls.SetStudent__list__bottom__text}>{el?.university}</p>
                                <p className={cls.SetStudent__list__bottom__text}>{el?.credit}</p>
                            </div>
                        ))
                    }
                </div>
            </LessonTable >
            <Toaster />
        </Container >
    )
}
