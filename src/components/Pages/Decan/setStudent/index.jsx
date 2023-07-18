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

export default function SetStudent({ data }) {
    const x = useRef()
    const y = useRef()
    const router = useNavigate()
    const [loading, setLoading] = useState(false)
    const [LessonAddId, setLessonAddId] = useState(false)

    const [lessonId, setLessonId] = useState()
    const [semestorId, setsemestorId] = useState()
    const [avatar, setAvatar] = useState()
    const [lassonsArr, setLessonArr] = useState([])
    const [skills, setSkills] = useState([])
    const [newSkill, setNewArr] = useState([])

    const [file, setFile] = useState()
    const [file1, setFile1] = useState()
    const [japonId, SetJaponId] = useState()
    const [japonId1, SetJaponId1] = useState()
    const [listening, SetListing] = useState()
    const [reading, SetReading] = useState()
    const [writing, SetWriting] = useState()
    const [listening1, SetListing1] = useState()
    const [reading1, SetReading1] = useState()
    const [writing1, SetWriting1] = useState()

    const [Attendee, setAttendee] = useState()
    const [ItCourse, setItCourse] = useState()
    const [JPlanguage, setJPlanguage] = useState()
    const [Sanno, setSanno] = useState()
    const [SWL, setSWL] = useState()
    const [CoWork, setCoWork] = useState()
    const [AllMarks, setAllMarks] = useState()



    const { register, handleSubmit, setValue, watch, reset } = useForm({ defaultValues: { status: "Incompleted" } });
    const { register: register2, handleSubmit: handleSubmit2, setValue: setValue2, watch: watch2 } = useForm();
    const { register: register3, handleSubmit: handleSubmit3, setValue: setValue3, watch: watch3, } = useForm();

    const watchedFiles3 = watch3()
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

        setNewArr(data?.itQualification?.skills?.map(sp =>
            ({ skillId: sp?.skill?.id, procent: sp?.procent, skill: { color: sp?.skill?.color, name: sp?.skill?.name } })))
        setValue2("avatar", data?.avatar)
        setValue2("firstName", data?.firstName)
        setValue2("lastName", data?.lastName)
        setValue2("loginId", data?.loginId)
        setValue2("groupNumber", data?.groupNumber)
        setValue2("courseNumber", data?.courseNumber)
        setValue2('email', data?.email)
        setValue2('description', data?.itQualification?.description)
        setAvatar(data?.avatar)
        setFile(data?.japanLanguageTests?.[0]?.sertificate)
        SetListing(data?.japanLanguageTests?.[0]?.listening)
        SetReading(data?.japanLanguageTests?.[0]?.reading)
        SetWriting(data?.japanLanguageTests?.[0]?.writing)
        SetJaponId(data?.japanLanguageTests?.[0]?.id)
        setFile1(data?.japanLanguageTests?.[1]?.sertificate)
        SetListing1(data?.japanLanguageTests?.[1]?.listening)
        SetReading1(data?.japanLanguageTests?.[1]?.reading)
        SetWriting1(data?.japanLanguageTests?.[1]?.writing)
        SetJaponId1(data?.japanLanguageTests?.[1]?.id)
        setAttendee(data?.universityPercentage?.Attendee)
        setItCourse(data?.universityPercentage?.ItCourse)
        setJPlanguage(data?.universityPercentage?.JapanLanguage)
        setSanno(data?.universityPercentage?.SannoUniversity)
        setSWL(data?.universityPercentage?.UzSWLUniversity)
        setCoWork(data?.universityPercentage?.CoWork)
        setAllMarks(data?.universityPercentage?.AllMarks)
        const fetchData = async () => {
            const res = await GetSkills();
            setSkills(res.filter(re => !newSkill.find(e => e?.skill?.name === re?.name)))
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
                    ? { ...item, procent: Number(e) }
                    : item
            ))
    }

    const AddDataSubmit = async (body) => {
        setLoading(true)
        const formData = new FormData()

        const content = JSON.stringify({
            description: body.description,
            skills: newSkill
        })
        const japanLanguageTests = JSON.stringify([
            {
                id: japonId,
                listening: listening,
                reading: reading,
                writing: writing,
                sertificate: file
            },
            {
                id: japonId1,
                listening: listening1,
                reading: reading1,
                writing: writing1,
                sertificate: file1
            }
        ])
        const universityPercentage = JSON.stringify({
            Attendee: Attendee,
            CoWork: CoWork,
            ItCourse: ItCourse,
            JapanLanguage: JPlanguage,
            SannoUniversity: Sanno,
            UzSWLUniversity: SWL
        })


        if (body.avatar) formData.append("avatar", body.avatar)
        if (body.firstName) formData.append("firstName", body.firstName)
        if (body.lastName) formData.append("lastName", body.lastName)
        if (body.loginId) formData.append("loginId", body.loginId)
        if (body.groupNumber) formData.append("groupNumber", body.groupNumber)
        if (body.courseNumber) formData.append("courseNumber", body.courseNumber)
        if (body.email) formData.append("email", body.email)
        formData.append("itQualification", content)
        formData.append("japanLanguageTests", japanLanguageTests)
        formData.append("universityPercentage", universityPercentage)

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

    const AddLessonFunc = async (body) => {
        setLoading(true)

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
                setLoading(false)

            })
            .catch(err => setLoading(false))
    }
    const UpdateLessonFunc = async (body) => {
        setLoading(true)

        await LessonsUpdate(body, LessonAddId)

            .then(res => {
                if (res.status === 203) {
                    console.log(lassonsArr)
                    setLessonArr(status => {
                        return status.map(el => {
                            if (el.id === semestorId) {
                                return {
                                    ...el,
                                    results: [res.data, ...el.results?.filter(r => r?.id !== res?.data?.id)]
                                }
                            } else {
                                return el
                            }
                        })
                    })

                }
                setLoading(false)

            })
            .catch(err => setLoading(false))
    }

    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setValue2('avatar', e.target.files[0])
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }

    const hendleFile = async (e) => {
        if (e.target.files[0]) {
            const formData = new FormData()
            formData.append("file", e.target.files[0])
            await FileUploadStudent(formData)
                .then(data => setFile(data?.url))
                .catch(err => console.log(err))

        }
    }
    const hendleFile1 = async (e) => {
        if (e.target.files[0]) {
            const formData = new FormData()
            formData.append("file", e.target.files[0])
            await FileUploadStudent(formData)
                .then(data => setFile1(data?.url))
                .catch(err => console.log(err))

        }
    }

    const caltAlMark = () => {
        setAllMarks(Math.round((Number(Attendee) + Number(CoWork) + Number(ItCourse) + Number(JPlanguage) + Number(Sanno) + Number(SWL)) / 6))

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
                            編集保存
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
                            label={"eメール"}
                            placeholder={"eメール"}
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
                <h3 className={cls.SetStudent__lesson}>日本語試験</h3>

                <p className={cls.SetStudent__lesson__number}>{data?.japanLanguageTests?.[0]?.name}</p>
                <div className={cls.SetStudent__lesson__wrap}>
                    <RangeInput
                        lessonType={"聴解"}
                        defaultRange={listening}
                        onChange={(pr) => SetListing(pr)}
                    />
                    <RangeInput
                        lessonType={"読解"}
                        defaultRange={reading}
                        onChange={(pr) => SetReading(pr)}
                    />
                    <RangeInput
                        lessonType={"筆記"}
                        defaultRange={writing}
                        onChange={(pr) => SetWriting(pr)}
                    />
                    <div className={cls.SetStudent__Sertifacet}>
                        <p className={cls.SetStudent__Sertifacet__text}>資格 </p>
                        <label className={cls.SetStudent__Sertifacet__Download} >
                            <p className={`${file ? cls.SetStudent__Sertifacet__Download__text : cls.SetStudent__Sertifacet__Download__text1}`}>{file ? " ファイルをアップロード" : "ファイルをアップデート無し"}</p>
                            <div className={`${file && cls.SetStudent__Sertifacet__Download__round}`}>
                                <div className={cls.SetStudent__Sertifacet__Download__}></div>
                                <DownloadIcons color={file ? "white" : "#121212"} back={file ? "#5627DC" : "#C8C4D2"} />
                            </div>
                            <input type="file" accept="image/png, image/jpeg ,application/pdf" onChange={(e) => hendleFile(e)} />
                        </label>
                    </div>
                </div>
                <p className={cls.SetStudent__lesson__number}>{data?.japanLanguageTests?.[1]?.name}</p>
                <div className={cls.SetStudent__lesson__wrap}>
                    <RangeInput
                        lessonType={"聴解"}
                        defaultRange={listening1}
                        onChange={(pr) => SetListing1(pr)}
                    />
                    <RangeInput
                        lessonType={"読解"}
                        defaultRange={reading1}
                        onChange={(pr) => SetReading1(pr)}
                    />
                    <RangeInput
                        lessonType={"筆記"}
                        defaultRange={writing1}
                        onChange={(pr) => SetWriting1(pr)}
                    />
                    <div className={cls.SetStudent__Sertifacet}>
                        <p className={cls.SetStudent__Sertifacet__text}>資格</p>
                        <label className={cls.SetStudent__Sertifacet__Download} >
                            <p className={`${file1 ? cls.SetStudent__Sertifacet__Download__text : cls.SetStudent__Sertifacet__Download__text1}`}>{file1 ? " ファイルをアップロード" : "ファイルをアップデート無し"}</p>
                            <div className={`${file1 && cls.SetStudent__Sertifacet__Download__round}`}>
                                <DownloadIcons color={file1 ? "white" : "#121212"} back={file1 ? "#5627DC" : "#C8C4D2"} />
                            </div>
                            <input type="file" accept="image/png, image/jpeg ,application/pdf" onChange={(e) => hendleFile1(e)} />
                        </label>
                    </div>
                </div>


                <h3 className={cls.SetStudent__lesson} style={{ marginTop: "60px" }}>IT資格</h3>

                <div className={cls.SetStudent__skill}>
                    <SearchSkill
                        label={"スキル"}
                        placeholder={"スキル名を書く"}
                        skill={skills}
                        style={{ marginBottom: "24px" }}
                        onChange={(e) => {
                            skills.map(s => {
                                if (s?.id == e) {
                                    setNewArr(state => [...state, { skillId: e, procent: 0, skill: { color: s?.color, name: s?.name } }])
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
                            skill={true}
                            onChange={updateFieldChanged(index)}
                        />
                    ))}

                </div>
                <AddInput
                    type={"textarea"}
                    label={"概要"}
                    placeholder={"ここに概要を書く"}
                    style={{ marginTop: "25px" }}
                    register={{ ...register2('description') }}
                    value={watchedFiles2?.description || ''}

                />

                <h3 className={cls.SetStudent__lesson} style={{ marginTop: "60px" }}> 大学のパーセンテージ</h3>
                <p className={cls.SetStudent__progress}>科目の進捗状況</p>
                <div className={cls.SetStudent__skill}>
                    <RangeInput
                        style={{ marginBottom: "29px" }}
                        color={"black"}
                        lessonType={"出席者"}
                        defaultRange={Attendee}
                        onChange={(pr) => {
                            setAttendee(pr)
                            caltAlMark()
                        }}
                    />
                    <RangeInput
                        style={{ marginBottom: "29px" }}
                        color={"black"}
                        lessonType={"それコース"}
                        defaultRange={ItCourse}
                        onChange={(pr) => {
                            setItCourse(pr)
                            caltAlMark()
                        }}
                    />
                    <RangeInput
                        style={{ marginBottom: "29px" }}
                        color={"black"}
                        lessonType={"日本語"}
                        defaultRange={JPlanguage}
                        onChange={(pr) => {
                            setJPlanguage(pr)
                            caltAlMark()
                        }}
                    />
                    <RangeInput
                        style={{ marginBottom: "29px" }}
                        lessonType={"産業能率大学"}
                        color={"black"}
                        defaultRange={Sanno}
                        onChange={(pr) => {
                            setSanno(pr)
                            caltAlMark()
                        }}
                    />
                    <RangeInput
                        style={{ marginBottom: "29px" }}
                        lessonType={"ウズ。 SWL大学"}
                        color={"black"}
                        defaultRange={SWL}
                        onChange={(pr) => {
                            setSWL(pr)
                            caltAlMark()
                        }}
                    />
                    <RangeInput
                        style={{ marginBottom: "29px" }}
                        lessonType={"共同作業"}
                        color={"black"}
                        defaultRange={CoWork}
                        onChange={(pr) => {
                            setCoWork(pr)
                            caltAlMark()
                        }}
                    />
                    <RangeInput
                        style={{ marginBottom: "29px" }}
                        lessonType={"すべてのマーク"}
                        defaultRange={AllMarks}
                        disabled={true}
                        onChange={(pr) => setAllMarks(AllMarks)}
                    />
                </div>
            </form>
            <LessonTable lassons={data?.lessons} lessonId={lessonId} setsemestorId={setsemestorId} setLessonId={setLessonId} semestorId={semestorId}>
                <form className={cls.SetStudent__lesson__add} onSubmit={handleSubmit(AddLessonFunc)} >
                    <input
                        className={cls.SetStudent__lesson__input}
                        type="text" placeholder='レッスン名'
                        {...register('lessonName', { required: true })}
                    />
                    <Select
                        className={"seclectLesson"}
                        defaultValue={"未完成"}
                        options={[{ value: "Incompleted", label: "未完成" }, { value: "Completed", label: "完成した" }]}
                        onChange={(e) => setValue('status', e)}
                    />
                    <input
                        className={cls.SetStudent__lesson__input}
                        type="text" placeholder='大学名'
                        {...register('university', { required: true })}
                    />
                    <input
                        className={cls.SetStudent__lesson__inputNumber}
                        type="number" placeholder='0'
                        defaultValue={0}
                        {...register('credit')}
                    />
                    <button className={cls.SetStudent__lesson__btn}>
                        追加</button>
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
                            <div>
                                < div className={cls.SetStudent__list__bottom} key={el?.id} onClick={() => {
                                    setLessonAddId(state => el?.id == state ? false : el?.id)
                                    setValue3("lessonName", el?.lessonName)
                                    setValue3("university", el?.university)
                                    setValue3("credit", el?.credit)
                                    setValue3("status", el?.status)
                                }} >
                                    <p className={cls.SetStudent__list__bottom__text}>{el?.lessonName}</p>
                                    <p className={cls.SetStudent__list__bottom__text}>
                                        {el?.status == "Incompleted" ? "未完成" : "完成した"}</p>
                                    <p className={cls.SetStudent__list__bottom__text}>{el?.university}</p>
                                    <p className={cls.SetStudent__list__bottom__text}>{el?.credit}</p>
                                </div>
                                {
                                    el?.id == LessonAddId ?
                                        <form className={cls.SetStudent__lesson__add} onSubmit={handleSubmit3(UpdateLessonFunc)} >
                                            <input
                                                className={cls.SetStudent__lesson__input}
                                                type="text" placeholder='レッスン名'
                                                value={watchedFiles3?.lessonName}
                                                {...register3('lessonName', { required: true })}
                                            />
                                            <Select
                                                className={"seclectLesson"}
                                                defaultValue={watchedFiles3?.status}
                                                options={[{ value: "Incompleted", label: "未完成" }, { value: "Completed", label: "完成した" }]}
                                                onChange={(e) => setValue3('status', e)}
                                            />
                                            <input
                                                value={watchedFiles3?.university}
                                                className={cls.SetStudent__lesson__input}
                                                type="text" placeholder='大学名'
                                                {...register3('university', { required: true })}
                                            />
                                            <input
                                                className={cls.SetStudent__lesson__inputNumber}
                                                type="number" placeholder='0'
                                                defaultValue={0}
                                                value={watchedFiles3?.credit}
                                                {...register3('credit')}
                                            />
                                            <button className={cls.SetStudent__lesson__btn}>
                                                保存</button>
                                        </form> : ""
                                }

                            </div>
                        ))
                    }
                </div>
            </LessonTable >
            <Toaster />
            {loading && <Loader onClick={() => setLoading(false)} />}

        </Container >
    )
}