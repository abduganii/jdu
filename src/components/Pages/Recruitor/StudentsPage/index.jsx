import React from 'react'
import Container from '../../../UL/container'
import Filter from '../../../UL/filter'
import StudentList from '../../../UL/list/studentList'
import TopStudents from '../../../UL/topStudents'

import cls from "./StudentsPage.module.scss"

const StudentsPage = React.forwardRef(({ data, selected, student, count }, ref) => {


    return (
        <>
            <Container style={{ paddingTop: "100px" }}>
                <Filter page={"student"} />
                <ul className={cls.StudentsPage__top}>
                    <li className={cls.StudentsPage__top__item}>学生</li>
                    <li className={cls.StudentsPage__top__item}>スキル</li>
                    <li className={cls.StudentsPage__top__item}>レート</li>
                    <li className={cls.StudentsPage__top__item}>アクション</li>
                </ul>
                <ul>
                    {data?.length ? data?.map(e => {
                        if (selected) {
                            if (e.isSelected === true) {
                                return (
                                    <StudentList
                                        key={e?.id}
                                        name={`${e?.firstName} ${e?.lastName}`}
                                        id={e?.id}
                                        loginId={e?.loginId}
                                        avatar={e?.avatar}
                                        skills={e?.itQualification?.skills}
                                        rate={e?.universityPercentage?.AllMarks}
                                        isSelcted={e?.isSelected}
                                        student={true}
                                    />
                                )
                            }
                        } else {
                            return (
                                <StudentList
                                    key={e?.id}
                                    name={`${e?.firstName} ${e?.lastName}`}
                                    id={e?.id}
                                    loginId={e?.loginId}
                                    avatar={e?.avatar}
                                    skills={e?.itQualification?.skills}
                                    rate={e?.universityPercentage?.AllMarks}
                                    isSelcted={e?.isSelected}
                                    student={true}
                                />
                            )
                        }
                    }) :
                        <div className={cls.StudentsPage__search}>
                            <p className={cls.StudentsPage__search__text}>
                                {
                                    data?.length == 0 ? "WE can not find this student" : "Search student by category you want"
                                }
                            </p>

                            <img
                                src={'/Image/search1.png'}
                                alt='img'
                            />
                        </div>
                    }
                    <div ref={ref} style={{ padding: "10px" }}></div>
                </ul>
            </Container>
            <TopStudents students={student} count={count} />
        </>
    )
})

export default StudentsPage;