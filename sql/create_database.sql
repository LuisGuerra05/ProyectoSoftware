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
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  image_url VARCHAR(255),  -- Aquí agregamos una columna para la URL de la imagen del producto
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- FC Barcelona - Insertar imágenes de camisetas de local, visita, tercera, cuarte y portero 

-- Camiseta Local
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025', 'FC Barcelona', 19.99, 100, '/images/Barca/Local/Barca_Local_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (2)', 'FC Barcelona', 19.99, 100, '/images/Barca/Local/Barca_Local_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (3)', 'FC Barcelona', 19.99, 100, '/images/Barca/Local/Barca_Local_24_3.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (4)', 'FC Barcelona', 19.99, 100, '/images/Barca/Local/Barca_Local_24_4.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (5)', 'FC Barcelona', 19.99, 100, '/images/Barca/Local/Barca_Local_24_5.jpg');

-- Camiseta Visita
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025', 'FC Barcelona', 17.99, 100, '/images/Barca/Visita/Barca_Visita_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (2)', 'FC Barcelona', 17.99, 100, '/images/Barca/Visita/Barca_Visita_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (3)', 'FC Barcelona', 17.99, 100, '/images/Barca/Visita/Barca_Visita_24_3.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (4)', 'FC Barcelona', 17.99, 100, '/images/Barca/Visita/Barca_Visita_24_4.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (5)', 'FC Barcelona', 17.99, 100, '/images/Barca/Visita/Barca_Visita_24_5.jpg');

-- Camiseta Tercera
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Tercera 2024-2025', 'FC Barcelona', 17.99, 100, '/images/Barca/Tercera/Barca_Tercera_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Tercera 2024-2025 (2)', 'FC Barcelona', 17.99, 100, '/images/Barca/Tercera/Barca_Tercera_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Tercera 2024-2025(3)', 'FC Barcelona', 17.99, 100, '/images/Barca/Tercera/Barca_Tercera_24_3.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Tercera 2024-2025 (4)', 'FC Barcelona', 17.99, 100, '/images/Barca/Tercera/Barca_Tercera_24_4.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Tercera 2024-2025 (5)', 'FC Barcelona', 17.99, 100, '/images/Barca/Tercera/Barca_Tercera_24_5.jpg');

-- Camiseta Cuarta
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Cuarta 2024-2025', 'FC Barcelona', 17.99, 100, '/images/Barca/Cuarta/Barca_Cuarta_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Cuarta 2024-2025 (2)', 'FC Barcelona', 17.99, 100, '/images/Barca/Cuarta/Barca_Cuarta_24_2.jpg');

-- Camiseta Portero
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Portero 2024-2025', 'FC Barcelona', 14.99, 100, '/images/Barca/Portero/Barca_Portero_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Portero 2024-2025 (2)', 'FC Barcelona', 14.99, 100, '/images/Barca/Portero/Barca_Portero_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Portero 2024-2025 (3)', 'FC Barcelona', 14.99, 100, '/images/Barca/Portero/Barca_Portero_24_3.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Portero 2024-2025 (4)', 'FC Barcelona', 14.99, 100, '/images/Barca/Portero/Barca_Portero_24_4.jpg');



-- Atlético de Madrid - Insertar imágenes de camisetas de local, visita, tercera y portero 

-- Camiseta Local
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025', 'Atlético de Madrid', 19.99, 100, '/images/Atletico/Local/Atletico_Local_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (2)', 'Atlético de Madrid', 19.99, 100, '/images/Atletico/Local/Atletico_Local_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (3)', 'Atlético de Madrid', 19.99, 100, '/images/Atletico/Local/Atletico_Local_24_3.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (4)', 'Atlético de Madrid', 19.99, 100, '/images/Atletico/Local/Atletico_Local_24_4.jpg');

-- Camiseta Visita
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025', 'Atlético de Madrid', 17.99, 100, '/images/Atletico/Visita/Atletico_Visita_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (2)', 'Atlético de Madrid', 17.99, 100, '/images/Atletico/Visita/Atletico_Visita_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (3)', 'Atlético de Madrid', 17.99, 100, '/images/Atletico/Visita/Atletico_Visita_24_3.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (4)', 'Atlético de Madrid', 17.99, 100, '/images/Atletico/Visita/Atletico_Visita_24_4.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (5)', 'Atlético de Madrid', 17.99, 100, '/images/Atletico/Visita/Atletico_Visita_24_5.jpg');

-- Camiseta Tercera
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Tercera 2024-2025', 'Atlético de Madrid', 17.99, 100, '/images/Atletico/Tercera/Atletico_Tercera_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Tercera 2024-2025 (2)', 'Atlético de Madrid', 17.99, 100, '/images/Atletico/Tercera/Atletico_Tercera_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Tercera 2024-2025 (3)', 'Atlético de Madrid', 17.99, 100, '/images/Atletico/Tercera/Atletico_Tercera_24_3.jpg');

-- Camiseta Portero
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Portero 2024-2025', 'Atlético de Madrid', 14.99, 100, '/images/Atletico/Portero/Atletico_Portero_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Portero 2024-2025 (2)', 'Atlético de Madrid', 14.99, 100, '/images/Atletico/Portero/Atletico_Portero_24_2.jpg');



-- Real Madrid - Insertar imágenes de camisetas de local, visita, tercera y portero

-- Camiseta Local
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025', 'Real Madrid', 19.99, 100, '/images/Madrid/Local/Madrid_Local_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (2)', 'Real Madrid', 19.99, 100, '/images/Madrid/Local/Madrid_Local_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (3)', 'Real Madrid', 19.99, 100, '/images/Madrid/Local/Madrid_Local_24_3.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Local 2024-2025 (4)', 'Real Madrid', 19.99, 100, '/images/Madrid/Local/Madrid_Local_24_4.jpg');


-- Camiseta Visita
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025', 'Real Madrid', 17.99, 100, '/images/Madrid/Visita/Madrid_Visita_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (2)', 'Real Madrid', 17.99, 100, '/images/Madrid/Visita/Madrid_Visita_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (3)', 'Real Madrid', 17.99, 100, '/images/Madrid/Visita/Madrid_Visita_24_3.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (4)', 'Real Madrid', 17.99, 100, '/images/Madrid/Visita/Madrid_Visita_24_4.jpg');

-- Camiseta Tercera
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025', 'Real Madrid', 17.99, 100, '/images/Madrid/Visita/Madrid_Visita_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (2)', 'Real Madrid', 17.99, 100, '/images/Madrid/Visita/Madrid_Visita_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (3)', 'Real Madrid', 17.99, 100, '/images/Madrid/Visita/Madrid_Visita_24_3.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Visita 2024-2025 (4)', 'Real Madrid', 17.99, 100, '/images/Madrid/Visita/Madrid_Visita_24_4.jpg');

-- Camiseta Portero
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Portero 2024-2025', 'Real Madrid', 14.99, 100, '/images/Madrid/Portero/Madrid_Portero_24_1.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Portero 2024-2025 (2)', 'Real Madrid', 14.99, 100, '/images/Madrid/Portero/Madrid_Portero_24_2.jpg');
INSERT INTO products (name, team, price, stock, image_url)
VALUES ('Camiseta Portero 2024-2025 (3)', 'Real Madrid', 14.99, 100, '/images/Madrid/Portero/Madrid_Portero_24_3.jpg');




