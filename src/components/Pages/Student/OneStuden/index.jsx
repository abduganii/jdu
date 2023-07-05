
import BackBtn from '../../../UL/buttun/backBtn'
import SkillBtn from '../../../UL/buttun/skill'
import Container from '../../../UL/container'
import LessonTable from '../../../UL/LassonTable'
import Person from '../../../UL/person'
import RateTest from '../../../UL/RateTest'

import React, { useEffect, useState } from 'react'

import cls from "./OneStudent.module.scss"
import { useNavigate } from 'react-router-dom'
import BlueButtun from '../../../UL/buttun/blueBtn'
import NoGaler from '../../../UL/NoGallery'





export default function OneStudent({ user, role }) {
    const router = useNavigate()

    const [lessonId, setLessonId] = useState()
    const [semestorId, setsemestorId] = useState()
    const [lassonsArr, setLessonArr] = useState([])

    useEffect(() => {
        if (!lessonId) {
            setLessonId(user.lessons?.[0]?.id)
        }
    }, [user.lessons])

    useEffect(() => {
        const arr = user.lessons?.find(e => e.id == lessonId)
        setLessonArr(arr?.semesters)
        setsemestorId(arr?.semesters?.[0]?.id)

    }, [lessonId])
    console.log(user)

    return (
        <div className={cls.OneStudent}>

            <Container className={cls.OneStudent__container} >
                <BackBtn onClick={(e) => router(-1)} role={true} style={{ marginBottom: "40px" }} />
                <Person
                    id={user?.loginId}
                    name={`${user?.firstName} ${user?.lastName}`}
                    avatar={user?.avatar}
                    year={user?.courseNumber + " yaer"}
                    email={user?.email}
                />

                <div className={cls.OneStudent__content}>
                    <h3 className={cls.OneStudent__title}>Introduce yourself</h3>
                    {
                        user?.bio && <>
                            <p className={cls.OneStudent__text}>{user?.bio}</p>
                        </>
                    }
                    {
                        <>
                            {user?.image ?
                                <>
                                    <p className={cls.OneStudent__title}>Gallery</p>
                                    <div className={cls.OneStudent__imgs}>
                                        <img
                                            src={'/Image/Rectangle502.png'}
                                            width={223}
                                            height={160}
                                            alt='img'
                                        />
                                    </div>
                                </> : <NoGaler />
                            }
                        </>}
                    {
                        user?.japanLanguageTests?.[0].sertificate & user?.japanLanguageTests?.[1].sertificate ? <h3 className={cls.OneStudent__title1}>Japan Language tests</h3> : ""}
                    {
                        user?.japanLanguageTests && user?.japanLanguageTests.map(e => {
                            if (e?.sertificate) {
                                return (
                                    < RateTest
                                        title={e?.name}
                                        Listening={e?.listening}
                                        writing={e?.reading}
                                        Reading={e?.writing}
                                        file={e?.sertificate}
                                    />
                                )
                            }
                        })

                    }
                    {user?.itQualification?.skills.length ? <> <p className={cls.OneStudent__title}>IT qualification</p>
                        <p className={cls.OneStudent__text2}>Soft Skills Percentage </p></> : ""}
                    {
                        user?.itQualification?.skills?.map(e => (
                            <>
                                <p className={cls.OneStudent__skills}>{e?.skill?.name}</p>
                                <progress className={cls.OneStudent__skills__progress} value={e?.procent} max="100"></progress>
                                <p className={cls.OneStudent__skills__text}>{e?.procent}%</p>
                            </>
                        ))
                    }
                    <p className={cls.OneStudent__text3}>{user?.itQualification?.description}.</p>


                    <h3 className={cls.OneStudent__Percentage}>University Percentage</h3>
                    <p className={cls.OneStudent__Percentage__text}>Subjects Progress</p>
                    <div className={cls.OneStudent__Percentage__wrap}>
                        <div className={cls.OneStudent__Percentage__div}>
                            <div className={cls.OneStudent__Percentage__top}>
                                <h3 className={cls.OneStudent__Percentage__title}>Attendee</h3>
                                <p className={cls.OneStudent__Percentage__progress}>{user?.universityPercentage?.Attendee}%</p>
                            </div>
                            <progress value={user?.universityPercentage?.Attendee} max="100"></progress>
                        </div>
                        <div className={cls.OneStudent__Percentage__div}>
                            <div className={cls.OneStudent__Percentage__top}>
                                <h3 className={cls.OneStudent__Percentage__title}>It course</h3>
                                <p className={cls.OneStudent__Percentage__progress}>{user?.universityPercentage?.ItCourse}%</p>
                            </div>
                            <progress value={user?.universityPercentage?.ItCourse} max="100"></progress>
                        </div>
                        <div className={cls.OneStudent__Percentage__div}>
                            <div className={cls.OneStudent__Percentage__top}>
                                <h3 className={cls.OneStudent__Percentage__title}>Japan language</h3>
                                <p className={cls.OneStudent__Percentage__progress}>{user?.universityPercentage?.JapanLanguage}%</p>
                            </div>
                            <progress value={user?.universityPercentage?.JapanLanguage} max="100"></progress>
                        </div>
                        <div className={cls.OneStudent__Percentage__div}>
                            <div className={cls.OneStudent__Percentage__top}>
                                <h3 className={cls.OneStudent__Percentage__title}>Sanno university</h3>
                                <p className={cls.OneStudent__Percentage__progress}>{user?.universityPercentage?.SannoUniversity}%</p>
                            </div>
                            <progress value={user?.universityPercentage?.SannoUniversity} max="100"></progress>
                        </div>
                        <div className={cls.OneStudent__Percentage__div}>
                            <div className={cls.OneStudent__Percentage__top}>
                                <h3 className={cls.OneStudent__Percentage__title}>Uz. SWL university</h3>
                                <p className={cls.OneStudent__Percentage__progress}>{user?.universityPercentage?.UzSWLUniversity}%</p>
                            </div>
                            <progress value={user?.universityPercentage?.UzSWLUniversity} max="100"></progress>
                        </div>
                        <div className={cls.OneStudent__Percentage__div}>
                            <div className={cls.OneStudent__Percentage__top}>
                                <h3 className={cls.OneStudent__Percentage__title}>Co work</h3>
                                <p className={cls.OneStudent__Percentage__progress}>{user?.universityPercentage?.CoWork}%</p>
                            </div>
                            <progress value={user?.universityPercentage?.CoWork} max="100"></progress>
                        </div>
                        <div className={cls.OneStudent__Percentage__div}>
                            <div className={cls.OneStudent__Percentage__top}>
                                <h3 className={cls.OneStudent__Percentage__title}>All marks</h3>
                                <p className={cls.OneStudent__Percentage__progress}>{Number(Math.round(user?.universityPercentage?.AllMarks))}%</p>
                            </div>
                            <progress value={user?.universityPercentage?.AllMarks} max="100"></progress>
                        </div>

                    </div>
                    <LessonTable lassons={user?.lessons} lessonId={lessonId} setsemestorId={setsemestorId} setLessonId={setLessonId} semestorId={semestorId}>
                        <div className={cls.OneStudent__list}>
                            <div className={cls.OneStudent__list__top}>
                                <p className={cls.OneStudent__list__top__text}>科目</p>
                                <p className={cls.OneStudent__list__top__text}>状態</p>
                                <p className={cls.OneStudent__list__top__text}>科目</p>
                                <p className={cls.OneStudent__list__top__text}>クレジット</p>
                            </div>
                            {
                                lassonsArr && lassonsArr?.find(e => e?.id == semestorId)?.results?.map(el => (
                                    <div className={cls.OneStudent__list__bottom} key={el?.id}>
                                        <p className={cls.OneStudent__list__bottom__text}>{el?.lessonName}</p>
                                        <p className={cls.OneStudent__list__bottom__text}>{el?.status}</p>
                                        <p className={cls.OneStudent__list__bottom__text}>{el?.university}</p>
                                        <p className={cls.OneStudent__list__bottom__text}>{el?.credit}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </LessonTable>
                </div>
            </Container >
            {
                role && role === "decan" ?
                    <BlueButtun
                        className={cls.OneStudent__btn}
                        onClick={() => router(`/${role}/studentsSet/${user?.id}`)}
                        style={{ padding: "14px 30px" }}
                    >
                        Edit profile
                    </BlueButtun> : ""
            }
        </div >
    )
}
