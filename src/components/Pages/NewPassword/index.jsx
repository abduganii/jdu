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
                            <h3 className={cls.Login__content__title}>新しいパスワードを作成</h3>
                        </div>
                    </div>

                    <form className={cls.Form} >
                        <LoginInput
                            type={'text'}
                            placeholder={"新しいパスワード"}
                            style={{ marginBottom: "30px", paddingLeft: 0 }}
                            register={{ ...register("password", { required: true }) }}
                        />
                        <LoginInput
                            type={'password'}
                            placeholder={"パスワード認証"}
                            style={{ marginBottom: "31px", paddingLeft: 0 }}
                            register={{ ...register("password", { required: true }) }}
                        />

                        <ButtunLogin type='submit'>パスワードを変更</ButtunLogin>
                    </form>
                </div>
            </div>
            <div className={cls.Login__img}>

            </div>
            <Toaster />
        </div>
    )
}
