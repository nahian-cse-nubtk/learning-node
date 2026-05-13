import fs from 'fs';
import path from "path"
//join the file path before file read and write
const filePath = path.join(process.cwd(),'./src/database/db.json')

export const readProduct =()=>{

    const products = fs.readFileSync(filePath,"utf-8")
    return JSON.parse(products);



}