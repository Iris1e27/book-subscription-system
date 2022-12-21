create table user(
    user_id int not null auto_increment primary key,
    email unique varchar(128),
    address text
);