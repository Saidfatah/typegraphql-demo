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
    if(con && con.close)
     await con.close()
})

const meQuery = `
{
 me{
     id
     firstName
     lastName
     email
     type
    }
}
`
describe.only('Me',()=>{
    it('get user test',async ()=>{
        try {
            const user =await User.create(
                {
                password:faker.internet.password(),
                email:faker.internet.email(),
                firstName:faker.name.firstName(),
                lastName:faker.name.lastName(),
                type:'member'
                }
            ).save()
            const response =await gCall({
                source:meQuery,
                userId:user.id,
                userType:'member'
            })
            expect(response).toMatchObject(
                {
                    data:{
                        me:{
                            id:`${user.id}`,
                            firstName:user.firstName,
                            lastName:user.lastName,
                            email:user.email,
                            type:'member',//default value
                        }
                    }
                }
            )
       
        } catch (error) {
            console.log(error)
        }
    })
    it('return null when user is not in context',async ()=>{
        try {
            const response =await gCall({
                source:meQuery,
            })
            expect(response).toMatchObject(
                {
                    data:{
                        me:null
                    }
                }
            )
       
        } catch (error) {
            console.log(error)
        }
    })
})