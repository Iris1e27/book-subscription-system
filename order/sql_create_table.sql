create table `order`(
    order_id int not null auto_increment primary key,
    user_id int,
    book_id int,
    book_name varchar(100),
    price float,
    quantity int,
    subscribed_at datetime
);