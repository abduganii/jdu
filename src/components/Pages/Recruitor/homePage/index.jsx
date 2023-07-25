import Container from '../../../UL/container'
import TopStudents from '../../../UL/topStudents'


import cls from "./homePage.module.scss"

export default function HomePage({ data, role, count }) {
    return (
        <>
            <div className={cls.HomePage} >
                <Container className={cls.HomePage__container} >
                    <h2 className={cls.HomePage__title}>雇用主ワークブック</h2>
                    <p className={cls.HomePage__text}>会社のマニュアルを作成します。会社に関するすべてを追加しま。</p>
                    <div className={cls.HomePage__img}>
                        <img
                            src={'/Image/image1.png'}
                            alt='img'

                            width={269}
                            height={197}
                        />
                    </div>
                </Container>
            </div>
            <TopStudents students={data} role={role} count={count} />
        </>
    )
}
