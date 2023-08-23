export const FetchUser = async (target) =>{
    try{
        const url = `/api/signin`;
        const res = await fetch (url,{
            method: "POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify(target)
        });
        if (res.status === 200){
            const result = await res.json()
            return result
        }else{
            throw new Error('Invalid Username or Password')
        }
    }
    catch (err){
        throw err
    }
}

