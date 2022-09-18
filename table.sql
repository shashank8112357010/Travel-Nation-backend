create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(255) not null,
    contactNumber varchar(20) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    status varchar(255) not null,
    role varchar(255) not null,
    UNIQUE (email)
);

create table bestofindia(
        id int primary key AUTO_INCREMENT,
        place varchar(255) not null,
        Img  varbinary(100000) not null,
		discription varchar(255) not null
);


create table packages (
        id int primary key AUTO_INCREMENT,
        image varchar(255) not null,
        package_title varchar(255) not null,
        package_type varchar(100) not null,
        rating int not null ,
        average_rating int not null,
        old_pricr float not null,
        new_price float not null,
        package_duration varchar(255) not null,
        discount int not null,
        location varchar(255) not null
)
insert into packages(image, package_title, package_type, rating, average_rating, old_price, new_price, package_duration, discount, location) values('', 'Family getaway to Ladakh', 'Executive', 5, 26, 8000.99, 5200.99, '5 Days, 4 Night' , 55, 'Leh');


insert into user(name, contactNumber, email, password, status, role) values('Admin', '+91 76070 70646', 'admin@gmail.com', 'admin', 'true', 'admin');
insert into bestofindia(place, image, description) values('Lucknow', 'https://www.pexels.com/photo/photo-of-mosque-during-daytime-337904/', 'Bara Imam bara');


create table category(
    id int not null AUTO_INCREMENT,
    name varchar(255) not null,
    primary key (id)
);


create table product(
    id int not null AUTO_INCREMENT,
    name varchar(255) not null,
    categoryId integer not null,
    description varchar(255) not null,
    price integer not null,
    status varchar(255),
    primary key (id)
);

create table enquiry(
    id int primary key AUTO_INCREMENT,
    name varchar(255) not null,
    email varchar(255) not null,
    phone varchar(255) not null,
    date varchar(255) not null,
    no_of_people int not null,
    message varchar(255) not null
);


create table bill(
    id int not null AUTO_INCREMENT,
    uuid varchar(255) not null,
    name varchar(255) not null,
    email varchar(255) not null,
    contactNumber varchar(255) not null,
    paymentMethod varchar(255) not null,
    amount int not null,
    productDetails JSON DEFAULT NULL,
    createdBy varchar(255) not null,
    primary key (id)
);


//on no body, data is going empty