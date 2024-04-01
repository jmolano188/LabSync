import NextAuth from 'next-auth'
import  CredentialsProvider  from 'next-auth/providers/credentials'
import { UserService } from '@/services/userService'
import bcrypt from 'bcrypt'
const userService = new UserService()

const authOptions ={
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "user@mail.com" },
                password: { label: "Password", type: "password", placeholder: "******", },
            },
            async authorize(credentials,req){
            const userFound = await userService.findByUniquekey(credentials.username)
            if(!userFound) return null
            const matchpassword = await bcrypt.compare(credentials.password,userFound.Password)
            if(!matchpassword) return null
            return{
                IdUser: userFound.IdUser,
                Username: userFound.Username,
                Email: userFound.Email
              } as any
            },
            
        }),
    ],
};
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}