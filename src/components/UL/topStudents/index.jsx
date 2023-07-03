import RightAsideWrapper from '../Aside/RightAsideWrapper'
import cls from "./topStudents.module.scss"
import { Student } from './data'
import TopStudentList from '../list/topStudent'
import { useNavigate } from 'react-router-dom'

export default function TopStudents({ students = [], role, count }) {
    const router = useNavigate()
    return (
        <RightAsideWrapper style={{ padding: "24px 20px 10px 24px" }}>
            <h3 className={cls.TopStudents__title}>University top students</h3>
            <p className={cls.TopStudents__text}> 10 students from {count} </p>

            {students?.map(e => (
                <TopStudentList
                    key={e.id}
                    avatar={e.avatar}

                    name={`${e?.firstName} ${e?.lastName}`}
                    progress={e?.universityPercentage?.AllMarks}
                    onClick={() => router(`/${role}/students/${e.id}`)}
                />
            ))}
        </RightAsideWrapper>
    )
}
