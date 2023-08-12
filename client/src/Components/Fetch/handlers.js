export const FetchUser = async (target) =>{
    const username = target.username;
    const password = target.password;
    try{
        const url = `/api/signin/${username}`;
        const res = await fetch (url);
        if (res.status === 200){
            const result = await res.json()
            return result
        }else{
            throw new Error('Invalid Username')
        }
    }
    catch (err){
        console.log(err)
    }
}

