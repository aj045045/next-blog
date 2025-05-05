import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function StatsCard(props: { title: string, value: number, icon: React.ReactElement, description: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center">{props.icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{props.value}</div>
                <p className="text-xs text-muted-foreground">{props.description}</p>
            </CardContent>
        </Card>
    )
}
