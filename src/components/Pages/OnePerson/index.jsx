import Container from '../..//UL/container'
import Person from '../..//UL/person'
import BackBtn from '../../UL/buttun/backBtn'


import { useNavigate } from 'react-router-dom'

import cls from "./Person.module.scss"
import BlueButtun from '../../UL/buttun/blueBtn'

const data = {
    id: 0,
    name: "Annette Black",
    skills: ['html', 'scss', 'java', 'node'],
    avater: '/Image/Ellipse08.png',
    progress: '98',
    rate: 4.7,
    year: "2 year",

}
export default function OnePerson({ loginId, firstName, lastName, email, avatar, bio, work }) {
    const router = useNavigate()

    return (
        <Container className={cls.OnePerson__container}>
            <BackBtn onClick={() => router(-1)} style={{ marginBottom: "40px" }} />
            <Person id={loginId} name={`${firstName} ${lastName}`} email={email} avatar={avatar} year={work} />
            <h3 className={cls.OnePerson__title}>バイオ</h3>
            <p className={cls.OnePerson__text}>{bio !== "undefined" ? bio : "バイオなし"}</p>
        </Container>

    )
}
