<template>
    <div>
        <h1>Order History</h1>
        <table id="books_table">
            <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Order time</th>
                <th></th>
            </tr>
            <tr v-for="order in ordersList" :key="order._id">
                <td>{{ order._id }}</td>
                <td>{{ order.items.map(({title, quantity})=>`${title} x ${quantity}`).join("\n") }}</td>
                <td>{{ order.totalPrice }}</td>
                <td>{{ order.status }}</td>
                <td>{{ moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</td>
                <td>
                    <button @click="cancelOrder(order._id)">Cancel order</button>
                </td> 
            </tr>
        </table>
    </div>
</template>

<script setup>
    import fetchBackend from "../helpers/fetchBackend";
    import moment from 'moment'

    const ordersList = ref([]);
    
    const getOrders = async () => {
        const {message} = await fetchBackend({method: 'GET', url: '/api/order'});
        return message;
    }

    ordersList.value = await getOrders();

    const cancelOrder  = async (_id) => {
        const {status, message} = await fetchBackend({method: 'PUT', url: `/api/order/${_id}`});
        
        if(status === 200){
            const index = ordersList.value.findIndex(order=>order._id === _id);
            ordersList.value[index].status = 'Cancelled';
            alert(`Order: ${_id} is now cancelled`);
        }else{
            alert(`Order: ${_id} did not cancel, ${message}`)
        }
    }
</script>