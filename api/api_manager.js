import axios from "axios";

const apimanager = axios.create({
    baseURL:"https://cocosor-online.preview-domain.com/api",
    responseType:'json',
    withCredentials:true,
});