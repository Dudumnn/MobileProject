import apimanager from "./api_manager";

export const user_login = async data => {
    try {
        const result = await apimanager("/login",{
            method:"POST",
            headers:{
                'content-type':'application/json',
            },
            data: data,
        });
        return result;
    } catch (error) {
        return error.response.data
    }
}