-- Crate new database
CREATE DATABASE angular_pizza;

USE angular_pizza;

CREATE TABLE category(
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    discription VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    discount INT NOT NULL
);

CREATE TABLE mainimgurls(
    url_id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL
);

-- Set main img 
INSERT INTO mainimgurls(url) values("https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F06%2F15%2Fmozzarella-pizza-margherita-FT-RECIPE0621.jpg") 
-- Add product 
-- You also can add product from admin panel
INSERT INTO category(title, img, name, discription, price, discount) values("Pizza", "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F06%2F15%2Fmozzarella-pizza-margherita-FT-RECIPE0621.jpg", "Pepperoni", "PepperoniPepperoniPepperoni", 11, 20);

CREATE TABLE users(
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);