import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export async function POST(request) {
    try{
        const { name, email, password, role} = await request.json()
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })
        return Response.json({
           massage: 'create user ok',
           data: {
            newUser
           }
        })
    } catch (error) {
        return Response.json({
            error
        }, { status: 500 })
    }
}