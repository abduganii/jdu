import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import cls from './Login.module.scss'
import { useNavigate } from 'react-router-dom';
import ButtunLogin from '../../UL/buttun/loginButtun';
import LoginInput from '../../UL/input/loginInput';
import { Forget } from '../../../services/auth';
import { useState } from 'react';
import BlueButtun from '../../UL/buttun/blueBtn';
export default function LogoutPage() {
    const [trueFalse, setIt] = useState(true)
    const router = useNavigate()
    const { register, handleSubmit } = useForm();

    const handleAuth = async (data) => {
        setIt(false)
        await Forget(data)
            .then((response) => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                toast(error?.response?.data?.message)
            })
    }
    if (trueFalse) {
        return (
            <div className={cls.Login}>
                <div className={cls.Login__content}>
                    <div>
                        <div className={cls.Login__content__top}>
                            <div>
                                <h3 className={cls.Login__content__title}>Forgot password</h3>
                                <p className={cls.Login__content__text}>We send new password to your E-mail</p>
                            </div>
                        </div>

                        <form className={cls.Form} onSubmit={handleSubmit(handleAuth)}>
                            <p className={cls.Form__idtext}>Changing password</p>
                            <LoginInput
                                type={'text'}
                                placeholder={"Enter your E-mail"}
                                style={{ backgroundImage: "url('/Image/inutIcons.png')", marginBottom: "50px" }}
                                register={{ ...register("email", { required: true }) }}
                            />
                            {/* <p className={cls.Form__forget} onClick={() => router('/auth/login')}>Back</p> */}
                            <ButtunLogin type='submit'>Send password</ButtunLogin>
                        </form>
                    </div>
                </div>
                <div className={cls.Login__img}>
                    <img
                        src='/Image/photo_login.png'
                        alt='img'
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className={cls.Login}>
                <div className={cls.Login__content}>
                    <div>
                        <div className={cls.Login__content__top}>
                            <div>
                                <h3 className={cls.Login__content__title}>An update link has been sent!</h3>
                                <p className={cls.Login__content__text}>We have send you an e-mail that contains a link to uptade your password.</p>
                            </div>
                        </div>


                        <ButtunLogin style={{ marginTop: "82px" }} onChange={() => router('/auth/login')}>Back to login</ButtunLogin>

                    </div>
                </div>
                <div className={cls.Login__img}>
                    <img
                        src='/Image/photo_login.png'
                        alt='img'
                    />
                </div>
            </div>
        )
    }
}
