import axios from "axios";
import server_url from "../define/Url";
export const FcmMessageCall = () => {

    axios.post(server_url + "/message/send", {targetToken: localStorage.getItem('token')})
        .then(res => {
            console.log(localStorage.getItem('token'))
        })
        .catch(res => console.log(res))

    // axios.get(server_url + "/message/send", {params: {targetToken: localStorage.getItem('token')}})
    //     .then(res => {
    //         console.log(res.data)
    //     })
    //     .catch(res => console.log(res))
}