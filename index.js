import mysql from "mysql2/promise"
import {config} from "dotenv"
config() 

const pool = mysql.createPool({
    hostname:process.env.HOSTNAME,
    user:process.env.USER,
    paasword:process.env.PASSWORD,
    database:process.env.DATABASE

})

const userFunction = async ()=>{
    let [data] = await pool.query('SELECT * FROM users')
    return data
}

// console.log(await userFunction() );


 const getProducts = async ()=>{
     let [data] = await pool.query('SELECT * FROM products')
     return data 
 }
//  console.log(await getProducts() );




const deleteProducts = async (product_coode) =>{
    let [data] = await pool.query(' DELETE FROM products WHERE  product_coode= ?',[product_coode]) 
    return await getProducts()
}

//  console.log( await deleteProducts ('baro1'));

const postProducts = async (product_coode,product_name,product_price,product_quantity) =>{
    let [data] = await pool.query('insert into products(product_coode, product_name, product_price, product_quantity) values (?, ?, ?, ?)',[product_coode,product_name,product_price,product_quantity])

    return await getProducts()
}

// console.log(await postProducts('burg1', 'Burger', '2500.00', 12) )


const patchProducts = async (product_coode,product_name,product_price,product_quantity) =>{
    let [data] = await pool.query('UPDATE products SET product_name = ?, product_price = ?, product_quantity = ? WHERE product_coode = ?',  [product_coode,product_name,product_price,product_quantity])

    return await getProducts()
}

  console.log(await patchProducts('burg1', 'Smash Burger', 2500.00, 12));
