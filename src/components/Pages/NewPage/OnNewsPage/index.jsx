import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackBtn from '../../../UL/buttun/backBtn'
import Container from '../../../UL/container'
import { ClockIcon } from '../../../UL/icons'

import cls from "./OnNewsPage.module.scss"

export default function OnNewsPage({ data }) {
    const router = useNavigate()
    let date = new Date(data?.publishDate);
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    const weeksDay = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]


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
