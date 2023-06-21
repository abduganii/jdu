
import BackBtn from '../../../UL/buttun/backBtn'
import SkillBtn from '../../../UL/buttun/skill'
import Container from '../../../UL/container'
import LessonTable from '../../../UL/LassonTable'
import Person from '../../../UL/person'
import RateTest from '../../../UL/RateTest'

import React from 'react'

import cls from "./OneStudent.module.scss"
import { useNavigate } from 'react-router-dom'

const data = {
    id: 0,
    name: "Annette Black",
    skills: ['html', 'scss', 'java', 'node'],
    avater: '/Image/Ellipse08.png',
    progress: '98',
    rate: 4.7,
    isSelcted: true,
    year: "2 year",
    text: "Dynamic, innovative with 2+ years of highly valuable hands-on experience in handling multiple simultaneous creative design projects, concept creation, graphic design, animations and visual conceptualization. Ability to leverage skills gained in the creative industry, identify opportunities, overcome objections, build long-term mutually beneficial relationships with vendors, labor, and clients, and increase brand awareness by establishing a successful and profitable firm."
}

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

export default function OneStudent() {
    const router = useNavigate()
    return (
        <Container className={cls.OneStudent__container} >
            <BackBtn onClick={(e) => router(-1)} style={{ marginBottom: "40px" }} />
            <Person id={data.id} name={data.name} rate={data.rate} avatar={data.avater} year={data.year} />
            <div className={cls.OneStudent__content}>
                <h3 className={cls.OneStudent__title}>Introduce yourself</h3>
                <p className={cls.OneStudent__text}>{data.text}</p>
                <p className={cls.OneStudent__title}>Gallery</p>
                <div className={cls.OneStudent__imgs}>
                    <img
                        src={'/Image/Rectangle502.png'}
                        width={223}
                        height={160}
                        alt='img'
                    />
                </div>
                <h3 className={cls.OneStudent__title1}>Japan Language tests</h3>
                <RateTest title={"JLPT"} text={"N4"} Listening={45} writing={65} Reading={85} />
                <RateTest title={"NAT"} text={"Q2"} Listening={85} writing={65} Reading={45} />
                <p className={cls.OneStudent__title}>IT qualification</p>
                <p className={cls.OneStudent__text2}>Soft Skills Percentage </p>
                {
                    data.skills.map(e => (
                        <>
                            <p className={cls.OneStudent__skills}>{e}</p>
                            <progress className={cls.OneStudent__skills__progress} value={data.progress} max="100"></progress>
                            <p className={cls.OneStudent__skills__text}>{data.progress}%</p>
                        </>
                    ))
                }
                <p className={cls.OneStudent__text3}>Dynamic, innovative with 2+ years of highly valuable hands-on experience in handling multiple simultaneous creative design projects, concept creation, graphic design, animations and visual conceptualization. Ability to leverage skills gained in the creative industry, identify opportunities, overcome objections, build long-term mutually beneficial relationships with vendors, labor, and clients, and increase brand awareness by establishing a successful and profitable firm.</p>


                <h3 className={cls.OneStudent__Percentage}>University Percentage</h3>
                <p className={cls.OneStudent__Percentage__text}>Subjects Progress</p>
                <div className={cls.OneStudent__Percentage__wrap}>
                    <div className={cls.OneStudent__Percentage__div}>
                        <div className={cls.OneStudent__Percentage__top}>
                            <h3 className={cls.OneStudent__Percentage__title}>Attendee</h3>
                            <p className={cls.OneStudent__Percentage__progress}>69%</p>
                        </div>
                        <progress value={69} max="100"></progress>
                    </div>
                    <div className={cls.OneStudent__Percentage__div}>
                        <div className={cls.OneStudent__Percentage__top}>
                            <h3 className={cls.OneStudent__Percentage__title}>Attendee</h3>
                            <p className={cls.OneStudent__Percentage__progress}>69%</p>
                        </div>
                        <progress value={69} max="100"></progress>
                    </div>
                    <div className={cls.OneStudent__Percentage__div}>
                        <div className={cls.OneStudent__Percentage__top}>
                            <h3 className={cls.OneStudent__Percentage__title}>Attendee</h3>
                            <p className={cls.OneStudent__Percentage__progress}>69%</p>
                        </div>
                        <progress value={69} max="100"></progress>
                    </div>
                    <div className={cls.OneStudent__Percentage__div}>
                        <div className={cls.OneStudent__Percentage__top}>
                            <h3 className={cls.OneStudent__Percentage__title}>Attendee</h3>
                            <p className={cls.OneStudent__Percentage__progress}>69%</p>
                        </div>
                        <progress value={69} max="100"></progress>
                    </div>
                </div>
                <LessonTable lassons={lesson}>
                    <div className={cls.OneStudent__list}>
                        <div className={cls.OneStudent__list__top}>
                            <p className={cls.OneStudent__list__top__text}>科目</p>
                            <p className={cls.OneStudent__list__top__text}>状態</p>
                            <p className={cls.OneStudent__list__top__text}>科目</p>
                            <p className={cls.OneStudent__list__top__text}>クレジット</p>
                        </div>
                        <div className={cls.OneStudent__list__bottom}>
                            <p className={cls.OneStudent__list__bottom__text}>科目</p>
                            <p className={cls.OneStudent__list__bottom__text}>
                                <SkillBtn name={"完成した"} color={'#E44D26'} backround={'rgba(241, 101, 41, 0.1)'} /></p>
                            <p className={cls.OneStudent__list__bottom__text}>状態</p>
                            <p className={cls.OneStudent__list__bottom__text}>クレジット</p>
                        </div>
                    </div>
                </LessonTable>
            </div>
        </Container >
    )
}
