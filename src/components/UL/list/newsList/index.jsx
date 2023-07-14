import React, { useRef } from 'react'
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { NewstDelelet } from '../../../../services/news';
import { ClockIcon } from '../../icons'

import cls from "./newsList.module.scss"

export default function NewsList({ id, img, category, role, text, createAt, onClick }) {
    let date = new Date(createAt);
    let Hours = date.getHours();
    let Minutes = date.getMinutes();
    const weeksDay = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
    const d = useRef()
    const queryClient = useQueryClient()
    const [params] = useSearchParams()
    return (
        <div className={cls.NewsList} onClick={(e) => {
            if (e.target != d.current) {
                onClick(e)
            }
        }} >
            <div className={cls.NewsList__img}>
                <img
                    src={img}
                    width={324}
                    height={196}
                    alt="img"
                />
            </div>
            <div className={cls.NewsList__content} >
                <div>
                    <div className={cls.NewsList__top}>
                        <p className={cls.NewsList__category} style={{ border: "1px solid #932F46", color: "#932F46" }}>{category}</p>
                        <p className={cls.NewsList__date}><ClockIcon />{Hours}:{Minutes} {weeksDay[date.getDay()]}</p>
                    </div>
                    <p className={cls.NewsList__text}>{text}</p>
                </div>

                {role == "decan" ? <button ref={d} className={cls.NewsList__delete} onClick={() => {
                    NewstDelelet(id)
                    queryClient.invalidateQueries(['news', params.get('categoryId'), params.get('search')],)
                }}>消去</button> : ""}
            </div>
        </div>
    )
}
