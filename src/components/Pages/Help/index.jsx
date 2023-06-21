
import Container from '../../UL/container'
import { MinusIcons, PlussIcons } from '../../UL/icons'
import { useState } from 'react'

import { Condition, Question } from "./data"
import cls from "./HelpPage.module.scss"

export default function HelpPage() {
    const [id, setId] = useState(Question[0].id)
    return (
        <Container className={cls.HelpPage__container}>
            <h3 className={cls.HelpPage__title}>Creative Solutions</h3>
            <p className={cls.HelpPage__text}>So, instead of dealing with the diversity of offerings that often drives design decisions in e-commerce, this time the team had to tackle the interesting challenge of presenting a fairly innovative and highly specialized product in an emotional, compelling, and comprehensive way. It was necessary to create a design that would make the brand stand out from the crowd in an extremely competitive food market.</p>

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
            <h3 className={cls.HelpPage__condition}>Accommodation conditions</h3>
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
            </div>
        </Container>
    )
}
