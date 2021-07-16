# layout db
    user
        user_id  
        fisrt name
        last name
        phone number
        email
        password


    product 
        product_id VR
        product_title VR
        product_price number
        product_sold default 0

    cart 
        product_id
        user_id

    login
    register
    get info user for user
    get info user for host
    update user info
    
    get product page 
    add product
    update product
    delete product 

    add cart
    delete cart
    update cart 

    




CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(40) NOT NULL PRIMARY KEY,
    first_name VARCHAR(10) NOT NULL,
    last_name VARCHAR(10) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    hash_password VARCHAR(30) NOT NULL,
    UNIQUE(email)
)

CREATE TABLE IF NOT EXISTS products (
    product_id VARCHAR(40) NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    price NUMERIC NOT NULL,
    sold INT DEFAULT 0
)

CREATE TABLE IF NOT EXISTS carts (
    cart_id VARCHAR(40) NOT NULL PRIMARY KEY,
    user_id VARCHAR(40) REFERENCES users(user_id),
    product_id VARCHAR(40) REFERENCES products(product_id) 
)



