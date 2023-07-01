import Container from '../../../UL/container'
import TopStudents from '../../../UL/topStudents'


import cls from "./homePage.module.scss"

export default function HomePage({ data, role, count }) {

    return (
        <>
            <div className={cls.HomePage} >
                <Container className={cls.HomePage__container} >
                    <h2 className={cls.HomePage__title}>Employer Workbook</h2>
                    <p className={cls.HomePage__text}>Create the company manual. Add everything about the company Create the company manual. Add everything about the company</p>
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
