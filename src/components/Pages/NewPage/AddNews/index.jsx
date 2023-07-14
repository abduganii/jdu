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
import React, { useEffect, useState } from 'react'
import cls from "./AddNews.module.scss"
// import { Category } from "../data"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { NewsAdd } from '../../../../services/news'
import { useDispatch, useSelector } from 'react-redux'
import { newsPreviewActions } from "../../../../store/newsPreview/newsPreview.slice"

const data = [
    {
        id: 3421,
        text: "日本",
        lang: "jp"
    },
    {
        id: 2321,
        text: "ウズベク",
        lang: "uz"
    },
]


export default function AddNewsPage({ categoryArr }) {
    const [category, setCategory] = useState(categoryArr[0]?.id)
    const [lang, setLang] = useState(data[0].lang)

    const [dicr, setDicr] = useState()
    const [avatar, setAvatar] = useState(false)
    const [avatarAlert, setAvatarAlert] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const WatchFile = watch()
    const dispatch = useDispatch()
    const router = useNavigate()


    useEffect(() => {
        dispatch(newsPreviewActions.setNews({ dicr, avatar, category, ...WatchFile }))
        setCategory(categoryArr[0]?.id)
    }, [WatchFile])



    const AddNew = async (data) => {
        const formData = new FormData()

        const content = JSON.stringify({
            title: data?.title,
            shortDescription: data?.shortDescription,
            description: dicr
        })
        formData.append("image", avatar)
        formData.append(lang, content)
        formData.append("categoryId", category)

        if (!category) {
            setError('categoryId', { type: 'custom', message: "画像が必須です" })
        }


        if (avatar && category && content) {
            await NewsAdd(formData)
                .then(res => {
                    router('/news')
                    toast("news Created")
                })
                .catch(err => toast(err.messege))
        } else {
            setAvatarAlert(true)
        }
    }
    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0])
        }
    }


    return (
        <form onSubmit={handleSubmit(AddNew)} className={cls.AddNews} >

            <Container style={{ marginTop: "142px", marginRight: "51px" }}>
                <div className={cls.AddNews__top}>
                    <div className={cls.AddNews__titles}>
                        <NewsInput
                            label={"ニュースタイトル"}
                            placeholder={"ニュースタイトル"}
                            type={"text"}
                            style={{ marginBottom: "30px" }}
                            alert={errors.title?.message}
                            register={{ ...register(`title`, { required: " タイトルの入力が必要" },) }}
                        />
                        <NewsInput
                            label={"短い説明"}
                            placeholder={"短い説明"}
                            type={"textarea"}
                            alert={errors.shortDescription?.message}
                            register={{ ...register(`shortDescription`, { required: "説明の入力が必要" }) }}
                        />
                    </div>
                    <NewsInput
                        label={"画像のタイトル"}
                        type={"file"}
                        url={avatar}
                        alert={avatarAlert ? "画像は必須" : false}

                        onChange={e => hendleimg(e)}
                    />
                </div>
                <p className={cls.AddNews__dicr}>説明</p>
                <RichText onChange={(e) => setDicr(e)} />

            </Container>
            <div className={cls.AddNews__right}>
                <div className={cls.AddNews__btns}>
                    <div className={cls.AddNews__show} onClick={() => router('/previewnews')}><ShowIcons /> 概要</div>
                    <BlueButtun type='submit'>
                        ニュースの発行
                    </BlueButtun>
                </div>
                <div className={cls.AddNews__wrap} style={{ padding: "40px 14px 40px 30px", marginTop: "20px" }}>
                    <p className={cls.AddNews__category__text}>カテゴリの選択</p>
                    {categoryArr?.map(e => (
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
                                <p className={cls.AddNews__category__text1}> {e?.name}</p>
                            </label>
                        </div>
                    ))}
                    {/* <p className={cls.AddNews__Putlishtext}>Putlish Date</p>
                    <div className={cls.AddNews__data}>
                        <Timepicker label='Time' />
                        <Datapicker label={"Date"} />
                    </div> */}
                </div>
            </div>
            <Toaster />
        </form>
    )
}
