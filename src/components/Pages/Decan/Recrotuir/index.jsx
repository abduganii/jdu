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
import { useLocation, useNavigate } from 'react-router-dom'
import { RecruitorAdd, Recruitordelete, RecruitorGetById, RecruitorUpdate } from '../../../../services/recruter'

export default function RecruitorPage({ data, onChange }) {
    const [personId, setPersonId] = useState(false)
    const [personId1, setPersonId1] = useState()
    const [avatar, setAvatar] = useState()

    const oneStuednt = data.find(e => e.id === personId)
    const router = useNavigate()
    const Lacation = useLocation()
    const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]

    const [openMadal, setOpenMadal] = useState(false)

    const { register, handleSubmit, reset, setValue, watch } = useForm();
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
            setValue("password", res?.password)
            setValue("bio", res?.bio)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
    }

    const AddStudentFunc = async (data) => {
        const formData = new FormData()
        if (data.avatar) formData.append("avatar", data.avatar)
        formData.append("firstName", data?.firstName)
        formData.append("lastName", data?.lastName)
        formData.append("companyName", data?.companyName)
        formData.append("specialisation", data?.specialisation)
        formData.append("phoneNumber", data?.phoneNumber)
        formData.append("email", data?.email)
        formData.append("loginId", data?.loginId)
        if (data?.password) formData.append("password", data?.password)
        formData.append("bio", data?.bio)

        if (query == "true") {
            await RecruitorUpdate(formData, personId1)
                .then(res => {
                    if (res?.data?.message) {
                        toast(res?.data?.message)
                    } else if (res.status == 203) {
                        toast('recrutiar updated')
                        setOpenMadal(false)
                        onChange()
                        setAvatar(null)
                    }
                })
                .catch(err => toast(err.response.data.message))
        } else {
            await RecruitorAdd(formData)
                .then(res => {
                    if (res?.data?.message) {
                        toast(res?.data?.message)
                    } else if (res.status == 201) {
                        toast('recrutiar created')
                        setOpenMadal(false)
                        onChange()
                    }
                })
                .catch(err => toast(err.response.data.message))
        }
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
                <Filter />
                <BlueButtun onClick={() => {
                    setOpenMadal(true)
                    router('?updete=false')
                    reset()
                }
                }>
                    <PlusIcon />
                    Add Recruitor
                </BlueButtun>
            </div>
            <TopList text={["Recruitor", "Recruitor ID", "Company", "Number", "E-mail", "Actions"]} />
            {data && data?.map(e => (
                <PersonList
                    onClick={() => router(`/decan/recruitors/${e?.id}`)}
                    key={e?.id}
                    img={e?.avatar}
                    id={e?.loginId}
                    name={e?.firstName}
                    gruop={e?.companyName}
                    phone={e?.phoneNumber}
                    email={e?.email}
                    remove={() => setPersonId(e?.id)}
                    update={() => {
                        router('?updete=true')
                        setOpenMadal(true)
                        setPersonId(false)
                        setPersonId1(e?.id)
                        fitchOnePerson(e?.id)
                    }}
                />
            ))}
            {
                personId && <DeleteMadel
                    id={oneStuednt?.loginId}
                    name={`${oneStuednt?.firstName} ${oneStuednt?.lastName}`}
                    avater={oneStuednt?.avatar}
                    role={'recruitor'}
                    progress={oneStuednt?.progress}
                    years={"2years"}
                    remove={async () => {
                        await Recruitordelete(oneStuednt?.id)
                            .then(data => {
                                toast("Recruitor deleted")
                                setPersonId(false)
                                onChange()
                            }).catch(err => toast(err))

                    }}
                    className={personId ? cls.openMadal : ''}
                    close={() => setPersonId(false)}
                />
            }
            {openMadal &&
                <AddMadal
                    role={`${query == 'true' ? "Update" : "Add"} recruitors`}
                    OnSubmit={handleSubmit(AddStudentFunc)}
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
                            register={{ ...register('firstName') }}
                            type={"text"}
                            label={"Firstname"}
                            placeholder={"Firstname"}
                            value={watchedFiles?.firstName || ''}
                        />
                        <AddInput
                            register={{ ...register('lastName', { required: true }) }}
                            type={"text"}
                            label={"Lastname"}
                            placeholder={"Lastname"}
                            value={watchedFiles?.lastName || ''}
                        />
                        <AddInput
                            register={{ ...register('companyName', { required: true }) }}
                            type={"text"}
                            label={"Company name"}
                            placeholder={"Company name"}
                            value={watchedFiles?.companyName || ''}
                        />
                        <AddInput
                            register={{ ...register('specialisation', { required: true }) }}
                            type={"text"}
                            label={"Specialisation"}
                            placeholder={"Specialisation"}
                            value={watchedFiles?.specialisation || ''}
                        />
                        <AddInput
                            register={{ ...register('phoneNumber', { required: true }) }}
                            type={"text"}
                            label={"Phone number"}
                            placeholder={"Phone number"}
                            value={watchedFiles?.phoneNumber || ''}

                        />
                        <AddInput
                            register={{ ...register('email', { required: true }) }}
                            type={"text"}
                            label={"E-mail"}
                            placeholder={"E-mail"}
                            value={watchedFiles?.email || ''}

                        />
                        <AddInput
                            register={{ ...register('loginId', { required: true }) }}
                            type={"text"}
                            label={"Id"}
                            placeholder={"Id"}
                            value={watchedFiles?.loginId || ''}
                            geterat={true}
                            loginGenerate={(e) => setValue("loginId", e)}
                        />
                        <AddInput
                            register={{ ...register('password') }}
                            type={"text"}
                            label={"Password"}
                            placeholder={"Password"}
                            value={watchedFiles?.password || ''}
                            geterat={true}
                            passwordGenerate={(e) => setValue("password", e)}
                        />
                        {/* <AddInput
                            register={{ ...register('bio', { required: true }) }}
                            type={"textarea"}
                            label={"Bio"}
                            placeholder={"Bio"}
                            value={watchedFiles?.bio || ''}
                        /> */}

                    </div>
                </AddMadal>
            }
            <Toaster />
        </div >
    )
}