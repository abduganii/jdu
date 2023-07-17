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
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { GetNewsById, NewsAdd, NewsUpdete } from '../../../../services/news'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../UL/loader'
// import { newsPreviewActions } from "../../../../store/newsPreview/newsPreview.slice"

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
    const NewData = JSON.parse(localStorage.getItem("object"))
    const [category, setCategory] = useState(categoryArr[0]?.id)
    const [loader, setLoader] = useState(false)
    const [params] = useSearchParams()
    const [avatar, setAvatar] = useState()
    const [imga, setImga] = useState()
    const [avatarAlert, setAvatarAlert] = useState(false)

    const { register, handleSubmit, watch, setValue, getValues, formState: { errors }, reset } = useForm()
    const watchedFiles = watch()

    const router = useNavigate()

    useEffect(() => {
        if (!params.get('id')) {
            setCategory(categoryArr[0]?.id)
        }
    }, [categoryArr])

    useEffect(() => {
        reset(NewData)
        setCategory(NewData?.category)
    }, [])

    useEffect(() => {

        const fetchData = async () => {
            const res = await GetNewsById(params.get("id"));
            setValue("title", res?.languages?.[0]?.title)
            setValue("shortDescription", res?.languages?.[0]?.shortDescription)
            setValue("description", res?.languages?.[0]?.description)
            setImga(res?.image)
            setCategory(res?.categoryId)
        }
        if (params.get("id")) {
            fetchData()
                .then((err) => {
                    console.log(err);
                })
        }

    }, [params.get("id")])


    const AddNew = async (data) => {

        const formData = new FormData()
        const content = JSON.stringify({
            title: data?.title,
            shortDescription: data?.shortDescription,
            description: data?.description
        })
        formData.append("image", avatar || imga)
        formData.append("jp", content)
        formData.append("categoryId", category)


        if (avatar || imga && category && content) {
            setLoader(true)
            if (params.get("id")) {
                await NewsUpdete(formData, params.get("id"))
                    .then(res => {
                        setLoader(false)
                        router('/news')
                        toast("news updete")
                        localStorage.clear("object")
                    })
                    .catch(err => {
                        setLoader(false)
                        toast(err.messege)
                    })
            } else {
                await NewsAdd(formData)
                    .then(res => {
                        setLoader(false)
                        router('/news')
                        toast("news Created")
                        localStorage.clear("object")
                    })
                    .catch(err => {
                        setLoader(false)
                        toast(err.messege)
                    })
            }
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
                            register={{ ...register(`title`, { required: " タイトルの入力が必要" },) }}
                            label={"ニュースタイトル"}
                            placeholder={"ニュースタイトル"}
                            type={"text"}
                            style={{ marginBottom: "30px" }}
                            alert={errors.title?.message}
                            value={watchedFiles?.title || ''}
                        />
                        <NewsInput
                            register={{ ...register(`shortDescription`, { required: "説明の入力が必要" }) }}
                            label={"短い説明"}
                            placeholder={"短い説明"}
                            type={"textarea"}
                            alert={errors.shortDescription?.message}
                            value={watchedFiles?.title || ''}
                        />
                    </div>
                    <NewsInput
                        label={"画像のタイトル"}
                        type={"file"}
                        url={avatar}
                        img={imga}
                        alert={avatarAlert ? "画像は必須" : false}
                        onChange={e => hendleimg(e)}
                    />
                </div>
                <p className={cls.AddNews__dicr}>説明</p>
                <RichText
                    register={{ ...register(`description`) }}
                    setValue={setValue}
                    getValues={getValues}
                    name={`description`}
                    value={watchedFiles?.description || ''}
                />
            </Container>
            <div className={cls.AddNews__right}>
                <div className={cls.AddNews__btns}>
                    {/* <div className={cls.AddNews__show} onClick={() => router('/previewnews')}><ShowIcons /> 概要</div> */}
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
                </div>
            </div>
            <Toaster />
            {loader && <Loader onClick={() => setLoader(false)} />}
        </form>
    )
}
