
import Filter from '../../../UL/filter'
import BlueButtun from '../../../UL/buttun/blueBtn'
import cls from "./GroupsPage.module.scss"

import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlusIcon } from '../../../UL/icons'
import GroupTopList from '../../../UL/list/groupTop'
import GroupList from '../../../UL/list/grouplist'
import AddMadal from '../../../UL/madals/AddMadal'
import AddInput from '../../../UL/input/AddInput'
import DeleteMadel from '../../../UL/madals/deleteModel'

export default function GroupsPage() {
  const [openMadal, setOpenMadal] = useState(false)
  const [avatar, setAvatar] = useState()
  const [groupId, setGruopId] = useState(false)
  const [groupId1, setGrupId1] = useState()
  const router = useNavigate()
  const Lacation = useLocation()
  const query = Lacation?.search.split('?')?.[1]?.split('=')?.[1]
  return (
    <div className={cls.GroupsPage}>
      <div className={cls.GroupsPage__filter}>
        <Filter page={'group'} />
        <BlueButtun light={true} onClick={() => {
          setOpenMadal(true)
          router('?updete=false')
          // reset()


        }
        }>
          <PlusIcon />
          リクレーターを追加
        </BlueButtun>
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
        onClick={() => router('/decan/students')}

      />


      {openMadal &&
        <AddMadal
          role={`${query == 'true' ? "Update group" : "Add group"} `}
          // OnSubmit={handleSubmit(AddStudentFunc)}
          closeMadal={() => {
            setOpenMadal(false)
            setAvatar(null)
            // reset()

          }}>
          <div className={cls.GroupsPage__addInputs}>
            <AddInput
              type={"text"}
              label={"Group name"}
              placeholder={"Group name"}
              style={{ marginBottom: "10px" }}
            />
            <AddInput
              type={"select"}
              label={"Course year"}
              placeholder={"Course year"}
              style={{ marginBottom: "10px" }}
            />
            <AddInput
              type={"text"}
              label={"Faculty"}
              placeholder={"Faculty"}
              style={{ marginBottom: "10px" }}
            />
          </div>
        </AddMadal>
      }
      {
        groupId && <DeleteMadel
          id={"second year"}
          name={"2 1 D"}
          years={"20 students"}
          role={'gruop'}
          remove={async () => {
            console.log("ok")

          }}
          className={groupId ? cls.openMadal : ''}
          close={() => setGruopId(false)}
        />
      }
    </div>
  )
}
