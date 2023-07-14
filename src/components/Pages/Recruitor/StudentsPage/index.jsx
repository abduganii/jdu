import Container from '../../../UL/container'
import Filter from '../../../UL/filter'
import StudentList from '../../../UL/list/studentList'
import TopStudents from '../../../UL/topStudents'

import cls from "./StudentsPage.module.scss"

export default function StudentsPage({ data, selected, student, count }) {
    return (
        <>
            <Container style={{ paddingTop: "100px" }}>
                <Filter />
                <ul className={cls.StudentsPage__top}>
                    <li className={cls.StudentsPage__top__item}>学生</li>
                    <li className={cls.StudentsPage__top__item}>スキル</li>
                    <li className={cls.StudentsPage__top__item}>レート</li>
                    <li className={cls.StudentsPage__top__item}></li>
                </ul>
                <ul>
                    {data && data?.map(e => {
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
                                />
                            )
                        }
                    })}
                </ul>
            </Container>
            <TopStudents students={student} count={count} />
        </>
    )
}
