import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GetCertificates } from '../../../../services/statistic'
import { SectionGet, TeacherGet, TeacherUpdate } from '../../../../services/teacher'
import Container from '../../../UL/container'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import Loader from '../../../UL/loader'
import AddMadal from '../../../UL/madals/AddMadal'
import toast, { Toaster } from 'react-hot-toast';

import cls from "./homePage.module.scss"

const lavozim = [
    {
        id: "bolim boshlig'i",
        name: "bolim boshlig'i",
    },
    {
        id: "leader",
        name: "leader",
    },
    {
        id: "masul hodim",
        name: "masul hodim",
    }

]

export default function HomeTechPage({ user }) {
    const [data, setData] = useState([])
    const [data2, setData2] = useState(0)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState()
    const [openMadal, setOpenMadal] = useState(!user?.isActive)
    const [section, setSection] = useState()
    const [section1, setSection1] = useState()
    const [section2, setSection2] = useState()
    const [section3, setSection3] = useState()
    const [section4, setSection4] = useState()
    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    useEffect(() => {


        const fetchData = async () => {
            const res = await GetCertificates();
            const data2 = await SectionGet()
            setSection(data2)
            setData(res)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
        const fetchData2 = async () => {
            const res = await TeacherGet();
            setData2(res?.count)
        }

        fetchData2()
            .then((err) => {
                console.log(err);
            })


    }, [])




    const UpdateTeacherFunc = async (data) => {

        setLoading(true)
        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("email", user?.email)
        formData.append("loginId", user?.loginId)
        formData.append("isActive", true)
        formData.append("section", section1)
        formData.append("specialisation", section3)
        formData.append("position", section4)
        formData.append("phoneNumber", data?.phoneNumber)
        formData.append("bio", data?.bio)

        await TeacherUpdate(formData, user?.id)
            .then(res => {
                if (res?.data?.message) {
                    toast(res?.data?.message)
                } else if (res.status == 203) {
                    toast('registor seccessful')
                    setOpenMadal(false)
                    setAvatar(null)
                }
                setLoading(false)

            })
            .catch(err => {
                if (err.response.data.message.includes('loginId') || err.response.data.message.includes('Login')) {
                    setError('loginId', { type: 'custom', message: err.response.data.message })
                    setLoading(false)
                }
                if (err.response.data.message == "Validation isEmail on email failed") {
                    setError('email', { type: 'custom', message: "メールが存在しないか、スペルが間違っています" })
                    setLoading(false)
                } if (err.response.data.message === "email must be unique") {
                    setError('email', { type: 'custom', message: "電子メールは一意である必要があります" })
                }
                if (err.response.data.message === "Validation len on password failed") {
                    setError('password', { type: 'custom', message: "パスワードの最小の長さは 8 文字である必要があります" })
                }
                setLoading(false)
            })
    }
    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setValue('avatar', e.target.files[0])
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }
    return (
        <>
            <div className={cls.HomePage} >
                <Container className={cls.HomePage__container} >
                    <h2 className={cls.HomePage__title}>雇用者のワークシート</h2>
                    <p className={cls.HomePage__text}>会社のマニュアルを作成し、会社に関するすべてを追加します。</p>
                    <div className={cls.HomePage__img}>
                        <img
                            src={'/Image/image1.png'}
                            alt='img'
                            width={269}
                            height={197}
                        />
                    </div>

                </Container>

                <div className={cls.HomePage__card}>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>1263</h2>
                        <p className={cls.HomePage__card__card__text}>User percentage: 38%</p>
                        <p className={cls.HomePage__card__card_role}>Students</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>{data2}</h2>
                        <p className={cls.HomePage__card__card__text}>User percentage: 22%</p>
                        <p className={cls.HomePage__card__card_role}>Staff</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>12639</h2>
                        <p className={cls.HomePage__card__card__text}>User percentage: 8%</p>
                        <p className={cls.HomePage__card__card_role}>Recruitors</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>12639</h2>
                        <p className={cls.HomePage__card__card__text}>User percentage: 32%</p>
                        <p className={cls.HomePage__card__card_role}>Parents</p>
                    </div>
                </div>

                <div className={cls.HomePage__chart}>
                    <div className={cls.HomePage__chart__wrap}>
                        <h3 className={cls.HomePage__chart__title}>JLPT certificate</h3>
                        <p className={cls.HomePage__chart__text}>If you do what you've always done, you'll get what you've always gotten.</p>
                        <div className={cls.HomePage__test__wrap}>
                            <div>
                                <div className={cls.HomePage__test}>
                                    {data?.JLPT?.N1}
                                </div>
                                <p className={cls.HomePage__test_test}>N1</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test}>
                                    {data?.JLPT?.N2}
                                </div>
                                <p className={cls.HomePage__test_test}>N2</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test}>
                                    {data?.JLPT?.N3}
                                </div>
                                <p className={cls.HomePage__test_test}>N3</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test}>
                                    {data?.JLPT?.N4}
                                </div>
                                <p className={cls.HomePage__test_test}>N4</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test}>
                                    {data?.JLPT?.N5}
                                </div>
                                <p className={cls.HomePage__test_test}>N5</p>
                            </div>
                        </div>
                    </div>

                    <div className={cls.HomePage__chart__wrap}>
                        <h3 className={cls.HomePage__chart__title}>JDU certificate</h3>
                        <p className={cls.HomePage__chart__text}>If you do what you've always done, you'll get what you've always gotten.</p>
                        <div className={cls.HomePage__test__wrap}>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`}>
                                    {data?.NAT?.Q1}
                                </div>
                                <p className={cls.HomePage__test2_test}>N1</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`}>
                                    {data?.NAT?.Q2}
                                </div>
                                <p className={cls.HomePage__test2_test}>N2</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`}>
                                    {data?.NAT?.Q3}
                                </div>
                                <p className={cls.HomePage__test2_test}>N3</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`}>
                                    {data?.NAT?.Q4}
                                </div>
                                <p className={cls.HomePage__test2_test}>N4</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {!user?.isActive && openMadal &&

                <AddMadal
                    role={"Registeration"}
                    style={{ maxWidth: "775px" }}
                    OnSubmit={handleSubmit(UpdateTeacherFunc)}
                >
                    <AvatarInput
                        onChange={(e) => hendleimg(e)}
                        url={avatar || watchedFiles?.avatar}
                        style={{ marginBottom: '43px' }}
                    />
                    <div className={cls.HomePage__addInputs}>
                        <AddInput
                            register={{ ...register('firstName', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"名前"}
                            placeholder={"名前"}

                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('lastName', { required: "名字は必要です！" }) }}
                            type={"text"}
                            label={"名字"}
                            placeholder={"名字"}
                            onChange={() => clearErrors("lastName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            value={user?.loginId || ""}
                            style={{ marginBottom: "20px" }}
                            disabled={true}
                        />
                        <AddInput
                            type={"select"}
                            label={"Bo’lim"}
                            placeholder={"Bo’lim"}
                            value={section1}
                            style={{ marginBottom: "20px" }}
                            Specialisation={section}
                            onChange={(e) => {
                                const data = section.find(el => el?.id == e)
                                setSection1(data?.name)
                                setSection2(data?.specialisations)
                            }}

                        />
                        {
                            user?.role == "teacher" && <AddInput
                                type={"select"}
                                label={"Specialisation"}
                                placeholder={"Specialisation"}
                                value={section3}
                                Specialisation={section2}
                                style={{ marginBottom: "20px" }}
                                onChange={(e) => {
                                    const data = section2.find(el => el?.id == e)
                                    setSection3(data?.name)
                                }}
                            />
                        }
                        <AddInput
                            type={"select"}
                            label={"Lavozimi"}
                            placeholder={"Lavozimir"}
                            value={section4}
                            style={{ marginBottom: "20px" }}
                            Specialisation={lavozim}
                            onChange={(e) => setSection4(e)}

                        />
                        <AddInput
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            value={user?.email || ''}

                            style={{ marginBottom: "20px" }}
                            disabled={true}
                        />

                        <AddInput
                            register={{ ...register('phoneNumber', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"phoneNumber"}
                            placeholder={"phoneNumber"}
                            value={watchedFiles?.phoneNumber || ''}
                            alert={errors.phoneNumber?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

                        />
                    </div>
                </AddMadal>
            }

            <Toaster />
            {loading && <Loader onClick={() => setLoading(false)} />}
        </>
    )
}
