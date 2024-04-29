export default defineEventHandler(async (event) => {
    const {$fetch} = event;
    const body = await readBody(event);
    const res = await $fetch(`${process.env.BACKEND_URL}/orders`, {
        method: "POST",
        credentials: 'include',
        body
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