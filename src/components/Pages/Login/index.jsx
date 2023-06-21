'use client'


import toast, { Toaster } from 'react-hot-toast';

import { useForm } from 'react-hook-form'

import cls from './Login.module.scss'
import { useNavigate } from 'react-router-dom';
import ButtunLogin from '../../UL/buttun/loginButtun';
import LoginInput from '../../UL/input/loginInput';
import { AuthLogin } from '../../../services/auth';
export default function LoginPage() {

    const router = useNavigate()
    const { register, handleSubmit } = useForm();

    const handleAuth = async (data) => {
        await AuthLogin(data)
            .then((response) => {
                router(`/${response?.data?.user?.role}/home`)
            })
            .catch(error => {
                console.log(error)
                toast(error?.response?.data?.message)
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
                            <h3 className={cls.Login__content__title}>Welcome back</h3>
                            <p className={cls.Login__content__text}>Please enter your details. </p></div>
                    </div>

                    <form className={cls.Form} onSubmit={handleSubmit(handleAuth)}>
                        <p className={cls.Form__idtext}>Your ID</p>
                        <LoginInput
                            type={'text'}
                            placeholder={"Enter your ID"}
                            style={{ backgroundImage: "url('/Image/inutIcons.png')", marginBottom: "21px" }}
                            register={{ ...register("loginId", { required: true }) }}
                        />
                        <LoginInput
                            type={'password'}
                            placeholder={"Enter your password"}
                            register={{ ...register("password", { required: true }) }}
                            style={{ backgroundImage: "url('/Image/Iconsinpt.png')" }}
                        />
                        <div className={cls.Form__bottom}>
                            <label className={cls.Form__label}>
                                <input className={cls.Form__chechbox} type="checkbox" />
                                Remember
                            </label>
                            <p className={cls.Form__forget}>Forgot password</p>
                        </div>
                        <ButtunLogin type='submit'>Log in</ButtunLogin>
                    </form>
                </div>
            </div>
            <div className={cls.Login__img}>
                <img
                    src='/Image/photo_login.png'
                    alt='img'
                />
            </div>
            <Toaster />
        </div>
    )
}
