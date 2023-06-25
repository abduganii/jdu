import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Layouts/Main'
import DecanHome from '../app/Decan/home'
import DecanStudent from '../app/Decan/students'
import DecanTeacher from '../app/Decan/Teacher'
import DecanRecruitor from '../app/Decan/recruitor'
import Login from '../app/auth/login'
import DecanRecruitorBuId from '../app/Decan/recruitor/id'
import News from '../app/News'
import OneNews from '../app/News/oneNews'
import AddNews from '../app/News/AddNews'
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

export default function AppRouter() {
    const [topStudent, setTopStudent] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await TopStudentsGet();
            setTopStudent(res?.rows)
        }
        fetchData()
            .then((err) => {
                console.log(err);
            })


    }, [])

    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route path="/decan/home" element={< DecanHome data={topStudent} />} />
                <Route path="/decan/students" element={< DecanStudent />} />
                <Route path="/decan/students/:id" element={< StudentById />} />
                <Route path="/decan/studentsSet/:id" element={< SetStudentpage />} />
                <Route path="/decan/teachers" element={< DecanTeacher />} />
                <Route path="/decan/teachers/:id" element={< OnePerson />} />
                <Route path="/decan/recruitors" element={< DecanRecruitor />} />
                <Route path="/decan/recruitors/:id" element={< DecanRecruitorBuId />} />
                <Route path="/decan/schedule" element={<></>} />
                <Route path="/decan/courses" element={<></>} />
                <Route path="/recruitor/home" element={<RecHome data={topStudent} />} />
                <Route path="/recruitor/students" element={<RecStudent data={topStudent} />} />
                <Route path="/recruitor/students/:id" element={<StudentById />} />
                <Route path="/recruitor/selected" element={<RecSeelctStudent data={topStudent} />} />
                RecStudent
                <Route path="/news" element={<News />} />
                <Route path="/newsAdd" element={<AddNews />} />
                <Route path="/news/:id" element={<OneNews />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
            </Route>
            <Route path="/auth/login" element={<Login />} />

        </Routes>
    )
}
