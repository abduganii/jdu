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

export default function HomePage() {
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


        </>
    )
}
