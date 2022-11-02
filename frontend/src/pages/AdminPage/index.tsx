import { DashboardContainer } from "../../components/DashBoard/ContentContainer"
import { DashboardContentContainer } from "../../components/DashBoard/Container"
import AdminPageContent from "../../components/AdminPageContent"
import AdminPageLogin from "../../components/AdminPageLogin"
import { useState } from 'react'

export default function AdminPage() {

    const [login, setLogin] = useState<boolean>(false)
    const loginSuccess = () => setLogin(true)

    return (
        <DashboardContainer>
            <DashboardContentContainer>
                {login ? <AdminPageContent /> : <AdminPageLogin loginSuccess={loginSuccess} />}
            </DashboardContentContainer>
        </DashboardContainer>
    )
}