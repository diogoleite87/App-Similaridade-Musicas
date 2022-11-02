import { Route, Routes } from 'react-router-dom'
import Aplication from './pages/Aplication'
import Home from './pages/Home'
import Rating from './pages/Rating'
import AdminPage from './pages/AdminPage'

export function Router() {

    return (
        <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Aplication />} path="/aplication" />
            <Route element={<Rating />} path="/rating" />
            <Route element={<AdminPage />} path="/adminpage" />
        </Routes>
    )
}