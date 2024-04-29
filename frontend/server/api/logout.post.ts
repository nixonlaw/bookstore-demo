export default defineEventHandler(async (event) => {
    try {
        const response = await $fetch.raw(`${process.env.BACKEND_URL}/user/logout`,{
            method: "POST",
            withCredentials: true
        });

        const cookies = (response?.headers.get('set-cookie') || '').split(',');

        for(const cookie of cookies) {
            appendHeader(event, 'set-cookie', cookie);
        }

        return {status: 200, message: 'logged out successfully'};
        
    } catch (e) {
        console.error(e);

        return {status: 500, message: 'internal error'}
    }
})