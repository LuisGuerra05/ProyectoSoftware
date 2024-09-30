-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS tienda_camisetas;
USE tienda_camisetas;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  team VARCHAR(100),
  brand VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla para almacenar imágenes de los productos
CREATE TABLE IF NOT EXISTS product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  image_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);


-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',  -- Estado del pedido (pendiente, completado, etc.)
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Crear tabla de detalles del pedido (relacionar productos y pedidos)
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,  -- Precio del producto al momento del pedido
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Crear tabla de carritos (un carrito por usuario)
CREATE TABLE IF NOT EXISTS carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,  -- El usuario dueño del carrito
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Crear tabla de detalles del carrito (productos en el carrito)
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT,
  product_id INT,
  quantity INT NOT NULL,  -- Cantidad de productos agregados al carrito
  FOREIGN KEY (cart_id) REFERENCES carts(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);



-- FC Barcelona

-- Camiseta Local
INSERT INTO products (name, team, price, stock, brand)
VALUES ('Camiseta Local 2024-2025', 'FC Barcelona', 19.99, 100, 'Nike');
-- Obtener el ID del producto
SET @product_id = LAST_INSERT_ID();
-- Insertar las imágenes para el producto
INSERT INTO product_images (product_id, image_url)
VALUES 
(@product_id, '/images/Barca/Local/Barca_Local_24_1.jpg'),
(@product_id, '/images/Barca/Local/Barca_Local_24_2.jpg'),
(@product_id, '/images/Barca/Local/Barca_Local_24_3.jpg'),
(@product_id, '/images/Barca/Local/Barca_Local_24_4.jpg'),
(@product_id, '/images/Barca/Local/Barca_Local_24_5.jpg');

-- Camiseta Visita
INSERT INTO products (name, team, price, stock, brand)
VALUES ('Camiseta Visita 2024-2025', 'FC Barcelona', 17.99, 100, 'Nike');
SET @product_id = LAST_INSERT_ID();
INSERT INTO product_images (product_id, image_url)
VALUES 
(@product_id, '/images/Barca/Visita/Barca_Visita_24_1.jpg'),
(@product_id, '/images/Barca/Visita/Barca_Visita_24_2.jpg'),
(@product_id, '/images/Barca/Visita/Barca_Visita_24_3.jpg'),
(@product_id, '/images/Barca/Visita/Barca_Visita_24_4.jpg'),
(@product_id, '/images/Barca/Visita/Barca_Visita_24_5.jpg');

-- Atlético de Madrid

-- Camiseta Local
INSERT INTO products (name, team, price, stock, brand)
VALUES ('Camiseta Local 2024-2025', 'Atlético de Madrid', 19.99, 100, 'Nike');
SET @product_id = LAST_INSERT_ID();
INSERT INTO product_images (product_id, image_url)
VALUES 
(@product_id, '/images/Atletico/Local/Atletico_Local_24_1.jpg'),
(@product_id, '/images/Atletico/Local/Atletico_Local_24_2.jpg'),
(@product_id, '/images/Atletico/Local/Atletico_Local_24_3.jpg'),
(@product_id, '/images/Atletico/Local/Atletico_Local_24_4.jpg');

-- Camiseta Visita
INSERT INTO products (name, team, price, stock, brand)
VALUES ('Camiseta Visita 2024-2025', 'Atlético de Madrid', 17.99, 100, 'Nike');
SET @product_id = LAST_INSERT_ID();
INSERT INTO product_images (product_id, image_url)
VALUES 
(@product_id, '/images/Atletico/Visita/Atletico_Visita_24_1.jpg'),
(@product_id, '/images/Atletico/Visita/Atletico_Visita_24_2.jpg'),
(@product_id, '/images/Atletico/Visita/Atletico_Visita_24_3.jpg'),
(@product_id, '/images/Atletico/Visita/Atletico_Visita_24_4.jpg'),
(@product_id, '/images/Atletico/Visita/Atletico_Visita_24_5.jpg');

-- Real Madrid

-- Camiseta Local
INSERT INTO products (name, team, price, stock, brand)
VALUES ('Camiseta Local 2024-2025', 'Real Madrid', 19.99, 100, 'Adidas');
SET @product_id = LAST_INSERT_ID();
INSERT INTO product_images (product_id, image_url)
VALUES 
(@product_id, '/images/Madrid/Local/Madrid_Local_24_1.jpg'),
(@product_id, '/images/Madrid/Local/Madrid_Local_24_2.jpg'),
(@product_id, '/images/Madrid/Local/Madrid_Local_24_3.jpg'),
(@product_id, '/images/Madrid/Local/Madrid_Local_24_4.jpg');

-- Camiseta Visita
INSERT INTO products (name, team, price, stock, brand)
VALUES ('Camiseta Visita 2024-2025', 'Real Madrid', 17.99, 100, 'Adidas');
SET @product_id = LAST_INSERT_ID();
INSERT INTO product_images (product_id, image_url)
VALUES 
(@product_id, '/images/Madrid/Visita/Madrid_Visita_24_1.jpg'),
(@product_id, '/images/Madrid/Visita/Madrid_Visita_24_2.jpg'),
(@product_id, '/images/Madrid/Visita/Madrid_Visita_24_3.jpg'),
(@product_id, '/images/Madrid/Visita/Madrid_Visita_24_4.jpg');

-- Athletic de Bilbao

-- Camiseta Local
INSERT INTO products (name, team, price, stock, brand)
VALUES ('Camiseta Local 2024-2025', 'Athletic de Bilbao', 19.99, 100, 'Castore');
SET @product_id = LAST_INSERT_ID();
INSERT INTO product_images (product_id, image_url)
VALUES 
(@product_id, '/images/Bilbao/Local/Bilbao_Local_24_1.jpg'),
(@product_id, '/images/Bilbao/Local/Bilbao_Local_24_2.jpg'),
(@product_id, '/images/Bilbao/Local/Bilbao_Local_24_3.jpg'),
(@product_id, '/images/Bilbao/Local/Bilbao_Local_24_4.jpg'),
(@product_id, '/images/Bilbao/Local/Bilbao_Local_24_5.jpg');

-- Camiseta Visita
INSERT INTO products (name, team, price, stock, brand)
VALUES ('Camiseta Visita 2024-2025', 'Athletic de Bilbao', 17.99, 100, 'Castore');
SET @product_id = LAST_INSERT_ID();
INSERT INTO product_images (product_id, image_url)
VALUES 
(@product_id, '/images/Bilbao/Visita/Bilbao_Visita_24_1.jpg'),
(@product_id, '/images/Bilbao/Visita/Bilbao_Visita_24_2.jpg'),
(@product_id, '/images/Bilbao/Visita/Bilbao_Visita_24_3.jpg'),
(@product_id, '/images/Bilbao/Visita/Bilbao_Visita_24_4.jpg'),
(@product_id, '/images/Bilbao/Visita/Bilbao_Visita_24_5.jpg');
