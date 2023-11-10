import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import MainLayout from '../components/Layouts/Main'
import DecanHome from '../app/Decan/home'
import DecanStudent from '../app/Decan/students'
import DecanRecruitor from '../app/Decan/recruitor'
import Login from '../app/auth/login'
import DecanRecruitorBuId from '../app/Decan/recruitor/id'

import Settings from '../app/settings'
import Help from '../app/Help'
import RecHome from '../app/Recruitor/home'
import RecStudent from '../app/Recruitor/student'
import OneStudent from '../components/Pages/Student/OneStuden'
import RecSeelctStudent from '../app/Recruitor/selectedStudent'
import OnePerson from '../components/Pages/OnePerson'

import SetStudentpage from '../app/Decan/students/set'
import StudentById from '../app/Decan/students/id'
import { TopStudentsGet } from '../services/student'
import { GetMe } from '../services/me'
import Logout from '../app/auth/logout'
import LoginNewPage from '../components/Pages/NewPassword'

import toast from 'react-hot-toast'
import StudentHome from '../app/Student/home'
import StudentMe from '../app/Student/Me'
import StuDStudentById from '../app/Student/id'
import DecanGroups from '../app/Decan/Groups'
import DecEmployees from '../app/Decan/Employees'
import DecParents from '../app/Decan/Parents/indx'
import TeacherHome from '../app/Teacher/home'
import TecherGruop from '../app/Teacher/gruop'
import Teachertudent from '../app/Teacher/students'
import DecanPerantBuId from '../app/Decan/Parents/id'
import DecanEmloyBuId from '../app/Decan/Employees/id'
import ParentHome from '../app/Parant/home'

export default function AppRouter() {
    const [topStudent, setTopStudent] = useState([])
    const [user, setUser] = useState()
    const [count, setCount] = useState()
    const router = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            await GetMe()
                .then(res => {
                    setUser(res?.data)
                    if (router?.pathname == '/') {
                        navigate(`/${res?.data?.role}/home`)
                    }
                })
                .catch(err => {
                    navigate("/auth/login")

                })
        }
        if (router?.pathname != '/auth/login' && router?.pathname != '/auth/logout' && router?.pathname != '/password-reset') {
            fetchData()
        }

    }, [router]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await TopStudentsGet();
            setTopStudent(res?.rows)
            setCount(res?.count)
        }
        if (user) {
            fetchData()
        }
    }, [user])
    console.log(user)

    return (
        <Routes>
            <Route path="/" element={<MainLayout user={user} />}  >
                <Route path="/decan/home" element={< DecanHome data={topStudent} role={user?.role} count={count} />} />
                <Route path="/decan/groups/students/:id" element={< DecanStudent />} />
                <Route path="/decan/students/:id" element={< StudentById role={user?.role} />} />
                <Route path="/decan/studentsSet/:id" element={< SetStudentpage />} />
                <Route path="/decan/groups" element={< DecanGroups />} />
                <Route path="/decan/recruitors" element={< DecanRecruitor />} />
                <Route path="/decan/recruitors/:id" element={< DecanRecruitorBuId />} />
                <Route path="/decan/employees" element={< DecEmployees />} />
                <Route path="/decan/employees/:id" element={< DecanEmloyBuId />} />

                <Route path="/decan/parents" element={< DecParents />} />
                <Route path="/decan/parents/:id" element={< DecanPerantBuId />} />

                <Route path="/recruitor/home" element={<RecHome data={topStudent} user={user} count={count} />} />
                <Route path="/recruitor/students" element={<RecStudent data={topStudent} role={user?.role} count={count} />} />
                <Route path="/recruitor/students/:id" element={<StudentById />} />
                <Route path="/recruitor/selected" element={<RecSeelctStudent data={topStudent} role={user?.role} count={count} />} />

                <Route path="/student/home" element={<StudentHome data={topStudent} user={user} count={count} />} />
                <Route path="/student/me" element={<StudentMe user={user} />} />
                <Route path="/student/students/:id" element={<StuDStudentById />} />

                <Route path="/parent/home" element={<ParentHome data={topStudent} user={user} count={count} />} />
                <Route path="/parent/myChild" element={<StudentMe user={user?.Students?.[0]} />} />
                <Route path="/parent/students/:id" element={<StuDStudentById />} />

                <Route path="/teacher/home" element={<TeacherHome data={topStudent} user={user} count={count} />} />
                <Route path="/teacher/groups" element={< TecherGruop role={"teacher"} />} />
                <Route path="/teacher/groups/students/:id" element={< Teachertudent role={"teacher"} />} />
                <Route path="/teacher/students/:id" element={<StuDStudentById />} />


                <Route path="/staff/home" element={<TeacherHome data={topStudent} role={user?.role} count={count} />} />
                <Route path="/staff/groups" element={< TecherGruop role={"staff"} />} />
                <Route path="/staff/groups/students/:id" element={< Teachertudent role={"staff"} />} />
                <Route path="/staff/students/:id" element={<StuDStudentById />} />


                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
            </Route>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/logout" element={<Logout />} />
            <Route path="/password-reset" element={<LoginNewPage />} />

        </Routes>
    )
}
