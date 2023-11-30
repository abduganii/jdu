import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DecanPerson } from '../../../../services/decan'
import { GetCertificates } from '../../../../services/statistic'
import { TeacherGet } from '../../../../services/teacher'
import Container from '../../../UL/container'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import AddMadal from '../../../UL/madals/AddMadal'



import cls from "./homePage.module.scss"

export default function HomePage() {
    const [JDU, setJDU] = useState({})
    const [JLPT, setJLPT] = useState({})
    const [maxValue, setmaxValue] = useState(0)
    const [data, setData] = useState([])
    const [data2, setData2] = useState(0)
    const [openMadal, setOpenMadal] = useState(true)
    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();


    useEffect(() => {
        const fetchData = async () => {
            const res = await GetCertificates();
            setJDU(res?.JDU)
            setJLPT(res?.JLPT)
            setmaxValue(res?.student)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
        const fetchDecanPerson = async () => {
            const res = await DecanPerson();
            setData(res)
        }
        fetchDecanPerson()
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
                        {/* <img
                            src={'/Image/image1.png'}
                            alt='img'
                            width={269}
                            height={197}
                        /> */}
                    </div>

                </Container>
                <div className={cls.HomePage__card}>

                    {
                        data && data?.map(e => (
                            <div className={cls.HomePage__card__card}>
                                <h2 className={cls.HomePage__card__card__title}>{e?.count}</h2>
                                <p className={cls.HomePage__card__card__text}>User percentage: {e?.percentage}</p>
                                <p className={cls.HomePage__card__card_role}>{e?.type}</p>
                            </div>
                        ))
                    }
                </div>
                <div className={cls.HomePage__chart}>
                    <div className={cls.HomePage__chart__wrap}>
                        <h3 className={cls.HomePage__chart__title}>JLPT certificate</h3>
                        <p className={cls.HomePage__chart__text}>If you do what you've always done, you'll get what you've always gotten.</p>
                        <div className={cls.HomePage__test__wrap} >
                            <div>
                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N1 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N1}
                                </div>
                                <p className={cls.HomePage__test_test} >N1</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N2 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N2}
                                </div>
                                <p className={cls.HomePage__test_test}>N2</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N3 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N3}
                                </div>
                                <p className={cls.HomePage__test_test} >N3</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N4 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N4}
                                </div>
                                <p className={cls.HomePage__test_test} >N4</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test} style={{ borderBottom: `${Math.round((((JLPT?.N5 / maxValue) * 100) / 100) * 185) || 2}px solid #5627DC` }}>
                                    {JLPT?.N5}
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
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`} style={{ borderBottom: `${Math.round((((JLPT?.N1 / maxValue) * 100) / 100) * 185) || 2}px solid #DC7E27` }}>
                                    {JDU?.Q1}
                                </div>
                                <p className={cls.HomePage__test2_test}>Q1</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`} style={{ borderBottom: `${Math.round((((JLPT?.N2 / maxValue) * 100) / 100) * 185) || 2}px solid #DC7E27` }}>
                                    {JDU?.Q2}
                                </div>
                                <p className={cls.HomePage__test2_test}>Q2</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`} style={{ borderBottom: `${Math.round((((JLPT?.N3 / maxValue) * 100) / 100) * 185) || 2}px solid #DC7E27` }}>
                                    {JDU?.Q3}
                                </div>
                                <p className={cls.HomePage__test2_test}>Q3</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}`} style={{ borderBottom: `${Math.round((((JLPT?.N4 / maxValue) * 100) / 100) * 185) || 2}px solid #DC7E27` }}>
                                    {JDU?.Q5}
                                </div>
                                <p className={cls.HomePage__test2_test}>Q4</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
