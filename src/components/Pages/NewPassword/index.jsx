'use client'


import toast, { Toaster } from 'react-hot-toast';

import { useForm } from 'react-hook-form'

import cls from './Login.module.scss'
import { useNavigate } from 'react-router-dom';
import ButtunLogin from '../../UL/buttun/loginButtun';
import LoginInput from '../../UL/input/loginInput';
import { AuthLogin } from '../../../services/auth';
export default function LoginNewPage() {

    const router = useNavigate()
    const { register, handleSubmit } = useForm();


    return (
        <div className={cls.Login}>
            <div className={cls.Login__content}>
                <div>
                    <div className={cls.Login__content__top}>
                        <div>
                            <h3 className={cls.Login__content__title}>Create new password</h3>
                        </div>
                    </div>

                    <form className={cls.Form} >
                        <LoginInput
                            type={'text'}
                            placeholder={"New password"}
                            style={{ marginBottom: "30px", paddingLeft: 0 }}
                            register={{ ...register("password", { required: true }) }}
                        />
                        <LoginInput
                            type={'password'}
                            placeholder={"Confirm Password"}
                            style={{ marginBottom: "31px", paddingLeft: 0 }}
                            register={{ ...register("password", { required: true }) }}
                        />

                        <ButtunLogin type='submit'>Change password</ButtunLogin>
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
