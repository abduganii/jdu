'use client'
import BlueButtun from '@/components/UL/buttun/blueBtn'
import CancelBtn from '@/components/UL/buttun/cancel'
import Container from '@/components/UL/container'
import { DownloadIcons, LeftIcon } from '@/components/UL/icons'
import RangeInput from '@/components/UL/input/rangeInput'
import SearchSkill from '@/components/UL/input/SearchSkill'
import AddInput from '@/components/UL/input/AddInput'
import { useRouter } from 'next/navigation'
import React from 'react'
import cls from "./SetStudent.module.scss"

export default function SetStudent() {
    const router = useRouter()

    return (
        <Container className={cls.SetStudent__container} style={{ marginTop: "100px" }} >
            <div className={cls.SetStudent__top}>
                <div className={cls.SetStudent__top__Info}>
                    <button onClick={() => router.back()}>
                        <LeftIcon />
                        <p className={cls.SetStudent__top__role}>Student</p>
                    </button>

                    <h3 className={cls.SetStudent__top__fName}>Saidakhmetov Bekmurod</h3>
                </div>
                <div className={cls.SetStudent__top__btns}>
                    <CancelBtn onClick={() => router.back()}>
                        Cancel
                    </CancelBtn>
                    <BlueButtun style={{ padding: "14px 30px" }}>
                        Save changes
                    </BlueButtun>
                </div>
            </div>

            <h3 className={cls.SetStudent__lesson}>Japan Language tests</h3>
            <p className={cls.SetStudent__lesson__number}>JLPT №4</p>
            <div className={cls.SetStudent__lesson__wrap}>
                <RangeInput lessonType={"Listening"} />
                <RangeInput lessonType={"Reading"} />
                <RangeInput lessonType={"Writing"} />
                <div className={cls.SetStudent__Sertifacet}>
                    <p className={cls.SetStudent__Sertifacet__text}>Sertifacet</p>
                    <label className={cls.SetStudent__Sertifacet__Download} >
                        <p className={cls.SetStudent__Sertifacet__Download__text}>File not uploaded</p>
                        <DownloadIcons />
                        <input type="file" />
                    </label>
                </div>
            </div>
            <p className={cls.SetStudent__lesson__number} style={{ marginTop: "33px" }}>NAT Q2 №4</p>
            <div className={cls.SetStudent__lesson__wrap}>
                <RangeInput lessonType={"Listening"} />
                <RangeInput lessonType={"Reading"} />
                <RangeInput lessonType={"Writing"} />
                <div className={cls.SetStudent__Sertifacet}>
                    <p className={cls.SetStudent__Sertifacet__text}>Sertifacet</p>
                    <label className={cls.SetStudent__Sertifacet__Download} >
                        <p className={cls.SetStudent__Sertifacet__Download__text}>File not uploaded</p>
                        <DownloadIcons />
                        <input type="file" />
                    </label>
                </div>
            </div>

            <h3 className={cls.SetStudent__lesson} style={{ marginTop: "60px" }}>IT qualification</h3>

            <div className={cls.SetStudent__skill}>
                <SearchSkill label={"Soft skills"} placeholder={"write name skills"} style={{ marginBottom: "24px" }} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Hyper Text Markup language"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Cascading style sheet"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Java Script"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Vue Js"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"React JS"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Android"} />

            </div>
            <AddInput type={"textarea"} label={"Description"} placeholder={"Write here description"} style={{ marginTop: "25px" }} />
            <h3 className={cls.SetStudent__lesson} style={{ marginTop: "60px" }}> University Percentage</h3>
            <p className={cls.SetStudent__progress}>Subjects Progress</p>
            <div className={cls.SetStudent__skill}>

                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Attendee"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"IT course"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Japan language"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Sanno University"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"UzSWLUniversity"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"Co-Work"} />
                <RangeInput style={{ marginBottom: "29px" }} lessonType={"All marks"} />

            </div>
        </Container >
    )
}
