import {toast} from 'react-toastify';

export function handleerror(msz){
    toast.error(msz,{
        position:'top-right',
        autoClose:5000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
    })
}

export function handlesuccess(msz){
    toast.success(msz,{
        position:'top-right',
        autoClose:5000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
    })
}