import RightAsideWrapper from '../Aside/RightAsideWrapper'
import cls from "./topStudents.module.scss"
import { Student } from './data'
import TopStudentList from '../list/topStudent'

export default function TopStudents({ students = [] }) {
    return (
        <RightAsideWrapper style={{ padding: "24px 20px 10px 24px" }}>
            <h3 className={cls.TopStudents__title}>University top students</h3>
            <p className={cls.TopStudents__text}> {students.length} students from {Student.length + 1} </p>

            {students?.map(e => (
                <TopStudentList key={e.id} avatar={e.avatar} name={`${e?.firstName} ${e?.lastName}`} progress={e?.universityPercentage?.AllMarks} />
            ))}
        </RightAsideWrapper>
    )
}
