import { FailLogin, SuccessLogin, UserResponse } from "@/interfaces"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers:[
    CredentialsProvider({
        name:'Credential',
        credentials:{
            email:{},
            password:{},
        },
        authorize:async(credentials)=>{
            const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
                method:'POST',
                body:JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password,
                }),
                headers:{
                    'content-type':'application/json'
                }
                


            }


            )
            const payload : SuccessLogin | FailLogin=await res.json()
            console.log(payload)
            if('token' in payload){
            return {
                id:payload.user.email,
                user:payload.user,
                token:payload.token,
            }
            }
            else{
                throw new Error(payload.message)
            }
        }
    })
  ],

  callbacks:{
    jwt:({token,user})=>{
        if(user){
            token.user = user.user||user
        token.token = user.token
        }
        
        return token
    },
    session:({session,token})=>{
        session.user= token.user as UserResponse
        
        return session
    }

  },
  pages:{
    signIn:'./login',
    error:'/login'
  },
  secret:process.env.NEXTAUTH_SECRET
  

})

export { handler as GET, handler as POST }