
import BlueButtun from '../../UL/buttun/blueBtn'
import CancelBtn from '../../UL/buttun/cancel'
import Container from '../../UL/container'
import { eyeOpenIcons, eyeCloseIcons, UploadIcons } from '../../UL/icons'
import SettingsInput from '../../UL/input/settingsInput'
import BackBtn2 from '../../UL/buttun/backBtns'

import React from 'react'
import { useState } from 'react'
import cls from "./Settings.module.scss"
import { useNavigate } from 'react-router-dom'

export default function SettingsPage() {
    const router = useNavigate()
    const [curPass, setcurPass] = useState('password')
    const [eyeicons, setEyeicons] = useState(true)
    const [eyeicons1, setEyeicons1] = useState(true)
    const [eyeicons2, setEyeicons2] = useState(true)
    const [newPass, setnewPass] = useState('password')
    const [conPass, setconPass] = useState('password')
    return (
        <Container className={cls.SettingsPage__container}>
            <div className={cls.SettingsPage__top}>
                <div className={cls.SettingsPage__top__div}>
                    <BackBtn2 onClick={() => router(-1)} />
                    <h3 className={cls.SettingsPage__top__name}>Jerome Bell</h3>
                </div>
                <div className={cls.SettingsPage__top__div}>
                    <CancelBtn onClick={() => router(-1)}>
                        Cancel
                    </CancelBtn>
                    <BlueButtun  >Save changes</BlueButtun>
                </div>

            </div>
            <div className={cls.SettingsPage__form}>
                <label className={cls.SettingsPage__upload} >
                    <img
                        src={"/Image/Ellipse08.png"}
                        width={150}
                        height={150}
                        alt="img"

                    />
                    <input className={cls.SettingsPage__upload__file} type="file" />
                    <div className={cls.SettingsPage__upload__icon}>  <UploadIcons /> </div>
                </label>
                <div className={cls.SettingsPage__inputs}>
                    <SettingsInput label={"Full name"} placeholder={"Full name"} type={"text"} onChange={(e) => console.log(e.target.value)} />
                    <div className={cls.SettingsPage__inputs__div}>
                        <SettingsInput label={"Company"} placeholder={"Company"} type={"text"} onChange={(e) => console.log(e.target.value)} />
                        <SettingsInput label={"Phone Number"} placeholder={"998 "} type={"number"} onChange={(e) => console.log(e.target.value)} />
                    </div>
                    <SettingsInput label={"E-mail"} placeholder={"E-mail"} type={"email"} onChange={(e) => console.log(e.target.value)} />

                </div>
            </div>

            <div className={cls.SettingsPage__aboutMe}>
                <h3 className={cls.SettingsPage__aboutMe__title}>About me</h3>
                <p className={cls.SettingsPage__aboutMe__text}>Featuring a private sandy beach, 5-star Atlantis Hotel is located in Dubai's Palm Jumeirah. The hotel offers stunning views of the Persian Gulf. The hotel has an underwater aquarium. Guests also have free access to Aquaventure Water Park and Lost Chambers Aquarium. The exquisite boutiques and shops at the hotel have everything you need for a relaxing holiday.</p>
            </div>
            <p className={cls.SettingsPage__passsword}>password</p>
            <div className={cls.SettingsPage__passsword__wrap}>
                <SettingsInput
                    style={{ maxWidth: "205px" }}
                    label={"Current Password"}
                    placeholder={"Current Password"}
                    type={curPass}
                    icon={eyeOpenIcons()}
                    icon2={eyeCloseIcons()}
                    eyeOpen={eyeicons}
                    eyeClick={(e) => {
                        setcurPass(state => state == "password" ? "text" : "password")
                        setEyeicons(!eyeicons)

                    }}
                    onChange={(e) => console.log(e.target.value)} />
                <div className={cls.SettingsPage__passsword__div}>
                    <SettingsInput
                        style={{ maxWidth: "205px" }}
                        label={"New password"}
                        placeholder={"New password"}
                        type={newPass}
                        icon={eyeOpenIcons()}
                        icon2={eyeCloseIcons()}
                        eyeOpen={eyeicons1}
                        eyeClick={(e) => {
                            setnewPass(state => state == "password" ? "text" : "password")
                            setEyeicons1(!eyeicons1)
                        }}
                        onChange={(e) => console.log(e.target.value)}
                    />
                    <SettingsInput
                        style={{ maxWidth: "205px" }}
                        label={"Confirm Password"}
                        placeholder={"Confirm Password"}
                        icon={eyeOpenIcons()}
                        icon2={eyeCloseIcons()}
                        eyeOpen={eyeicons2}
                        eyeClick={(e) => {
                            setconPass(state => state == "password" ? "text" : "password")
                            setEyeicons2(!eyeicons2)
                        }}
                        type={conPass}
                        onChange={(e) => console.log(e.target.value)} />

                </div>
            </div>
        </Container>
    )
}
