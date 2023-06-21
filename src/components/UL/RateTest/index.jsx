import { DownloadIcons } from '../icons'

import cls from "./rateTest.module.scss"

import { saveAs } from "file-saver";
export default function RateTest({ Listening, Reading, writing, title, text, docs }) {


    const setColor = (e) => {
        if (e >= 80) {
            return "#98CDDE"
        }
        if (e >= 50) {
            return "#AEDDC3"
        }
        if (e < 50) {
            return "#EDE8B5"
        }
    }
    const saveFile = () => {
        saveAs(
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            "example.pdf"
        );
    };


    return (
        <div className={cls.RateTest}>
            <div className={cls.RateTest__top}>
                <p className={cls.RateTest__title}>{title}</p>
                <div className={cls.RateTest__top__line}></div>
                <p className={cls.RateTest__title}>{text}</p>
            </div>
            <div className={cls.RateTest__btn}>
                <div className={cls.RateTest__btn__wrap}>
                    <div className={cls.RateTest__btn__text} style={{ background: setColor(Listening) }}>{Listening}%</div>
                    <p className={cls.RateTest__text}>Listening</p>
                </div>
                <div className={cls.RateTest__btn__wrap}>
                    <div className={cls.RateTest__btn__text} style={{ background: setColor(Reading) }}>{Reading}%</div>
                    <p className={cls.RateTest__text}>Reading</p>
                </div>
                <div className={cls.RateTest__btn__wrap}>
                    <div className={cls.RateTest__btn__text} style={{ background: setColor(writing) }}>{writing}%</div>
                    <p className={cls.RateTest__text}>writing</p>
                </div>
                <div className={cls.RateTest__Download} onClick={saveFile}>
                    <p className={cls.RateTest__Download__text}>Download Cestificate</p>
                    <DownloadIcons />
                </div>

            </div>
        </div>
    )
}
