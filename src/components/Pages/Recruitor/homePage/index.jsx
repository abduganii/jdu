import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GetCertificates } from '../../../../services/statistic'
import { TeacherGet } from '../../../../services/teacher'
import Container from '../../../UL/container'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import AddMadal from '../../../UL/madals/AddMadal'
import TopStudents from '../../../UL/topStudents'


import cls from "./homePage.module.scss"

export default function HomePage({ role }) {
    const [data, setData] = useState([])
    const [data2, setData2] = useState(0)
    const [openMadal, setOpenMadal] = useState(true)
    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
    useEffect(() => {
        const fetchData = async () => {
            const res = await GetCertificates();
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
                        <h2 className={cls.HomePage__card__card__title}>{data?.students}</h2>
                        <p className={cls.HomePage__card__card__text}>Attendence: 100%</p>
                        <p className={cls.HomePage__card__card_role}>Students</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>{data2}</h2>
                        <p className={cls.HomePage__card__card__text}>Attendence: 78%</p>
                        <p className={cls.HomePage__card__card_role}>Teacher</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>12639</h2>
                        <p className={cls.HomePage__card__card__text}>Must have: 237</p>
                        <p className={cls.HomePage__card__card_role}>Lesson hour</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>12639</h2>
                        <p className={cls.HomePage__card__card__text}>Not attended: 18%</p>
                        <p className={cls.HomePage__card__card_role}>Marks</p>
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
                        <h3 className={cls.HomePage__chart__title}>NAT certificate</h3>
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
            {/* <TopStudents students={data} role={role} count={count} /> */}

            {openMadal && role != "decan" &&

                <AddMadal
                    role={"Registeration"}
                    style={{ maxWidth: "775px" }}
                    closeMadal={() => setOpenMadal(false)}
                >
                    <AvatarInput
                        // onChange={(e) => hendleimg(e)}
                        // url={avatar || watchedFiles?.avatar}
                        style={{ marginBottom: '43px' }}
                    />
                    <div className={cls.HomePage__addInputs}>
                        <AddInput
                            register={{ ...register('firstName', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"名前"}
                            placeholder={"名前"}
                            // value={watchedFiles?.firstName || ''}
                            // alert={errors.firstName?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('lastName', { required: "名字は必要です！" }) }}
                            type={"text"}
                            label={"名字"}
                            placeholder={"名字"}
                            // value={watchedFiles?.lastName || ''}
                            // alert={errors.lastName?.message}
                            onChange={() => clearErrors("lastName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('companyName', { required: "会社名は必要です！" }) }}
                            type={"text"}
                            label={"会社名"}
                            placeholder={"会社名"}
                            // value={watchedFiles?.companyName || ''}
                            // alert={errors.companyName?.message}
                            onChange={() => clearErrors("companyName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('specialisation', { required: "専門は必要です！" }) }}
                            type={"text"}
                            label={"専門"}
                            placeholder={"専門"}
                            // value={watchedFiles?.specialisation || ''}
                            // alert={errors.specialisation?.message}
                            onChange={() => clearErrors("specialisation")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('phoneNumber', { required: "電話番号は必要です！" }) }}
                            type={"number"}
                            label={"電話番号"}
                            placeholder={"電話番号"}
                            // value={watchedFiles?.phoneNumber || ''}
                            // alert={errors.phoneNumber?.message}
                            onChange={() => clearErrors("phoneNumber")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('email', { required: "メールは必要です！" }) }}
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            // value={watchedFiles?.email || ''}
                            // alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('loginId', { required: "IDは必要です！" }) }}
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            // value={watchedFiles?.loginId || ''}
                            geterat={true}
                            loginGenerate={(e) => setValue("loginId", e)}
                            // alert={errors.loginId?.message}
                            onChange={() => clearErrors("loginId")}
                            style={{ marginBottom: "20px" }}
                        // disabled={query == "true" ? true : false}
                        />


                    </div>
                </AddMadal>
            }
        </>
    )
}
