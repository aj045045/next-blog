import { Metadata } from "next";
import { DashboardWrapper } from "./wrapper";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "User Dashboard page",
}
export default function DashboardPage() {
    return <DashboardWrapper />
}