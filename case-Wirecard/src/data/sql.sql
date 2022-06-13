CREATE TABLE user_w (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(255) NOT NULL UNIQUE
);

ALTER TABLE user_w 
    ADD COLUMN password VARCHAR(255) NOT NULL;

DESCRIBE card_w;

SELECT * FROM user_w;

CREATE TABLE card_w (
    id VARCHAR(255) PRIMARY KEY,
    number VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    expiration DATE NOT NULL,
    cvv VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_w(id)
);

SELECT * FROM card_w;

CREATE TABLE payment (
    id VARCHAR(255) PRIMARY KEY,
    amount INT NOT NULL,
    payment VARCHAR(255) NOT NULL,
    credit_card VARCHAR(255),
    payment_situation ENUM("Paid", "Waiting Payment") DEFAULT "Waiting Payment",
    id_ticket VARCHAR(255),
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user_w(id)
);

SELECT * FROM payment;

SELECT * FROM payment
WHERE user_id = "8cd2722b-1f53-483b-a9b3-e23910b83156";

DROP TABLE payment;

SELECT * FROM payment
WHERE user_id = "8cd2722b-1f53-483b-a9b3-e23910b83156";