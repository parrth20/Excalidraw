import {z} from 'zod'

export const userSignupSchema = z.object({
    username:z.string(),
    password:z.string()
    
})
export const userSigninSchema = z.object({
    username:z.string(),
    password:z.string()
    
})
export const createRoomSchema = z.object({
    name:z.string(),
    
})