
import BackBtn from '../../../UL/buttun/backBtn'
import Container from '../../../UL/container'
import Person from '../../../UL/person'
import RateTest from '../../../UL/RateTest'

import React, { useEffect, useState } from 'react'

import cls from "./OneStudent.module.scss"
import { useNavigate } from 'react-router-dom'
import BlueButtun from '../../../UL/buttun/blueBtn'
import NoGaler from '../../../UL/NoGallery'
import Avatar from 'react-avatar'
import { EmailIcons2, TelIcons2 } from '../../../UL/icons'


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

    return (
        <div className={cls.OneStudent}>

            <Container  >

                <div className={cls.OneStudent__Wrap1}>
                    {role != 'student' ? <BackBtn onClick={(e) => router(-1)} role={true} UserId={user?.id} style={{ maxWidth: "100%" }} /> : ""}
                    {
                        role && role === "decan" ?
                            <BlueButtun
                                light={true}
                                className={cls.OneStudent__btn}
                                onClick={() => router(`/${role}/studentsSet/${user?.id}`)}
                                style={{ padding: "14px 30px" }}
                            >
                                プロファイル編集
                            </BlueButtun> :
                            ""
                    }

                </div>

                <div className={cls.OneStudent__Wrap}>


                    <Person
                        id={user?.loginId}
                        name={`${user?.firstName} ${user?.lastName}`}
                        avatar={user?.avatar}
                        year={user?.courseNumber + "年生"}
                        email={user?.email}
                    />
                    <div>
                        {role === "student" ?
                            <BlueButtun
                                light={true}
                                className={cls.OneStudent__btn}
                                onClick={() => router(`/student/studentsSet/${user?.id}`)}
                                style={{ padding: "14px 30px", marginLeft: "auto", marginBottom: "10px" }}
                            >
                                プロファイル編集
                            </BlueButtun> : ""}
                        <div className={cls.OneStudent__person}>

                            <div className={cls.OneStudent__person__box}>

                                {false ? <img
                                    src={null}
                                    width={130}
                                    height={130}
                                    alt={"img"}
                                /> : <Avatar name={"Name"} size="64" round={64} />
                                }

                                <div className={cls.OneStudent__person__dv}>
                                    <p className={cls.OneStudent__person__text}>Name Name</p>
                                    <p className={cls.OneStudent__person__id}>ID: 0928179</p>
                                </div>

                            </div>

                            <a href="#"> <EmailIcons2 /> barotovj@gmail.com</a>
                            <a href="#"> <TelIcons2 /> +998 99 345 42 43</a>
                        </div>
                    </div>
                </div>

                <div className={cls.OneStudent__content}>
                    <h3 className={cls.OneStudent__title}>自己紹介</h3>
                    {
                        user?.bio && <>
                            <p className={cls.OneStudent__text}>{user?.bio}</p>
                        </>
                    }
                    {
                        <>
                            {user?.image ?
                                <>
                                    <p className={cls.OneStudent__title}>ギャラリー</p>
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
                        user?.jlpt || user?.jud && <h3 className={cls.OneStudent__title}>Japan Language tests</h3>
                    }

                    <div className={cls.OneStudent__Test__wrap}>
                        {
                            user?.jlpt ? <div className={cls.OneStudent__Test}>
                                <p className={cls.OneStudent__Test__text}>JLPT</p>
                                <div className={cls.OneStudent__Test__box}>{user?.jlpt ? user?.jlpt : "N"}</div>
                                <p className={cls.OneStudent__Test__p}>Japanese Language Proficiency Test</p>
                            </div> : <div></div>
                        }
                        {
                            user?.jdu ? <div className={cls.OneStudent__Test}>
                                <p className={cls.OneStudent__Test__text}>JLPT</p>
                                <div className={cls.OneStudent__Test__box}>{user?.jdu ? user?.jdu : "Q"}</div>
                                <p className={cls.OneStudent__Test__p}>Japanese Language Proficiency Test</p>
                            </div> : <div></div>
                        }
                    </div>
                </div>

            </Container >

        </div >
    )
}
