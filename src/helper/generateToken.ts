
import jwt from 'jsonwebtoken'
export const generateToken: any = (id: any) => {
    return jwt.sign({ id }, process.env.SECRET!)
}