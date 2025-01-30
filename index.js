import express from "express" 
import mysql from "mysql2/promise"
import {config} from "dotenv"
config() 

const app = express()

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    paasword:process.env.PASSWORD,
    database:process.env.DATABASE
})

app.listen(3000,()=>{

    console.log('http://locallhost:3000');
})

// a. that returns all the products in the database.

app.get('/products',async(req,res)=>{
    res.json({products: await getProducts()})
})

const getProducts = async ()=>{
    let [data] = await pool.query('SELECT * FROM products')
    return data
}

 console.log(await getProducts() );



//  b. that returns a single product based on its primary key.


app.get('/products/:product_coode',async(req,res)=>{
    res.json({products: await getSingleProduct()})
    })


 const getSingleProduct = async (product_coode)=>{
     let [data] = await pool.query('SELECT * FROM products where product_coode = ?',[product_coode])
     return data 
 }
  console.log(await getSingleProduct('app') );

// c. that inserts a new product within the database.


app.post('/products/',async(req,res)=>{
    res.json({products: await getSingleProduct()})
    })

const addProducts = async (product_coode,product_name,product_price,product_quantity) =>{
    let [data] = await pool.query('insert into products(product_coode, product_name, product_price, product_quantity) values (?, ?, ?, ?)',[product_coode,product_name,product_price,product_quantity])

    return await getProducts()
}

console.log(await addProducts('len1', 'Lenovo', '3000.00', 22) )



// d. that deletes a product based on its primary key.

app.delete('/products/',async(req,res)=>{
    res.json({products: await deleteProduct()})
    })

const deleteProduct = async (product_coode) =>{
    let [data] = await pool.query(' DELETE FROM products WHERE  product_coode= ?',[product_coode]) 
    return await getProducts()
}

 console.log( await deleteProduct ('hand1'));


//  e. that updates a product based on its primary key.


app.patch('/products/',async(req,res)=>{
    res.json({products: await patchProduct()})
    })

const patchProducts = async (product_coode,product_name,product_price,product_quantity) =>{
    let [data] = await pool.query('UPDATE products SET product_name = ?, product_price = ?, product_quantity = ? WHERE product_coode = ?',  [product_coode,product_name,product_price,product_quantity])

    return await getProducts()
}

console.log( await patchProducts ("len1", "lenovo", 9000.00, 40))



//USERS

// f. that returns all the users in the database.

app.get('/users',async(req,res)=>{
    res.json({products: await getUsers()})
})

const getUsers = async ()=>{
    let [data] = await pool.query('SELECT * FROM users')
    return data
}

 console.log(await getUsers() );



//  g. that returns a single user based on its primary key.

 app.get('/users/:product_coode',async(req,res)=>{
        res.json({products: await getSingleProduct()})
        })
    
    
     const getSingleUser = async (id)=>{
         let [data] = await pool.query('SELECT * FROM users where id = ?',[id])
         return data 
     }
      console.log(await getSingleUser('2') );
    




// h. that inserts a new user within the database.

app.post('/users/',async(req,res)=>{
    res.json({users: await getUsers()})
    })

const addUsers = async ( id, email, first_name, last_name, password) =>{
    let [data] = await pool.query('insert into users(id, email, first_name, last_name, password) values (?, ?, ?, ?, ?)',[id, email, first_name, last_name, password])

    return await getUsers()
}

console.log(await addUsers('3', 'namisahadebe@gmail.com', 'Namisa', "Hadebe", "Yolanda") )



// i. that deletes a user based on its primary key.

app.delete('/users/',async(req,res)=>{
    res.json({users: await deleteUser()})
    })

const deleteUser = async (id) =>{
    let [data] = await pool.query(' DELETE FROM users WHERE id= ?',[id]) 
    return await getUsers()
}

 console.log( await deleteUser(1));



 









// }
