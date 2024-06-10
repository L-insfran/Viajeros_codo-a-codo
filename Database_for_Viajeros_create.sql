-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-06-05 21:12:12.536

-- tables
-- Table: Accomodation
CREATE TABLE Accomodation (
    id_accom int  NOT NULL,
    Destinations_id_destination int  NOT NULL,
    name varchar(20)  NOT NULL,
    direction varchar(50)  NOT NULL,
    description varchar(100)  NOT NULL,
    price_per_night int  NOT NULL,
    CONSTRAINT Accomodation_pk PRIMARY KEY (id_accom)
);

-- Table: Accomodation_R
CREATE TABLE Accomodation_R (
    id_AccR int  NOT NULL,
    Accomodation_id_accom int  NOT NULL,
    Reservation_id_reservation int  NOT NULL,
    checkin date  NOT NULL,
    chekout date  NOT NULL,
    CONSTRAINT Accomodation_R_pk PRIMARY KEY (id_AccR)
);

-- Table: Bus_R
CREATE TABLE Bus_R (
    id_BusR int  NOT NULL,
    Reservation_id_reservation int  NOT NULL,
    Bus_ticket_id_bt int  NOT NULL,
    passenger_count int  NOT NULL,
    CONSTRAINT Bus_R_pk PRIMARY KEY (id_BusR)
);

-- Table: Bus_ticket
CREATE TABLE Bus_ticket (
    id_bt int  NOT NULL,
    departure_date date  NOT NULL,
    arrival_date date  NOT NULL,
    price int  NOT NULL,
    Destinations_id_destination int  NOT NULL,
    CONSTRAINT Bus_ticket_pk PRIMARY KEY (id_bt)
);

-- Table: Clients
CREATE TABLE Clients (
    id_client int  NOT NULL,
    name varchar(50)  NOT NULL,
    lastname varchar(50)  NOT NULL,
    email varchar(50)  NOT NULL,
    phone_number int  NOT NULL,
    User_id_user int  NOT NULL,
    CONSTRAINT Clients_pk PRIMARY KEY (id_client)
);

-- Table: Destinations
CREATE TABLE Destinations (
    id_destination int  NOT NULL,
    name varchar(50)  NOT NULL,
    province varchar(20)  NOT NULL,
    description varchar(100)  NOT NULL,
    image varchar(100)  NOT NULL,
    category varchar(50)  NOT NULL,
    CONSTRAINT Destinations_pk PRIMARY KEY (id_destination)
);

-- Table: Plane_R
CREATE TABLE Plane_R (
    id_PlaneR int  NOT NULL,
    Reservation_id_reservation int  NOT NULL,
    Plane_ticket_id_pt int  NOT NULL,
    passanger_count int  NOT NULL,
    CONSTRAINT Plane_R_pk PRIMARY KEY (id_PlaneR)
);

-- Table: Plane_ticket
CREATE TABLE Plane_ticket (
    id_pt int  NOT NULL,
    departure_date date  NOT NULL,
    arrival_date date  NOT NULL,
    airline varchar(20)  NOT NULL,
    price int  NOT NULL,
    Destinations_id_destination int  NOT NULL,
    CONSTRAINT Plane_ticket_pk PRIMARY KEY (id_pt)
);

-- Table: Reservation
CREATE TABLE Reservation (
    id_reservation int  NOT NULL,
    Clients_id_client int  NOT NULL,
    reservation_date date  NOT NULL,
    CONSTRAINT Reservation_pk PRIMARY KEY (id_reservation)
);

-- Table: User
CREATE TABLE "User" (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    user_name INT NOT NULL,
    nombre_user VARCHAR(255) UNIQUE,
    password_user VARCHAR(255),
    role ENUM('cliente', 'administrador') NOT NULL DEFAULT 'cliente',
    last_session date NOT NULL,
    CONSTRAINT (User_pk) PRIMARY KEY (id_user)
);

-- foreign keys
-- Reference: Accomodation_Destinations (table: Accomodation)
ALTER TABLE Accomodation ADD CONSTRAINT Accomodation_Destinations
    FOREIGN KEY (Destinations_id_destination)
    REFERENCES Destinations (id_destination)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Accomodation_R_Accomodation (table: Accomodation_R)
ALTER TABLE Accomodation_R ADD CONSTRAINT Accomodation_R_Accomodation
    FOREIGN KEY (Accomodation_id_accom)
    REFERENCES Accomodation (id_accom)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Accomodation_R_Reservation (table: Accomodation_R)
ALTER TABLE Accomodation_R ADD CONSTRAINT Accomodation_R_Reservation
    FOREIGN KEY (Reservation_id_reservation)
    REFERENCES Reservation (id_reservation)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Bus_R_Bus_ticket (table: Bus_R)
ALTER TABLE Bus_R ADD CONSTRAINT Bus_R_Bus_ticket
    FOREIGN KEY (Bus_ticket_id_bt)
    REFERENCES Bus_ticket (id_bt)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Bus_R_Reservation (table: Bus_R)
ALTER TABLE Bus_R ADD CONSTRAINT Bus_R_Reservation
    FOREIGN KEY (Reservation_id_reservation)
    REFERENCES Reservation (id_reservation)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Bus_ticket_Destinations (table: Bus_ticket)
ALTER TABLE Bus_ticket ADD CONSTRAINT Bus_ticket_Destinations
    FOREIGN KEY (Destinations_id_destination)
    REFERENCES Destinations (id_destination)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Clients_User (table: Clients)
ALTER TABLE Clients ADD CONSTRAINT Clients_User
    FOREIGN KEY (User_id_user)
    REFERENCES "User" (id_user)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Plane_R_Plane_ticket (table: Plane_R)
ALTER TABLE Plane_R ADD CONSTRAINT Plane_R_Plane_ticket
    FOREIGN KEY (Plane_ticket_id_pt)
    REFERENCES Plane_ticket (id_pt)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Plane_R_Reservation (table: Plane_R)
ALTER TABLE Plane_R ADD CONSTRAINT Plane_R_Reservation
    FOREIGN KEY (Reservation_id_reservation)
    REFERENCES Reservation (id_reservation)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Plane_ticket_Destinations (table: Plane_ticket)
ALTER TABLE Plane_ticket ADD CONSTRAINT Plane_ticket_Destinations
    FOREIGN KEY (Destinations_id_destination)
    REFERENCES Destinations (id_destination)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Reservation_Clients (table: Reservation)
ALTER TABLE Reservation ADD CONSTRAINT Reservation_Clients
    FOREIGN KEY (Clients_id_client)
    REFERENCES Clients (id_client)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

