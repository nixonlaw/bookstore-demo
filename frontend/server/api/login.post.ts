export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const response = await $fetch.raw(`${process.env.BACKEND_URL}/user/login`, {
            method: "POST",
            body,
            credentials: 'include',
        });
        
        const cookies = (response?.headers.get('set-cookie') || '').split(',');

        for(const cookie of cookies) {
            appendHeader(event, 'set-cookie', cookie);
        }
        
        return {status: response.status, message: response._data.message}
        
    } catch (e) {
        console.error(e);

        return {status: e.status, message: e.data.message}
    }
})