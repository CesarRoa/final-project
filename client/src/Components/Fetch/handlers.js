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

export const FetchData = async (target, username, year, month) =>{
    try{
        const url = `/api/addHistory/${username}/${year}/${month}`
        const res = await fetch (url,{
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify(target)
        });
        const responseBody = await res.json();
        console.log('Server Response:', responseBody);
        if(res.status === 200){
            return "success"
        }else{
            console.log(res, target, username, year, month)
        }
    }
    catch(err){
        console.log(err)
    }
}