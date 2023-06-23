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
const lesson = [
    {
        id: 1,
        text: "IT web",
    },
    {
        id: 12,
        text: "Jabon",
    },
    {
        id: 13,
        text: "English",
    },
    {
        id: 22,
        text: "Web",
    },
    {
        id: 3,
        text: "English",
    },
    {
        id: 2,
        text: "Web",
    }
]

export default function SetStudent({ data }) {
    const router = useNavigate()
    const [lessonId, setLessonId] = useState()
    const [semestorId, setsemestorId] = useState()
    const [lassonsArr, setLessonArr] = useState([])

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

    console.log(lassonsArr);

    const { register, handleSubmit, setValue } = useForm({ defaultValues: { status: "Incompleted" } });
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
                }
            })
            .catch(err => console.log(err))

    }
    console.log(lassonsArr)
    return (
        <Container className={cls.SetStudent__container} style={{ marginTop: "100px" }} >
            <div className={cls.SetStudent__top}>
                <div className={cls.SetStudent__top__Info}>
                    <button onClick={() => router(-1)}>
                        <LeftIcon />
                        <p className={cls.SetStudent__top__role}>Student</p>
                    </button>

                    <h3 className={cls.SetStudent__top__fName}>Saidakhmetov Bekmurod</h3>
                </div>
                <div className={cls.SetStudent__top__btns}>
                    <CancelBtn onClick={() => router(-1)}>
                        Cancel
                    </CancelBtn>
                    <BlueButtun style={{ padding: "14px 30px" }}>
                        Save changes
                    </BlueButtun>
                </div>
            </div>
            <div className={cls.SetStudent__inputs}>
                <label className={cls.SetStudent__upload} >
                    <img
                        src={"/Image/Ellipse08.png"}
                        width={150}
                        height={150}
                        alt="img"

                    />
                    <input className={cls.SetStudent__upload__file} type="file" />
                    <div className={cls.SetStudent__upload__icon}>  <UploadIcons /> </div>
                </label>
                <div className={cls.SetStudent__content}>
                    <AddInput
                        style={{ marginTop: "10px" }}
                        type={"text"}
                        label={"Specialisation"}
                        placeholder={"Specialisation"}
                    />
                    <AddInput
                        style={{ marginTop: "10px" }}
                        type={"text"}
                        label={"Specialisation"}
                        placeholder={"Specialisation"}
                    />
                    <AddInput
                        style={{ marginTop: "10px" }}
                        type={"text"}
                        label={"Specialisation"}
                        placeholder={"Specialisation"}
                    />
                    <AddInput
                        style={{ marginTop: "10px" }}
                        type={"text"}
                        label={"Specialisation"}
                        placeholder={"Specialisation"}
                    />
                    <AddInput
                        style={{ marginTop: "10px" }}
                        type={"text"}
                        label={"Specialisation"}
                        placeholder={"Specialisation"}
                    />
                    <AddInput
                        style={{ marginTop: "10px" }}
                        type={"text"}
                        label={"Specialisation"}
                        placeholder={"Specialisation"}
                    />
                    <AddInput
                        style={{ marginTop: "10px" }}
                        type={"text"}
                        label={"Specialisation"}
                        placeholder={"Specialisation"}
                    />
                    <AddInput
                        style={{ marginTop: "10px" }}
                        type={"text"}
                        label={"Specialisation"}
                        placeholder={"Specialisation"}
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
                <SearchSkill label={"Soft skills"} placeholder={"write name skills"} style={{ marginBottom: "24px" }} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Hyper Text Markup language"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Cascading style sheet"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Java Script"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Vue Js"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"React JS"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Android"} />

            </div>
            <AddInput type={"textarea"} label={"Description"} placeholder={"Write here description"} style={{ marginTop: "25px" }} />
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
                        lassonsArr && lassonsArr?.find(e => e?.id == semestorId)?.results?.map(e => (
                            < div className={cls.SetStudent__list__bottom} key={e?.id} >
                                <p className={cls.SetStudent__list__bottom__text}>{e?.lessonName}</p>
                                <p className={cls.SetStudent__list__bottom__text}>
                                    {e?.status}</p>
                                <p className={cls.SetStudent__list__bottom__text}>{e?.university}</p>
                                <p className={cls.SetStudent__list__bottom__text}>{e?.credit}</p>
                            </div>

                        ))
                    }
                </div>

            </LessonTable >
        </Container >
    )
}
