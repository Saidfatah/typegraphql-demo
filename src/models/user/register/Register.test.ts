import { gCall } from "../../../test-utils/gcall";
import { Connection } from "typeorm";
import { testConnection } from "../../../test-utils/testcon"

let con : Connection;
beforeAll(async ()=>{
   con= await testConnection();
})


afterAll(async()=>{
   await con.close()
})

const registerMutation = `
mutation Register($input:RegisterInput!){
 register(input:$input){id}
}
`
describe('Register',()=>{
    it('create user test',async ()=>{
        const data =await gCall({
            source:registerMutation,
            variableValues:{
                input:{
                    type:"member",
                    password:"1234567",
                    email:"said_designer@outlook.com",
                    firstName:"soufezrezrfian",
                    lastName:"esmaisdfli"
                  }
            }
        })
 
        console.log( data.data)
    })
})