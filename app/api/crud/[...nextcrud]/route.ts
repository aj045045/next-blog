import { NextRequest } from 'next/server'
import { PrismaAdapter } from '@premieroctet/next-crud'
import NextCrud from '@premieroctet/next-crud'
import prisma from '@/lib/prisma'

const handler = async (req: NextRequest): Promise<unknown> => {
    try {
        const nextCrudHandler = await NextCrud({
            adapter: new PrismaAdapter({
                prismaClient: prisma,
            }),
        })
        return nextCrudHandler(req)
    } catch (error) {
        console.error('NextCrud handler error:', error)
        return new Response('Internal Server Error', { status: 500 })
    }
}

// Export for all HTTP methods
export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
