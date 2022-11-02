import { DashboardContainer } from "../../components/DashBoard/ContentContainer"
import { DashboardContentContainer } from "../../components/DashBoard/Container"
import HomeContent from "../../components/HomeContent"

export default function Home() {

    return (
        <DashboardContainer>
            <DashboardContentContainer>
                <HomeContent />
            </DashboardContentContainer>
        </DashboardContainer>
    )
}