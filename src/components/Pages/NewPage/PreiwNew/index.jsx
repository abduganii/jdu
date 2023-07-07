import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackBtn from '../../../UL/buttun/backBtn'
import Container from '../../../UL/container'
import { ClockIcon } from '../../../UL/icons'

import cls from "./OnNewsPage.module.scss"

export default function PriewNew() {
    const router = useNavigate()
    const NewData = useSelector(state => state.newsPreview)

    return (
        <Container className={cls.OnNewsPage__container}>
            <BackBtn onClick={() => router(-1)} />
            <div className={cls.OnNewsPage__top}>
                <p className={cls.OnNewsPage__category} style={{ border: "1px solid #932F46", color: "#932F46" }}>{NewData?.category?.name}</p>
            </div>
            <h3 className={cls.OnNewsPage__title}>{NewData?.title}</h3>
            <img
                className={cls.OnNewsPage__img}
                src={NewData?.avatar ? URL.createObjectURL(NewData?.avatar) : ""}
                width={690}
                height={380}
                alt="img"
            />
            <p dangerouslySetInnerHTML={{ __html: NewData?.dicr }} className={cls.OnNewsPage__text} />
        </Container>
    )
}
