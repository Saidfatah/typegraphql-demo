import { gCall } from "../../../test-utils/gcall";
import { Connection } from "typeorm";
import { testConnection } from "../../../test-utils/testcon"
import faker from 'faker'
import { User } from "../../../entity/User";

let con : Connection;
beforeAll(async ()=>{
   con= await testConnection();
})


afterAll(async()=>{
   await con.close()
})

const registerMutation = `
mutation Register($input:RegisterInput!){
 register(input:$input){
     firstName
     lastName
     email
     type
    }
}
`
describe.skip('Register',()=>{
    it('create user test',async ()=>{
        try {
            const user = {
                type:"member",
                password:faker.internet.password(),
                email:faker.internet.email(),
                firstName:faker.name.firstName(),
                lastName:faker.name.lastName()
            }
            const response =await gCall({
                source:registerMutation,
                variableValues:{
                    input:user
                }
            })
     
            expect(response).toMatchObject({
                data:{
                    register:{
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email,
                        type:'member',
                    }
                }
            })

            const dbUser = await User.findOne({where:{email:user.email}})
            expect(dbUser).toBeDefined()
            expect(dbUser?.confirmed).toBeFalsy()
            expect(dbUser?.type).toEqual("member")
        } catch (error) {
            console.log(error)
        }
    })
})