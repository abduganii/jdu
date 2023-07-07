

import React from 'react'
import { ClockIcon } from '../../icons'

import cls from "./newsList.module.scss"

export default function NewsList({ img, category, text, createAt, onClick }) {
    let date = new Date(createAt);
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    const weeksDay = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]

    return (
        <div className={cls.NewsList} onClick={onClick} >
            <div className={cls.NewsList__img}>
                <img
                    src={img}
                    width={324}
                    height={196}
                    alt="img"
                />
            </div>
            <div className={cls.NewsList__content} >
                <div className={cls.NewsList__top}>
                    <p className={cls.NewsList__category} style={{ border: "1px solid #932F46", color: "#932F46" }}>{category}</p>
                    <p className={cls.NewsList__date}><ClockIcon />{Hours}:{Minutes} {weeksDay[date.getDay()]}</p>
                </div>
                <p className={cls.NewsList__text}>{text}</p>
            </div>
        </div>
    )
}
