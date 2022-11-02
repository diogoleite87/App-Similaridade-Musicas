import { DashboardContainer } from "../../components/DashBoard/ContentContainer"
import { DashboardContentContainer } from "../../components/DashBoard/Container"
import RatingContent from "../../components/RatingContent"

export default function Rating() {
    return (
        <DashboardContainer>
            <DashboardContentContainer>
                <RatingContent />
            </DashboardContentContainer>
        </DashboardContainer>
    )
}