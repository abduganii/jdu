
import Filter from '../../../UL/filter'
import BlueButtun from '../../../UL/buttun/blueBtn'
import cls from "./GroupsPage.module.scss"

import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GroupTopList from '../../../UL/list/groupTop'
import GroupList from '../../../UL/list/grouplist'


export default function GroupsTechPage({ role }) {

  const router = useNavigate()
  const Lacation = useLocation()
  return (
    <div className={cls.GroupsPage}>
      <div className={cls.GroupsPage__filter}>
        <Filter page={'recruiter'} />
      </div>
      <GroupTopList />

      <GroupList
        remove={() => setGruopId("121")}
        update={() => {
          router('?updete=true')
          setOpenMadal(true)
          setGruopId(false)
          setGrupId1(e?.id)
        }}
        onClick={() => router(`/${role}/students`)}

      />


    </div>
  )
}
