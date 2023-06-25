'use client'

import RightAsideWrapper from '../../../UL/Aside/RightAsideWrapper'
import BlueButtun from '../../../UL/buttun/blueBtn'
import { ShowIcons } from '../../../UL/icons'
import Language from '../../../UL/language'
import Container from '../../../UL/container'
import NewsInput from '../../../UL/input/newsInput'
import RichText from '../../../UL/input/RichText'
import Timepicker from '../../../UL/input/Timepicker'
import Datapicker from '../../../UL/input/Datapicker'
// const RichText = dynamic(() => import('../../../UL/input/RichText'), { ssr: false })


import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react'
import cls from "./AddNews.module.scss"
import { Category } from "../data"
import { useNavigate } from 'react-router-dom'

const data = [
    {
        id: 2121,
        text: "Uzbek",
        lang: "uz"
    },
    {
        id: 3421,
        text: "Japon",
        lang: "jp"
    },
    {
        id: 2321,
        text: "Inglish",
        lang: "en"
    },
]

export default function AddNewsPage() {
    const [category, setCategory] = useState(false)
    const router = useNavigate()
    return (
        <from className={cls.AddNews}>

            <Container style={{ marginTop: "112px", marginRight: "51px" }}>
                <Language language={data} />

                <div className={cls.AddNews__top}>
                    <div className={cls.AddNews__titles}>
                        <NewsInput label={"News Title"} placeholder={"News Title"} type={"text"} style={{ marginBottom: "20px" }} />
                        <NewsInput label={"Short description"} placeholder={"Short description"} type={"textarea"} />
                    </div>
                    <NewsInput label={"Image for Title"} type={"file"} />
                </div>
                <p className={cls.AddNews__dicr}>Description</p>
                <RichText onChange={(e) => console.log(e)} />

            </Container>
            <div className={cls.AddNews__right}>
                <div className={cls.AddNews__btns}>
                    <div className={cls.AddNews__show} onClick={() => router('/news/1')}><ShowIcons /> Quick view</div>
                    <BlueButtun onClick={() => {
                        toast("news created")
                        router('/news/1')
                    }}>
                        Publish News
                    </BlueButtun>
                </div>
                <div className={cls.AddNews__wrap} style={{ padding: "40px 14px 40px 30px", marginTop: "20px" }}>
                    <p className={cls.AddNews__category__text}>Choose category</p>
                    {Category?.map(e => (
                        <div key={e?.id}>
                            <label className={cls.AddNews__category}>
                                <input type={"radio"} name='category' value={e?.id} onChange={(el) => {
                                    if (el.target.value == e?.id) {
                                        setCategory(false)
                                    }
                                    setCategory(el.target.value)
                                }} />
                                <div className={`${cls.AddNews__category__check} ${category == e?.id ? cls.categoryActive : ""}`}>
                                    <div></div>
                                </div>
                                <p className={cls.AddNews__category__text1}> {e?.text}</p>
                            </label>
                        </div>
                    ))}
                    <p className={cls.AddNews__Putlishtext}>Putlish Date</p>
                    <div className={cls.AddNews__data}>
                        <Timepicker label='Time' />
                        <Datapicker label={"Date"} />
                    </div>
                </div>
            </div>
            <Toaster />
        </from>
    )
}
