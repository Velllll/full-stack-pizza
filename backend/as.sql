 CREATE TABLE category(
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    discription VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    discount INT NOT NULL
);

INSERT INTO category (title, img, name, discription, price, discount) values ("Pizza", "https://dodopizza-a.akamaihd.net/static/Img/Products/d30242be31454f698db2028aed954e40_292x292.jpeg", "rtyty", "Spicy pepperoni, extra portion of mozzarella, tomato sauce", 11, 20);