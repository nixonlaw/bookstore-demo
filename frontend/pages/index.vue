<template>
    <div>
        <h1>Welcome to the bookstore</h1>
        <form>
            <label for="authors"><strong>Author:</strong></label>
            <input type="text" id="authors" v-model="filter.authors" />
            <br />
            <label for="title"><strong>Title:</strong></label>
            <input type="text" id="title" v-model="filter.title" />
            <br />
            <label for="rating_from"><strong>Rating:</strong></label>
            <input type="number" id="rating_from" min="0" v-model="filter.ratings[0]" />
            <label for="rating_to">to</label>
            <input type="number" id="rating_to" max="5" v-model="filter.ratings[1]" />
            <br />
            <label for="price_from"><strong>Price:</strong></label>
            <input type="number" id="rating_from" v-model="filter.price[0]" />
            <label for="price_to">to</label>
            <input type="number" id="rating_from" v-model="filter.price[1]" />
            <br />
            <strong>Categories:</strong>
            <label v-for="category in BookCategory" :key="category">
                <input type="checkbox" :value="category" v-model="filter.categories"> {{ category }}
            </label>
            <br />
            <br />
            <button type="submit" @click="filterBooks">Filter</button>
            <button @click="resetFilter">Reset</button>
        </form>
        <table id="books_table">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Price</th>
                <th></th>
            </tr>
            <tr v-for="book in booksList" :key="book._id">
                <td>{{ book.title }}</td>
                <td>{{ book.authors.sort().join(', ') }}</td>
                <td>{{ book.categories.sort().join(', ') }}</td>
                <td>{{ book.ratings }}</td>
                <td>{{ book.price }}</td>
                <td>
                    <button @click="orderNow(book)">Order now</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
    form{
        padding-bottom: 20px;

    }
</style>
    
<script setup>
    import fetchBackend from '../helpers/fetchBackend'

    const BookCategory = Object.freeze({
        Fiction: 'Fiction',
        NonFiction: 'Non-Fiction',
        Mystery: 'Mystery',
        Biography: 'Biography',
        ScienceFiction: 'Science Fiction',
        Fantasy: 'Fantasy',
        Romance: 'Romance',
        History: 'History',
        Thriller: 'Thriller',
        Horror: 'Horror',
        Poetry: 'Poetry',
        SelfHelp: 'Self-Help',
        Business: 'Business',
        Cookbooks: 'Cookbooks'
    });

    const booksList = ref([]);
    const filter = ref({
        authors: '',
        categories: [],
        title: '',
        ratings: [0, 5],
        price: [0, 9999]
    });

    const fetchBooks = async () => {
        const {message} = await fetchBackend({url: '/api/book', method: 'POST', body: {...filter.value}});
        booksList.value = message || []
    }

    await fetchBooks();

    const filterBooks = async (event) => {
        event.preventDefault();
        await fetchBooks();
    }

    const resetFilter = async(event) => {
        event.preventDefault();
        filter.value = {
            authors: '',
            categories: [],
            title: '',
            ratings: [0, 5],
            price: [0, 9999]
        };
        await fetchBooks();
    }

    const orderNow = async(book) => {
        const {status, messsage} = await fetchBackend({method: 'POST', url: '/api/order', body: [{...book, quantity: 1}]});
        if(status === 200){
            alert('Your order has been placed!');
        }else if(status===401){
            alert('Please login first')
            await navigateTo('/login');
        }else{
            alert(messsage);
        }
    }
</script>