export default defineEventHandler(async ({$fetch}) => {
    const res = await $fetch(`${process.env.BACKEND_URL}/user`, {
        method: "GET",
        credentials: 'include'
    })
    .then(response=>{
        return {status: 200, message: response};
    })
    .catch(e=>{
        console.error(e);
        return {status: e.status, message: e.data.message};
    });
    
    return res
})