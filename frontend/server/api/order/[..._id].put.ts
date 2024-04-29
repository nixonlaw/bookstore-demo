export default defineEventHandler(async (event) => {
    const {$fetch} = event;
    const _id = event.context.params._id;
    
    const res = await $fetch(`${process.env.BACKEND_URL}/orders/cancel/${_id}`, {
        method: "PUT",
        credentials: 'include'
    })
    .then(response=>{
        return {status: 200, message: response.message};
    })
    .catch(e=>{
        console.error(e);
        return {status: e.status, message: e.data.message};
    });
    
    return res
})