'use client'


import React, { useState } from 'react'
import { UploadNewIcon } from '../../icons'

import cls from "./newsInput.module.scss"

export default function NewsInput({ label, type, placeholder, register = {}, url, onChange, ...other }) {

    return (
        <label className={`${cls.NewsInput} ${type == "file" ? cls.NewsInputFile : ""}`} {...other}>
            <p className={cls.NewsInput__label}>{label}</p>
            {
                type == "textarea" ?
                    <textarea className={`${cls.NewsInput__input} ${cls.NewsInput__textarae}`} placeholder={placeholder}  {...register}></textarea>
                    :
                    type == "file" ?
                        <div className={cls.NewsInput__file}>
                            <input type="file" onChange={onChange} />
                            <div className={cls.NewsInput__file__top}>
                                {url ?
                                    <img className={cls.NewsInput__input__img} src={URL.createObjectURL(url)} alt="img" /> :
                                    <p className={cls.NewsInput__file__imgtext}>NO IMAGE</p>}
                            </div>
                            <div className={cls.NewsInput__file__btm}>
                                <div className={cls.NewsInput__file__blue}>
                                    <UploadNewIcon color={"white"} />
                                </div>
                                <div className={cls.NewsInput__file__content}>
                                    <h4 className={cls.NewsInput__file__title}>Upload Photo</h4>
                                    <p className={cls.NewsInput__file__text}>.jpg .png. tif</p>
                                </div>
                            </div>
                        </div> :
                        <input
                            className={cls.NewsInput__input}
                            type={type} placeholder={placeholder}
                            onChange={onChange}
                            {...register}
                        />
            }
        </label >
    )
}
