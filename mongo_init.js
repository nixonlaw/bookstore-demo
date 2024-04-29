use('bookstore');

db.users.insertMany([
    {
        username: 'buyer1',
        name: 'buyer1',
        phone: '98798798',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        username: 'buyer2',
        name: 'buyer2',
        phone: '64456445',
        password: '0000',
        createdAt: new Date(),
        updatedAt: new Date()
    }
])

db.books.insertMany([
    { 
        title: 'Book 1',
        authors: [
            'M. Rowan',
            'J. Wang'
        ],
        categories: [
            'Fiction',
            'ScienceFiction'
        ],
        ratings: 3.3,
        price: 200.2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        title: 'Book 2',
        authors: [
            'M. Rowan',
            'R. Takamichi'
        ],
        categories: [
            'Fiction',
            'Fantasy'
        ],
        ratings: 5,
        price: 210,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        title: 'Book 3',
        authors: [
            'Tony Chan'
        ],
        categories: [
            'History'
        ],
        ratings: 1,
        price: 154,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);