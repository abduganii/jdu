'use client'

import { useEffect, useRef, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { SectionGet2 } from '../../../services/teacher.js'
import paramsToObject from '../../../utils/paramsToObject.js'
import BackBtn from '../buttun/backBtn/index.jsx'
import { CloseIcon, FilterIcon, LeftIcon } from '../icons.jsx'

import { filterRate, YearsRate, YearsRate1, TeacherRate, JLPT, JDU } from './data.js'

import cls from "./filter.module.scss"

export default function Filter({ page, back }) {
    const navigate = useNavigate()

    const [cahneSet, SetCahnegSet] = useState(true)
    const [inoutVal, SetInoutVal] = useState()
    const [data, SetData] = useState([])
    const [inoutVal1, SetInoutVal1] = useState()
    const [yearRateText, setRateYears] = useState("学年")
    const [JLPTText, setJLPTText] = useState("JLPT")
    const [JDUText, setJDUYears] = useState("JDU")
    const [specialisationText, setSpecialisation] = useState("部署")
    const [RateRateText, setRateRate] = useState("人気")
    const [ys, setY] = useState(false)
    const [w, setW] = useState(false)
    const [x, setX] = useState(false)
    const [h, setH] = useState(false)
    const [j, setJ] = useState(false)
    const [n, setN] = useState(false)
    const [g, setG] = useState(false)
    const y = useRef()

    const [params, setSearchParams] = useSearchParams()

    useEffect(() => {
        YearsRate.forEach(e => {
            if (e?.link == params.get('year')) {
                setRateYears(e?.text)
            }
        })
        filterRate.forEach(e => {
            if (e?.link == params.get('rate')) {
                setRateRate(e?.text)
            }
        })

        data.forEach(e => {
            if (e?.name == params.get('specialisation')) {
                setSpecialisation(e?.name)
            }
        })
        const fetchData = async () => {
            const data2 = await SectionGet2()
            SetData(data2)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })
    }, [params])

    return (
        <div className={cls.Filter}>


            <button className={`${cls.Filter__btn} ${!cahneSet || params.get('group') ? cls.Filter__btn__active : ""}`} onClick={() => {
                SetInoutVal('')
                SetInoutVal1('')
                SetCahnegSet(true)
                setSearchParams({ ...paramsToObject(params.entries()), specialisation: "", companyName: "", group: "", groups: "", jdu: "", jlpt: "", isArchive: false, Group: "", rate: "", year: "" })
                setY(false)
                setW(false)
                setH(false)
                setX(false)
                setG(false)
                setJ(false)
                setJLPTText('JLPT')
                setJDUYears('JDU')
                setN(false)
                setRateYears("学年")
                setSpecialisation("部署")
                setRateRate("人気")
            }}>
                {!cahneSet || params.get('group') ? <CloseIcon /> : <FilterIcon />}
                フィルター
            </button>
            {
                page == 'recruiter' && <>
                    <div className={cls.Filter__Select} onClick={() => {
                        setY(true)
                        setW(true)
                    }}>
                        <p className={cls.Filter__Select__p}>会社名</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${w ? "displayBlock" : "displayNone"}`}>
                            <input
                                className={cls.Filter__Select__dropdown__search}
                                type="text"
                                value={inoutVal1}
                                placeholder='入力'
                                onChange={(e) => {
                                    setSearchParams({ ...paramsToObject(params.entries()), companyName: e.target.value })
                                    SetCahnegSet(false)
                                    SetInoutVal1(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                </>
            }
            {
                page == 'group' && <>
                    <div className={cls.Filter__Select} onClick={() => {
                        setH(true)
                        setY(true)
                        setW(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{yearRateText}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            alt={"img"}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${h ? "displayBlock" : "displayNone"}`}>
                            {YearsRate?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}
                                      ${params.get('year') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setH(false)
                                        setY(false)
                                        setW(false)
                                        setSearchParams({ ...paramsToObject(params.entries()), year: e?.link })
                                        SetCahnegSet(true)
                                    }}
                                >
                                    {e.text}
                                </p>
                            ))}

                        </div>
                    </div>


                </>
            }
            {
                page == 'staff' && <>

                    <div className={cls.Filter__Select} onClick={() => {
                        setG(true)
                        setW(true)
                        setY(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{params.get('role') == "teacher" ? "先生" : params.get('role') == "staff" ? "一般の職員" : "全て"}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${g ? "displayBlock" : "displayNone"}`}>
                            {TeacherRate?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}
                                      ${params.get('role') == e?.text && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setSearchParams({ ...paramsToObject(params.entries()), role: e?.link })
                                        SetCahnegSet(true)
                                    }}
                                >
                                    {e.text}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className={cls.Filter__Select} onClick={() => {
                        setH(true)
                        setY(true)
                        setW(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{specialisationText}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${h ? "displayBlock" : "displayNone"}`}>
                            {data?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}
                                      ${params.get('specialisation') == e?.name && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setSearchParams({ ...paramsToObject(params.entries()), specialisation: e?.name })
                                        SetCahnegSet(true)
                                    }}
                                >
                                    {e.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </>
            }

            {
                page == "parent" && <>
                    <div className={cls.Filter__Select} onClick={() => {
                        setY(true)
                        setW(true)
                    }}>
                        <p className={cls.Filter__Select__p}>グループ</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${w ? "displayBlock" : "displayNone"}`}>
                            <input
                                className={cls.Filter__Select__dropdown__search}
                                type="text"
                                value={inoutVal}
                                placeholder='グループを入力'
                                onChange={(e) => {
                                    setSearchParams({ ...paramsToObject(params.entries()), groups: e.target.value })
                                    SetCahnegSet(false)
                                    SetInoutVal(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className={cls.Filter__Select} onClick={() => {
                        setH(true)
                        setY(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{yearRateText}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${h ? "displayBlock" : "displayNone"}`}>


                            {YearsRate?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}  ${params.get('year') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setH(false)
                                        setY(false)
                                        setSearchParams({ ...paramsToObject(params.entries()), year: e?.link })
                                        SetCahnegSet(false)

                                    }}

                                >
                                    {e.text}
                                </p>
                            ))
                            }

                        </div>
                    </div>


                </>
            }
            {
                page == "student" && <>
                    <div className={cls.Filter__Select} onClick={() => {
                        setY(true)
                        setW(true)
                    }}>
                        <p className={cls.Filter__Select__p}>グループ</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${w ? "displayBlock" : "displayNone"}`}>
                            <input
                                className={cls.Filter__Select__dropdown__search}
                                type="text"
                                value={inoutVal}
                                placeholder='グループを入力'
                                onChange={(e) => {
                                    setSearchParams({ ...paramsToObject(params.entries()), groups: e.target.value })
                                    SetCahnegSet(false)
                                    SetInoutVal(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className={cls.Filter__Select} onClick={() => {
                        setH(true)
                        setY(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{yearRateText}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${h ? "displayBlock" : "displayNone"}`}>


                            {YearsRate?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}  ${params.get('year') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setH(false)
                                        setY(false)
                                        setSearchParams({ ...paramsToObject(params.entries()), year: e?.link })
                                        SetCahnegSet(false)

                                    }}

                                >
                                    {e.text}
                                </p>
                            ))
                            }

                        </div>
                    </div>


                    <div className={cls.Filter__Select} onClick={() => {
                        setN(true)
                        setY(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{JLPTText}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${n ? "displayBlock" : "displayNone"}`}>
                            {JLPT?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}  ${params.get('jlpt') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setH(false)
                                        setY(false)
                                        setSearchParams({ ...paramsToObject(params.entries()), jlpt: e?.link })
                                        SetCahnegSet(false)
                                        setJLPTText(e?.link)
                                    }}
                                >
                                    {e.text}
                                </p>
                            ))}

                        </div>
                    </div>
                    <div className={cls.Filter__Select} onClick={() => {
                        setJ(true)
                        setY(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{JDUText}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${j ? "displayBlock" : "displayNone"}`}>
                            {JDU?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}  ${params.get('jdu') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setH(false)
                                        setY(false)
                                        setSearchParams({ ...paramsToObject(params.entries()), jdu: e?.link })
                                        SetCahnegSet(false)
                                        setJDUYears(e?.link)
                                    }}

                                >
                                    {e.text}
                                </p>
                            ))}

                        </div>
                    </div>
                </>
            }

            {
                page == "student2" && <>
                    <div className={cls.Filter__Select} onClick={() => {
                        setY(true)
                        setW(true)
                    }}>
                        <p className={cls.Filter__Select__p}>グループ</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${w ? "displayBlock" : "displayNone"}`}>
                            <input
                                className={cls.Filter__Select__dropdown__search}
                                type="text"
                                value={inoutVal}
                                placeholder='グループを入力'
                                onChange={(e) => {
                                    setSearchParams({ ...paramsToObject(params.entries()), groups: e.target.value })
                                    SetCahnegSet(false)
                                    SetInoutVal(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className={cls.Filter__Select} onClick={() => {
                        setH(true)
                        setY(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{yearRateText}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${h ? "displayBlock" : "displayNone"}`}>



                            {YearsRate1?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}  ${params.get('year') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setH(false)
                                        setY(false)
                                        setSearchParams({ ...paramsToObject(params.entries()), year: e?.link })
                                        SetCahnegSet(false)

                                    }}

                                >
                                    {e.text}
                                </p>
                            ))
                            }

                        </div>
                    </div>


                    <div className={cls.Filter__Select} onClick={() => {
                        setN(true)
                        setY(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{JLPTText}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${n ? "displayBlock" : "displayNone"}`}>
                            {JLPT?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}  ${params.get('jlpt') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setH(false)
                                        setY(false)
                                        setSearchParams({ ...paramsToObject(params.entries()), jlpt: e?.link })
                                        SetCahnegSet(false)
                                        setJLPTText(e?.link)
                                    }}
                                >
                                    {e.text}
                                </p>
                            ))}

                        </div>
                    </div>
                    <div className={cls.Filter__Select} onClick={() => {
                        setJ(true)
                        setY(true)
                        SetCahnegSet(false)
                    }}>
                        <p className={cls.Filter__Select__p}>{JDUText}</p>
                        <img
                            src={'/Image/Icons.svg'}
                            width={16}
                            height={16}
                            objectFit="contain"
                        />
                        <div className={`${cls.Filter__Select__dropdown} ${j ? "displayBlock" : "displayNone"}`}>
                            {JDU?.map(e => (
                                <p
                                    key={e?.id}
                                    className={`${cls.Filter__Select__dropdown__text}  ${params.get('jdu') == e?.link && cls.Filter__Select__dropdown__textActive1}`}
                                    onClick={() => {
                                        setH(false)
                                        setY(false)
                                        setSearchParams({ ...paramsToObject(params.entries()), jdu: e?.link })
                                        SetCahnegSet(false)
                                        setJDUYears(e?.link)
                                    }}

                                >
                                    {e.text}
                                </p>
                            ))}

                        </div>
                    </div>
                </>
            }
            <div ref={y} onClick={(e) => {
                if (e.target == y.current) {
                    setY(false)
                    setW(false)
                    setH(false)
                    setX(false)
                    setG(false)
                    setJ(false)
                    setN(false)
                }
            }} className={`${cls.Filter__backround} ${ys ? "displayBlock" : "displayNone"}`}></div>
        </div >
    )
}
