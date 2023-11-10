import { useEffect } from "react"
import { get } from "../setup/httpClient"

const Db = () => {



    useEffect(() => {
        get('http://localhost:1337/db').then((res) => {
            console.log(res)
        })
    },[])



    return (
        <div>
            <h1>this is Db</h1>
        </div>
    )
}



export default Db