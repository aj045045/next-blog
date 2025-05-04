"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, PieChart, Pie, Cell, XAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, Legend, } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, MessageSquare, ThumbsUp, Tag, ImageIcon, Bookmark, LayoutDashboard } from "lucide-react"
import { DashboardSkeleton } from "./skeleton"
import { StatsCard } from "./stats"
import useSWR from "swr"

export function DashboardWrapper() {
    const [activeTab, setActiveTab] = useState("overview")

    interface DashboardData {
        stats: {
            postsCount: number
            commentsCount: number
            reactionsCount: number
            tagsCount: number
            imagesCount: number
            bookmarksCount: number
        }
        postsPerUser: {
            id: number
            name: string
            postsCount: number
        }[]
        reactionsPerPost: {
            id: number
            title: string
            positiveCount: number
            negativeCount: number
        }[]
        tagsDistribution: {
            name: string
            count: number
        }[]
        bookmarksPerPost: {
            id: number
            title: string
            bookmarksCount: number
        }[]
        recentActivity: {
            date: string
            posts: number
            comments: number
            reactions: number
        }[]
    }

    const { data, error, isLoading } = useSWR<DashboardData>("/api/custom/u/dashboard")


    if (isLoading) return <DashboardSkeleton />
    if (error) return <div className="p-4 text-red-500">Error loading dashboard data</div>
    if (!data) return null

    // Colors for charts
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

    // Format data for charts
    const postsPerUserData = data.postsPerUser.map((user) => ({
        name: user.name,
        posts: user.postsCount,
    }))

    const reactionsPerPostData = data.reactionsPerPost.map((post) => ({
        name: post.title.length > 20 ? post.title.substring(0, 20) + "..." : post.title,
        positive: post.positiveCount,
        negative: post.negativeCount,
    }))

    const tagsData = data.tagsDistribution.map((tag, index) => ({
        name: tag.name,
        value: tag.count,
        color: COLORS[index % COLORS.length],
    }))

    const bookmarksData = data.bookmarksPerPost
        .filter((post) => post.bookmarksCount > 0)
        .map((post) => ({
            name: post.title.length > 15 ? post.title.substring(0, 15) + "..." : post.title,
            bookmarks: post.bookmarksCount,
        }))
        .sort((a, b) => b.bookmarks - a.bookmarks)
        .slice(0, 5)

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight flex space-x-10 items-center"><LayoutDashboard className="mr-2" />Dashboard</h1>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatsCard
                            title="Posts"
                            value={data.stats.postsCount}
                            icon={<FileText className="h-4 w-4" />}
                            description="Published content"
                        />
                        <StatsCard
                            title="Comments"
                            value={data.stats.commentsCount}
                            icon={<MessageSquare className="h-4 w-4" />}
                            description="User discussions"
                        />
                        <StatsCard
                            title="Reactions"
                            value={data.stats.reactionsCount}
                            icon={<ThumbsUp className="h-4 w-4" />}
                            description="Post interactions"
                        />
                    </div>

                    {/* Activity Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Posts, comments, and reactions over time</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.recentActivity}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="posts" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="reactions" stroke="#ffc658" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="content" className="space-y-6">
                    {/* Additional Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatsCard
                            title="Tags"
                            value={data.stats.tagsCount}
                            icon={<Tag className="h-4 w-4" />}
                            description="Content categories"
                        />
                        <StatsCard
                            title="Images"
                            value={data.stats.imagesCount}
                            icon={<ImageIcon className="h-4 w-4" />}
                            description="Media uploads"
                        />
                        <StatsCard
                            title="Bookmarks"
                            value={data.stats.bookmarksCount}
                            icon={<Bookmark className="h-4 w-4" />}
                            description="Saved content"
                        />
                    </div>

                    {/* Posts per User Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Posts per User</CardTitle>
                            <CardDescription>Top content creators</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ChartContainer
                                config={{
                                    posts: {
                                        label: "Posts",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={postsPerUserData}>
                                        <XAxis
                                            dataKey="name"
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => (value.length > 10 ? `${value.substring(0, 10)}...` : value)}
                                        />
                                        <Bar dataKey="posts" fill="var(--color-posts)" radius={[4, 4, 0, 0]} />
                                        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Tags Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tags Distribution</CardTitle>
                            <CardDescription>Content categorization</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={tagsData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {tagsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="engagement" className="space-y-6">
                    {/* Reactions per Post */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Reactions per Post</CardTitle>
                            <CardDescription>Positive and negative reactions</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ChartContainer
                                config={{
                                    positive: {
                                        label: "Positive",
                                        color: "hsl(var(--chart-1))",
                                    },
                                    negative: {
                                        label: "Negative",
                                        color: "hsl(var(--chart-2))",
                                    },
                                }}
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={reactionsPerPostData}>
                                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                        <Bar dataKey="positive" fill="var(--color-positive)" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="negative" fill="var(--color-negative)" radius={[4, 4, 0, 0]} />
                                        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Bookmarks per Post */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Most Bookmarked Posts</CardTitle>
                            <CardDescription>Top saved content</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ChartContainer
                                config={{
                                    bookmarks: {
                                        label: "Bookmarks",
                                        color: "hsl(var(--chart-3))",
                                    },
                                }}
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={bookmarksData} layout="vertical">
                                        <XAxis type="number" />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="bookmarks" fill="var(--color-bookmarks)" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
