import { PrismaClient, Prisma } from '@prisma/client'
import { RoleEnum } from '../types/role'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'gn01792218',
    email: 'gn01792218@hotmail.com',
    password:'',
    roles:{
      create:[
        {name:RoleEnum.MEMBER},
        {name:RoleEnum.ADMIN},
        {name:RoleEnum.SUPERADMIN}
      ]
    }
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })