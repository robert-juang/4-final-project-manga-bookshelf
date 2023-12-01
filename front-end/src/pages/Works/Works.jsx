import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import MangaInfo from "../../components/Elements/MangaInfo/MangaInfo"

import "./Works.css"

function Works() {
    const [data, setData] = useState([])
    const {mangaId} = useParams()
    const [user, setUser] = useState({})
    const [reading, setReading] = useState([])
    const [done, setDone] = useState([])
    const [want, setWant] = useState([])

    useEffect(() => {
        async function fetchData() {
            // try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/manga/search2/id/${encodeURIComponent(mangaId)}`)
                const data1 = await response.json()
                setData([data1])
                
                const myHeaders = new Headers();
    
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
            
                const response3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/protected/user/get/currentuser/`, {
                method: "GET",
                headers: myHeaders
                })
                const data3 = await response3.json()
                console.log(data3)
                setUser(data3.user)

            // } catch (error) {
            //     console.log('Error fetching manga info data:', error)
            // }
        
        }

        fetchData()
        console.log(user)
        
    }, [mangaId])

    return (
        <div className="Works-main">
            <MangaInfo mangaData={data} userData={user}/>
        </div>
    )
}



export default Works