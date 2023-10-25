import Filter from '../../../UL/filter'
import BlueButtun from '../../../UL/buttun/blueBtn'
import { PlusIcon } from '../../../UL/icons'
import AddInput from '../../../UL/input/AddInput'
import AvatarInput from '../../../UL/input/AvatarInput'
import PersonList from '../../../UL/list/personList'
import TopList from '../../../UL/list/TopList'
import AddMadal from '../../../UL/madals/AddMadal'
import DeleteMadel from '../../../UL/madals/deleteModel'

import React, { useState } from 'react'
import cls from "./Recruitor.module.scss"
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Loader from '../../../UL/loader'
import { useQueryClient } from 'react-query'
import ExalInput from '../../../UL/input/exal'

const PerantPage = React.forwardRef(({ data }, ref) => {
    const queryClient = useQueryClient()
    const [params] = useSearchParams()

    const [personId, setPersonId] = useState(false)
    const [personId1, setPersonId1] = useState()
    const [avatar, setAvatar] = useState()
    const [loading, setLoading] = useState(false)
    const [exal, setexal] = useState()
    // const oneStuednt = data.find(e => e.id === personId)
    const router = useNavigate()
    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]

    const [openMadal, setOpenMadal] = useState(false)


    const { register, handleSubmit, reset, clearErrors, setError, setValue, watch, formState: { errors } } = useForm();
    const watchedFiles = watch()
    const fitchOnePerson = (id) => {
        const fetchData = async () => {
            const res = await RecruitorGetById(id);
            setValue("avatar", res?.avatar)
            setValue("firstName", res?.firstName)
            setValue("lastName", res?.lastName)
            setValue("companyName", res?.companyName)
            setValue("specialisation", res?.specialisation)
            setValue("phoneNumber", res?.phoneNumber)
            setValue("email", res?.email)
            setValue("loginId", res?.loginId)
            setValue("bio", res?.bio)
        }
        fetchData()
            .then((err) => {
            })
    }

    const AddStudentFunc = async (data) => {
        setLoading(true)
        console.log(data)
    }

    const UpdateStudentFunc = async (data) => {
        console.log(data)
    }




    const hendleimg = (e) => {
        if (e.target.files[0]) {
            setValue('avatar', e.target.files[0])
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }


    return (
        <div className={cls.TeacherPage}>
            <div className={cls.TeacherPage__filter}>
                <Filter page={'recruiter'} />
                <BlueButtun light={true} onClick={() => {
                    setOpenMadal(true)
                    router('?updete=false')
                    reset()
                }
                }>
                    <PlusIcon />
                    リクレーターを追加
                </BlueButtun>
            </div>
            <TopList text={["Parents fullname", "Parent ID", "Student", "Phone", "Email", "アクション"]} />
            {/* {data && data?.map(e => ( */}
            <PersonList
                onClick={() => router(`/decan/recruitors/${"e?.id"}`)}
                key={"e?.id"}
                // img={"e?.avatar"}
                id={"e?.loginId"}
                name={"e?.firstName"}
                gruop={"e?.companyName"}
                phone={"e?.phoneNumber"}
                email={"e?.email"}
                remove={() => setPersonId("e?.id")}
                update={() => {
                    router('?updete=true')
                    setOpenMadal(true)
                    setPersonId(false)
                    setPersonId1(e?.id)
                    fitchOnePerson(e?.id)
                }}
            />
            {/* ))} */}
            <div ref={ref} style={{ padding: "10px" }}></div>
            {
                personId && <DeleteMadel
                    id={"oneStuednt?.loginId"}
                    name={`${"oneStuednt?.firstName"} ${"oneStuednt?.lastName"}`}
                    // avater={oneStuednt?.avatar}
                    role={'Parent'}
                    progress={"oneStuednt?.progress"}
                    years={"oneStuednt?.companyName"}
                    // remove={async () => {
                    //     setLoading(true)

                    // }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {openMadal && query == 'true' &&
                <AddMadal
                    role={`${query == 'true' ? "採用担当者を更新" : "採用担当者の追加"} `}
                    OnSubmit={handleSubmit(UpdateStudentFunc)}
                    style={{ maxWidth: "775px" }}
                    closeMadal={() => {
                        setOpenMadal(false)
                        setAvatar(null)
                        reset()
                    }}>
                    <AvatarInput
                        onChange={(e) => hendleimg(e)}
                        url={avatar || watchedFiles?.avatar}
                        style={{ marginBottom: '43px' }}
                    />
                    <div className={cls.TeacherPage__addInputs}>
                        <AddInput
                            register={{ ...register('firstName', { required: "名前は必要です！" }) }}
                            type={"text"}
                            label={"名前"}
                            placeholder={"名前"}
                            value={watchedFiles?.firstName || ''}
                            alert={errors.firstName?.message}
                            onChange={() => clearErrors("firstName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('lastName', { required: "名字は必要です！" }) }}
                            type={"text"}
                            label={"名字"}
                            placeholder={"名字"}
                            value={watchedFiles?.lastName || ''}
                            alert={errors.lastName?.message}
                            onChange={() => clearErrors("lastName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('companyName', { required: "会社名は必要です！" }) }}
                            type={"text"}
                            label={"会社名"}
                            placeholder={"会社名"}
                            value={watchedFiles?.companyName || ''}
                            alert={errors.companyName?.message}
                            onChange={() => clearErrors("companyName")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('specialisation', { required: "専門は必要です！" }) }}
                            type={"text"}
                            label={"専門"}
                            placeholder={"専門"}
                            value={watchedFiles?.specialisation || ''}
                            alert={errors.specialisation?.message}
                            onChange={() => clearErrors("specialisation")}
                            style={{ marginBottom: "20px" }}

                        />
                        <AddInput
                            register={{ ...register('phoneNumber', { required: "電話番号は必要です！" }) }}
                            type={"number"}
                            label={"電話番号"}
                            placeholder={"電話番号"}
                            value={watchedFiles?.phoneNumber || ''}
                            alert={errors.phoneNumber?.message}
                            onChange={() => clearErrors("phoneNumber")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('email', { required: "メールは必要です！" }) }}
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            value={watchedFiles?.email || ''}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}


                        />
                        <AddInput
                            register={{ ...register('loginId', { required: "IDは必要です！" }) }}
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            value={watchedFiles?.loginId || ''}
                            geterat={true}
                            loginGenerate={(e) => setValue("loginId", e)}
                            alert={errors.loginId?.message}
                            onChange={() => clearErrors("loginId")}
                            style={{ marginBottom: "20px" }}
                            disabled={query == "true" ? true : false}
                        />


                    </div>
                </AddMadal>
            }
            {openMadal && query == 'false' &&
                <AddMadal
                    role={`${query == 'true' ? "採用担当者を更新" : "採用担当者の追加"} `}
                    OnSubmit={handleSubmit(AddStudentFunc)}

                    closeMadal={() => {
                        setOpenMadal(false)
                        setAvatar(null)
                        reset()
                    }}> <div className={cls.TeacherPage__addInputs}>

                        <AddInput
                            register={{ ...register('loginId', { required: "IDは必要です！" }) }}
                            type={"text"}
                            label={"ID"}
                            placeholder={"ID"}
                            geterat={true}
                            loginGenerate={(e) => setValue("loginId", e)}
                            alert={errors.loginId?.message}
                            onChange={() => clearErrors("loginId")}
                            style={{ marginBottom: "20px" }}
                        />

                        <AddInput
                            register={{ ...register('email', { required: "電子メールは必要です！" }) }}
                            type={"text"}
                            label={"メール"}
                            placeholder={"メール"}
                            alert={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            style={{ marginBottom: "20px" }}
                        />
                    </div>
                    <div className={cls.TeacherPage__addInputs} style={{ alignItems: "center" }}>
                        <AddInput
                            // register={{ ...register('email', { required: "電子メールは必要です！" }) }}
                            type={"text"}
                            label={"Student ID"}
                            placeholder={"Student ID"}


                            style={{ marginBottom: "20px" }}
                        />

                        <p> name</p>
                    </div>

                    <ExalInput setResolv={setexal} resolv={exal} />
                </AddMadal>
            }
            <Toaster />

            {loading && <Loader onClick={() => setLoading(false)} />}
        </div >
    )
})

export default PerantPage;