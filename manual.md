# How start 

## 1
You must check config file in directory DB 
in username must you write your username default is root and if you have password you must add passowrd

"development": { <br>
"username": "root", <br>
"password": null, <br>
"database": "shop_megak", <br>
"host": "127.0.0.1", <br>
"dialect": "mysql" <br>
} <br>
## 2
Next you must open your client to handling your MySQL/ Mariadb (np phpMyAdmin) and created Data base name "shop_megak" (or change this in config, but you must have empty data base)

## 3 

In file server.js you must comment  this line(in manual I show how should look ile server.js  after changes)
// connect with database <br>
await sequelize.authenticate(); <--this should be 37 <br>

and uncomment this line  <br>
// Create/Reset Data base <br>
// main(); <--should be 44 <br>

# 4 

Now you must start server, don't use nodemon yet. If  you don't have any errors check in your client Data base "shop_megak". Now should be inside 6 or 7 table"
 - address
 - messages
 - orders
 - productratings 
 - productsRouter
 - sequelizemeta <-can be but don't must 
 - users

# 5
Now you must stop your server and undo change in server.js (in manual I show how should look ile server.js  after changes)

uncomment this line <br>
// connect with database <br>
//await sequelize.authenticate(); <--this should be 37 <br>

and comment this line <br>
// Create/Reset Data base <br>
 main(); <--should be 44 <br>

## 7 
Now you can star normal work witch this project, If you have any problem write to me :)


# Manual backend  endpoint

http://localhost:5000/ - do nothing drive for different routes

### Handle errors 
Actual server should catch all errors and when is problem with data or something is wrong with your request send you res.status: 500 res.json: Sorry try  later.

## 1 Register
METHOD POST

http://localhost:5000/register/ 

Routes to register.
You must send in JSON:
- name,
- lastName,
- age,
- email, <-Must be unique
- password,

In response serv send new user

## 2 Login
METHOD POST

http://localhost:5000/login/

Routes to log in .
In JSON you must send :
- email 
- password

In answer serv set cookie witch JWT

## 3 Logout
METHOD GET 

http://localhost:5000/logout/

Routes to log out.

In res serv req clear auth cookie


## 4 Address 
METHOD GET

http://localhost:5000/address/:userId/

In req.params send 
- userId

In response, endpoint send all user address 

METHOD POST

http://localhost:5000/address/

In JSON you must send :
- country,
- city,
- zipCode,
- street, 
- homeNo,
- apartmentNo,
- userId,

In response serv send new Address


METHOD PATCH

http://localhost:5000/address/

In JSON you CAN send all data, but you don't must send all :
- country,
- city,
-zipCode,
- street,
- homeNo,
- apartmentNo,
- userId,

In request serv send edit Address


METHOD DELETE

http://localhost:5000/address/

In body you must send(id = address.id)
- id

In response server send deleted address

## 5 User settings

METHOD PATCH

http://localhost:5000/user/settings

In body you send:(you dont must send all data)
- id,
- name, 
- lastName,
- age, 
- email, 
- password,

In response serv send edit user 

## 6 Search Products 

METHOD GET

http://localhost:5000/products/:page

in req.params yotu send 
- page  <-default should be 1 this param get possible change page with products list
- 
In response serv send all products from DB


METHOD GET

http://localhost:5000/name/:name

In req.params you send.
- name

In response serv send products with name %LIKE% 

METHOD GET

http://localhost:5000/price/sign/:price/:biggerOrSmaller

in req.params 2 variable 
- price should be a number
- biggerOrSmaller should be string and must be  'bigger' or 'smaller' 

Serv send products more expensive or cheaper than the price

METHOD GET

http://localhost:5000/price/compartment/:greaterThan/:lessThan

in req.params again we have 2 variables, first should be smaller ,but it's  ,don't matter
- greaterThan
- lessThan

In response serv send products with price between variable 


## 7 Message

METHOD GET

http://localhost:5000/message/:userId

In req params you send 
- userId

In request serv send user who include Send received and message

METHOD GET

http://localhost:5000/message/:shippedOrReceived/:userId

in req.params you send two parameters(
- shippedOrReceived) must be one for two keywords 
"send"  or "received"
- user id

In response serv send you message send ot received this user


