'use client'


import { useState } from 'react'
import { UploadNewIcon } from '../../icons'
import cls from "./AvatarInput.module.scss"

export default function AvatarInput({ onChange, url, ...other }) {




    return (
        <div className={cls.AvatarInput}  {...other} >
            <label >
                <input type="file" onChange={(e) => {
                    onChange(e)
                }
                } />
                <div className={cls.AvatarInput__avatar}>
                    {url ? <img className={cls.AvatarInput__avatar__img} src={url} alt="img" /> : <UploadNewIcon color={"#5627DC"} />}
                </div>
                <p className={cls.AvatarInput__avatar__text}>アバター</p>
            </label>
            <p className={cls.AvatarInput__text}>画像のサイズは3x4で、524kb以内。.</p>
        </div>
    )
}
