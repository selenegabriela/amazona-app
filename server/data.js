import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Selene',
            email: 'sel@hotmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Panqué',
            email: 'pank@hotmail.com',
            password: bcrypt.hashSync('12345', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Programmer Hoodie',
            category: 'Hoodies',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 1,
            brand: 'Sean',
            rating: 4.5,
            numReviews: 10,
            description: 'hight quality product',
        },
        {
            name: 'Programmer shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 15,
            brand: 'Unknown',
            rating: 4,
            numReviews: 38,
            description: 'hight quality product',
        },
        {
            name: 'Programmer gap',
            category: 'Gaps',
            image: '/images/p3.jpg',
            price: 50,
            countInStock: 8,
            brand: 'Adidas',
            rating: 3.5,
            numReviews: 5,
            description: 'hight quality product',
        },
        {
            name: 'Blue jeans',
            category: 'Jeans',
            image: '/images/p4.jpg',
            price: 150,
            countInStock: 25,
            brand: 'Vans',
            rating: 5,
            numReviews: 15,
            description: 'hight quality product',
        },
        {
            name: 'Hey Arnold hoodie',
            category: 'Hoodies',
            image: '/images/p5.jpg',
            price: 200,
            countInStock: 2,
            brand: 'DC',
            rating: 5,
            numReviews: 20,
            description: 'hight quality product',
        },
        {
            name: 'Skate shoes',
            category: 'Shoes',
            image: '/images/p6.jpg',
            price: 180,
            countInStock: 0,
            brand: 'Vans',
            rating: 2.5,
            numReviews: 2,
            description: 'hight quality product',
        },
    ],
};
//hello anxiety;
export default data;