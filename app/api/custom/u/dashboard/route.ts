// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function GET() {
//     const [usersCount, postsCount, reactionsCount, postsPerUser] = await Promise.all([
//         prisma.user.count(),
//         prisma.post.count(),
//         prisma.reaction.count(),
//         prisma.user.findMany({
//             select: {
//                 id: true,
//                 name: true,
//                 _count: {
//                     select: { posts: true }
//                 }
//             }
//         })
//     ])

//     return NextResponse.json({
//         usersCount,
//         postsCount,
//         reactionsCount,
//         postsPerUser
//     })
// }


import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    try {
        // Get basic stats
        const [usersCount, postsCount, commentsCount, reactionsCount, tagsCount, imagesCount, bookmarksCount] =
            await Promise.all([
                prisma.user.count(),
                prisma.post.count(),
                prisma.comment.count(),
                prisma.reaction.count(),
                prisma.tag.count(),
                prisma.image.count(),
                prisma.bookmark.count(),
            ])

        // Get posts per user
        const postsPerUser = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        posts: true,
                    },
                },
            },
            orderBy: {
                posts: {
                    _count: "desc",
                },
            },
            take: 10,
        })

        // Get reactions per post
        const reactionsPerPost = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                reactions: {
                    select: {
                        type: true,
                    },
                },
            },
            orderBy: {
                reactions: {
                    _count: "desc",
                },
            },
            take: 10,
        })

        // Format reactions data
        const formattedReactionsPerPost = reactionsPerPost.map((post) => ({
            id: post.id,
            title: post.title,
            positiveCount: post.reactions.filter((r) => r.type === true).length,
            negativeCount: post.reactions.filter((r) => r.type === false).length,
        }))

        // Get tags distribution
        const tagsDistribution = await prisma.tag.findMany({
            select: {
                name: true,
                _count: {
                    select: {
                        posts: true,
                    },
                },
            },
            orderBy: {
                posts: {
                    _count: "desc",
                },
            },
            take: 6,
        })

        // Format tags data
        const formattedTagsDistribution = tagsDistribution.map((tag) => ({
            name: tag.name,
            count: tag._count.posts,
        }))

        // Get bookmarks per post
        const bookmarksPerPost = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                _count: {
                    select: {
                        bookmarks: true,
                    },
                },
            },
            orderBy: {
                bookmarks: {
                    _count: "desc",
                },
            },
            take: 5,
        })

        // Format bookmarks data
        const formattedBookmarksPerPost = bookmarksPerPost.map((post) => ({
            id: post.id,
            title: post.title,
            bookmarksCount: post._count.bookmarks,
        }))

        // Generate recent activity data (last 7 days)
        const today = new Date()
        const recentActivity = []

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            const formattedDate = date.toISOString().split("T")[0]

            const startDate = new Date(date)
            startDate.setHours(0, 0, 0, 0)

            const endDate = new Date(date)
            endDate.setHours(23, 59, 59, 999)

            const [dailyPosts, dailyComments, dailyReactions] = await Promise.all([
                prisma.post.count({
                    where: {
                        createdAt: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                }),
                prisma.comment.count({
                    where: {
                        createdAt: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                }),
                prisma.reaction.count({
                    where: {
                        createdAt: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                }),
            ])

            recentActivity.push({
                date: formattedDate,
                posts: dailyPosts,
                comments: dailyComments,
                reactions: dailyReactions,
            })
        }

        // Format posts per user data
        const formattedPostsPerUser = postsPerUser.map((user) => ({
            id: user.id,
            name: user.name,
            postsCount: user._count.posts,
        }))

        return NextResponse.json({
            stats: {
                usersCount,
                postsCount,
                commentsCount,
                reactionsCount,
                tagsCount,
                imagesCount,
                bookmarksCount,
            },
            postsPerUser: formattedPostsPerUser,
            reactionsPerPost: formattedReactionsPerPost,
            tagsDistribution: formattedTagsDistribution,
            bookmarksPerPost: formattedBookmarksPerPost,
            recentActivity,
        })
    } catch (error) {
        console.error("Dashboard API error:", error)
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
    }
}
