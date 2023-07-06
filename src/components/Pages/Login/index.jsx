'use client'


import toast, { Toaster } from 'react-hot-toast';

import { useForm } from 'react-hook-form'

import cls from './Login.module.scss'
import { useNavigate } from 'react-router-dom';
import ButtunLogin from '../../UL/buttun/loginButtun';
import LoginInput from '../../UL/input/loginInput';
import { AuthLogin } from '../../../services/auth';
import { useEffect } from 'react';
export default function LoginPage() {

    const router = useNavigate()
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const handleAuth = async (data) => {
        await AuthLogin(data)
            .then((response) => {
                router(`/${response?.data?.user?.role}/home`)
            })
            .catch(error => {
                setError('loginId', { type: 'custom', message: error?.response?.data?.message });
                setError('password', { type: 'custom', message: error?.response?.data?.message });

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
                            register={{ ...register("loginId", { required: "loginId is required" }) }}
                            alert={errors.loginId?.message}

                        />
                        <LoginInput
                            type={'password'}
                            placeholder={"パスワードを入力してください"}
                            register={{ ...register("password", { required: "password is required" }) }}
                            style={{ backgroundImage: "url('/Image/Iconsinpt.png')" }}
                            alert={errors.password?.message}

                        />
                        <div className={cls.Form__bottom}>
                            <label className={cls.Form__label}>
                                <input className={cls.Form__chechbox} type="checkbox" />
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
