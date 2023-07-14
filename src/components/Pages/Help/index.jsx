
import Container from '../../UL/container'
import { MinusIcons, PlussIcons } from '../../UL/icons'
import { useState } from 'react'

import { Condition, Question } from "./data"
import cls from "./HelpPage.module.scss"

export default function HelpPage() {
    const [id, setId] = useState(Question[0].id)
    return (
        <Container className={cls.HelpPage__container}>
            <h3 className={cls.HelpPage__title}>このサイトについて</h3>
            <p className={cls.HelpPage__text}>才能のある学生を特定するのに役立ち、学生の出席状況を監視することができます。 学生に関するすべての情報を 1 か所に収集し、1 か所で確認できるようにします。 学生の教育ローンを表示および管理するのに便利です。 学生にとって、お知らせやニュースを 1 か所から配信できるのは便利です。</p>

            <h2 className={cls.HelpPage__faq}>FAQ</h2>
            <div>
                {Question?.map(e => (
                    <div key={e?.id} className={cls.HelpPage__faq__wrap} >

                        <div onClick={() => setId(state => state == e?.id ? false : e?.id)}>
                            {id == e?.id ? <div className={cls.HelpPage__faq__minus}>
                                <div></div>
                            </div> : <PlussIcons />}
                        </div>
                        <div className={cls.HelpPage__faq__right}  >
                            <h4 onClick={() => setId(state => state == e?.id ? false : e?.id)} className={cls.HelpPage__faq__title}>{e?.title}</h4>
                            {id == e?.id ? <p className={cls.HelpPage__faq__text}>{e?.text}</p> : " "}
                        </div>
                    </div>
                ))}
            </div>
            {/* <h3 className={cls.HelpPage__condition}>私たちが使用するテクノロジーとツール。</h3>
            <div className={cls.HelpPage__condition__wrap}>
                {
                    Condition?.map(e => (
                        <div className={cls.HelpPage__condition__div}>
                            <div className={cls.HelpPage__condition__left}>
                                {e?.icon}
                                <p className={cls.HelpPage__condition__title}>{e.title}</p>
                            </div>
                            <p className={cls.HelpPage__condition__text}>{e?.text}</p>
                        </div>
                    ))
                }
            </div> */}
        </Container>
    )
}
