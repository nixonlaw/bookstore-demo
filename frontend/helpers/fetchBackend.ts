const fetchBackend = async({method, url, body}: {method: 'GET'|'POST'|'PUT'|'DELETE', url: string, body: Object}) => {

    const headers = useRequestHeaders(['cookie'])
    
    const response = await useFetch(url, 
        {
            headers,
            method,
            server: true,
            body,
            credentials: 'include'
        }
    );

    const {status, message} = <{status: number, message: string}>response.data.value;


    return {status, message};
    
}

export default fetchBackend