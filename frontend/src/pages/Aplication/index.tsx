import { DashboardContainer } from "../../components/DashBoard/ContentContainer";
import { DashboardContentContainer } from "../../components/DashBoard/Container";
import AplicationContent from "../../components/AplicationContent";

export default function Aplication() {
    return (
        <DashboardContainer>
            <DashboardContentContainer>
                <AplicationContent />
            </DashboardContentContainer>
        </DashboardContainer>
    )
}