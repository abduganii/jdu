import Container from '../../../UL/container'
import TopStudents from '../../../UL/topStudents'


import cls from "./homePage.module.scss"

export default function HomePage({ data, role, count }) {
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
                        <h2 className={cls.HomePage__card__card__title}>12639</h2>
                        <p className={cls.HomePage__card__card__text}>Attendence: 78%</p>
                        <p className={cls.HomePage__card__card_role}>Students</p>
                    </div>
                    <div className={cls.HomePage__card__card}>
                        <h2 className={cls.HomePage__card__card__title}>12639</h2>
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
                                109
                                </div>
                                <p className={cls.HomePage__test_test}>N1</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test}>
                                109
                                </div>
                                <p className={cls.HomePage__test_test}>N2</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test}>
                                109
                                </div>
                                <p className={cls.HomePage__test_test}>N3</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test}>
                                109
                                </div>
                                <p className={cls.HomePage__test_test}>N4</p>
                            </div>
                            <div>
                                <div className={cls.HomePage__test}>
                                109
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
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}` }>
                                109
                                </div>
                                <p className={cls.HomePage__test2_test}>N1</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}` }>
                                109
                                </div>
                                <p className={cls.HomePage__test2_test}>N2</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}` }>
                                109
                                </div>
                                <p className={cls.HomePage__test2_test}>N3</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}` }>
                                109
                                </div>
                                <p className={cls.HomePage__test2_test}>N4</p>
                            </div>
                            <div>
                                <div className={`${cls.HomePage__test} ${cls.HomePage__test2}` }>
                                109
                                </div>
                                <p className={cls.HomePage__test2_test}>N5</p>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
            {/* <TopStudents students={data} role={role} count={count} /> */}
        </>
    )
}
