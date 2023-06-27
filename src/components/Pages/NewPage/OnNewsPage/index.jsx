'use client'


import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackBtn from '../../../UL/buttun/backBtn'
import Container from '../../../UL/container'
import { ClockIcon } from '../../../UL/icons'

import cls from "./OnNewsPage.module.scss"

// const data = {
//     id: 0,
//     createAt: '09:41 Monday',
//     title: "Digital product design news, articles, and resources delivered straight to your inbox.",
//     categore: "Japan",
//     image: '/Image/Rectangle502.png',
//     text: "Digital product design news, articles, and resources delivered straight to your inbox."
// }

export default function OnNewsPage({ data }) {
    const router = useNavigate()
    let date = new Date(data?.publishDate);
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    const weeksDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return (
        <Container className={cls.OnNewsPage__container}>
            <BackBtn onClick={() => router(-1)} />
            <div className={cls.OnNewsPage__top}>
                <p className={cls.OnNewsPage__category} style={{ border: "1px solid #932F46", color: "#932F46" }}>{data?.category?.name}</p>
                <p className={cls.OnNewsPage__date}><ClockIcon /> {Hours}:{Minutes} {weeksDay[date.getDay()]}</p>
            </div>
            <h3 className={cls.OnNewsPage__title}>{data?.languages?.[0]?.title}</h3>
            <img
                className={cls.OnNewsPage__img}
                src={data?.image}
                width={690}
                height={380}
                alt="img"
            />
            <p dangerouslySetInnerHTML={{ __html: data?.languages?.[0]?.description }} className={cls.OnNewsPage__text} />
        </Container>
    )
}