METHOD GET

http://localhost:5000/message/one/:messageId

In req.params must send 
- messageId 

In response server send one message


METHOD POST

http://localhost:5000/message

In req.body you must send:

- sender, <-user ID
- recipient, <- id different user 
- title, 
- content,

In response you have send message


METHOD DELETE

http://localhost:5000/message

in req body you must send 2 variable 

- shippedOrReceived, <- keywords  'sender' or 'recipient' message stay in DB 
- messageId 


## 8 Basket 

METHOD GET

http://localhost:5000/basket

Any params
In the response server send actual basket

METHOD POST

http://localhost:5000/basket

In body you must send
- productId, 
- count <-how many product you add to basket

In the response server send actual basket

METHOD DELETE

http://localhost:5000/basket

- productId, 
-count

In the response server send actual basket

## 9 Order

METHOD GET

http://localhost:5000//order/:id

In req params you send 
- id <-userID

In the response server send array with all orders(shopping history and user can check status order)


METHOD POST

http://localhost:5000//order/

in req.body you must send:
- userId 

In response server send toPaid(how many must paid user) and order product and cleaer basket 



METHOD POST

http://localhost:5000/order/buy/now

in the req.body you must send
- productId, 
- userId, 
- count

In the response server send you object 
toPaid(how many must paid user)
order


## 10 Rating 

METHOD GET

http://localhost:5000/rating/:productId

in req.params you must send 
- productId

In response server send you all rating this product 



METHOD POST

http://localhost:5000/rating

in req.body you must send
- productId,
- userId,
- rating <- number between 1-5

In response server send you added rating


## 11 Admin User manage 

METHOD GET

http://localhost:5000/admin/users

any params in response server send you all users in

METHOD GET

http://localhost:5000/admin/users/id/:id

in req params you must send 
- id <-userId

In response server send you one user find by id


METHOD GET

http://localhost:5000/admin/users/email/:email

in req params you must send  
- email <-user email

In response server send you one user find by Email


METHOD PATCH

http://localhost:5000/admin/users/

in req.body you must send
- id, <-user to edit id
- newUserInfoObj, <-must be, object and key must be identical like in DB

And you can send yet new password:
- password,

In response server send you edited user


METHOD DELETE

http://localhost:5000/admin/users/

in req body you must send 
- id <-user id

In response server send you deleted users

## 12 Admin Orders 

METHOD GET

http://localhost:5000/admin/orders

Any params in response server send you all order


METHOD GET

http://localhost:5000/admin/orders/status/:status

In req.params you must send 
- status <--one for 4 keywords: in-progress, send, close, not-paid

In response server send you all orders witch chose status


METHOD GET

http://localhost:5000/admin/orders/users/:id

in req params you must send 
- id <--userId 

In response server send you users data witch his orders 


METHOD GET

http://localhost:5000/admin/orders/order/:id

in req params you must send 
- id <--order id 

In the response server send you one order 


METHOD PATCH

http://localhost:5000/admin/orders

In req.body you must send
- id, <-order id
- newInfoObj <-obiect witch change witch order, you write only information to change, keys must be identical witch keys from db 

In response server send you edited orrders


METHOD DELETE

http://localhost:5000/admin/orders

in req.body you must send 
- id <-order id 

In response server send you deleted order 

# 13 Admin products manage 

METHOD POST

http://localhost:5000/admin/product

In req.body you must send
- name,
- price,
- imgUrl,
- availability,
- description,

In response server send you added product 


METHOD PATCH

http://localhost:5000/admin/product

in req.body you must send
- id, <-product id 
- newProductInfoObj

In response server send you edited product 


METHOD DELETE

http://localhost:5000/admin/product

in req.body you must send 
- id <-product id

In response server send you deleted product


## 14 Head Admin user manage
this endpoint onli for head admin, head admin you get role admin end delete admin 

METHOD PATCH

http://localhost:5000//head/admin/manage

in req.body you must send
- id, <-user to edit id
- newUserInfoObj, <-must be, object and key must be identical like in DB

And you can send yet new password:
- password,

In response server send you edited user


METHOD DELETE

http://localhost:5000/head/admin/manage

in req body you must send
- id <-user id

In response server send you deleted users