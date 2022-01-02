import { createConnection } from "typeorm"

export const testConnection = (drop:boolean=false)=>{
    return createConnection(
        {
            name:"default",
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "saidfatah",
            password: "0662177517",
            database: "typegraph-test",
            synchronize:drop,
            dropSchema:drop,
            entities:[__dirname+"/../entity/*.*"]
         }
    )
}