import RightAsideWrapper from '../Aside/RightAsideWrapper'
import cls from "./topStudents.module.scss"
import { Student } from './data'
import TopStudentList from '../list/topStudent'

export default function TopStudents({ students = [] }) {
    return (
        <RightAsideWrapper style={{ padding: "24px 20px 10px 24px" }}>
            <h3 className={cls.TopStudents__title}>University top students</h3>
            <p className={cls.TopStudents__text}> 10 students from {Student.length + 1} </p>

            {Student?.map(e => (
                <TopStudentList key={e.id} avatar={e.avater} name={e.name} progress={e.progress} />
            ))}
        </RightAsideWrapper>
    )
}
