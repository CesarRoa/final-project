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

export const FetchUpdate = async (username, date, target) => {
    const token = localStorage.getItem('token');
    try {
        const url = `/api/update/${username}/${date}`;
        const res = await fetch(url, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(target)
        });

        if (res.status === 200) {
            return `Amount update for ${date}`;
        } else if (res.status === 401) { 
            throw new Error('Unauthorized. Please login again.');
        } else {
            throw new Error('Failed to update the amount.'); 
        }
    } catch (err) {
        console.log(err);
        throw err; 
    }
};

export const FetchLatestData = async () => {
    try {
        const token = localStorage.getItem('token'); // Assuming you stored the token in localStorage under 'accessToken'
        if (!token) {
            throw new Error('No token found.');
        }

        const url = '/api/getUserData';
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token // Send token in headers for authentication
            }
        });

        if (res.status === 200) {
            const result = await res.json();
            return result.data;  // Return the user's data
        } else {
            const errData = await res.json();
            throw new Error(errData.message || 'Error fetching latest data.');
        }

    } catch (err) {
        throw err;
    }
};

export const FetchNewEntry =async(entry, username, date)=>{
    try {
        const url = `/api/addEntry/${username}/${date}`;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry)
        });

        const responseBody = await res.json();
        console.log('Server Response:', responseBody);

        if (res.status === 200) {
        } else if (res.status === 401) { 
            throw new Error('Unauthorized. Please login again.');
        } else {
            throw new Error('Failed to update the amount.'); 
        }
    } catch (err) {
        console.log(err);
        throw err; 
    }
}

export const FetchDelete = async (username, date, target) => {
    const token = localStorage.getItem('token');
    try {
        const url = `/api/delete/${username}/${date}`;
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(target)
        });

        if (res.status === 200) {
            return `Entry deleted for ${date}`;
        } else if (res.status === 401) { 
            throw new Error('Unauthorized. Please login again.');
        } else {
            throw new Error('Failed to delete the entry.'); 
        }
    } catch (err) {
        console.log(err);
        throw err; 
    }
};
