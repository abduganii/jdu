'use client'


import toast, { Toaster } from 'react-hot-toast';

import { useForm } from 'react-hook-form'

import cls from './Login.module.scss'
import { json, useNavigate } from 'react-router-dom';
import ButtunLogin from '../../UL/buttun/loginButtun';
import LoginInput from '../../UL/input/loginInput';
import { AuthLogin } from '../../../services/auth';
import { useEffect, useState } from 'react';
export default function LoginPage() {
    const { register, handleSubmit, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const [check, setCheck] = useState(false)
    // useEffect(() => {
    //     if (localStorage.getItem("myapp-loginId") && localStorage.getItem("myapp-password")) {
    //         setValue("password", localStorage.getItem("myapp-password"))
    //         setValue("loginId", localStorage.getItem("myapp-loginId"))
    //     }
    // }, [])
    const router = useNavigate()

    const handleAuth = async (data) => {
        await AuthLogin({ remember: check, ...data })
            .then((response) => {
                if (check) {
                    localStorage.setItem("myapp-loginId", watchedFiles?.loginId); localStorage.setItem("myapp-password", watchedFiles?.password)
                }
                router(`/${response?.data?.user?.role}/home`)
            })
            .catch(error => {
                setError('loginId', { type: 'custom', message: "IDまたはパスワードが間違っています" });
                setError('password', { type: 'custom', message: "IDまたはパスワードが間違っています" });

            })
    }
    return (
        <div className={cls.Login}>
            <div className={cls.Login__content}>
                <div>
                    <div className={cls.Login__content__top}>
                        <img
                            src='/logo.svg'
                            width={70}
                            height={70}
                            alt='img'
                        />
                        <div>
                            <h3 className={cls.Login__content__title}>おかえりなさい</h3>
                            <p className={cls.Login__content__text}>情報を入力してください。</p></div>
                    </div>

                    <form className={cls.Form} onSubmit={handleSubmit(handleAuth)}>
                        <p className={cls.Form__idtext}>ログイン</p>
                        <LoginInput
                            type={'text'}
                            placeholder={"IDを入力してください"}
                            style={{ backgroundImage: "url('/Image/inutIcons.png')", marginBottom: "40px" }}
                            register={{ ...register("loginId", { required: "ログインIDが必要です" }) }}
                            alert={errors.loginId?.message}
                            value={watchedFiles?.loginId || ''}

                        />
                        <LoginInput
                            type={'password'}
                            placeholder={"パスワードを入力してください"}
                            register={{ ...register("password", { required: "パスワードが必要です" }) }}
                            style={{ backgroundImage: "url('/Image/Iconsinpt.png')" }}
                            alert={errors.password?.message}
                            value={watchedFiles?.password || ''}

                        />
                        <div className={cls.Form__bottom}>
                            <label className={cls.Form__label} >
                                <input className={cls.Form__chechbox} type="checkbox" onChange={(e) => setCheck(!check)} />
                                入力情報保存
                            </label>
                            <p className={cls.Form__forget} onClick={() => router('/auth/logout')}>パスワードをお忘れの方</p>
                        </div>
                        <ButtunLogin type='submit'>ログイン</ButtunLogin>
                    </form>
                </div>
            </div>
            <div className={cls.Login__img}>

            </div>
            <Toaster />
        </div>
    )
}
