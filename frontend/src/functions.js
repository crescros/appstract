import axios from "axios"
import { useLocation } from "react-router-dom"

const baseUrl = process.env.REACT_APP_APPSTRACT_URL;
// const baseUrl = "http://localhost:3016";

// DRAWINGS
export function postDrawing(data) {
    return axios({
        data: data,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        url: baseUrl + "/api/drawings"
    })
}

export function getDrawings(page) {
    return axios({
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET",
        url: baseUrl + "/api/drawings?page=" + page
    }).then(data => {
        return data
    })
}

export function removeDrawing(id) {
    return axios({
        data: {"id":id}, 
        headers: {
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        url: baseUrl + "/api/drawings"
    }).then(data => {
        return data
    })
}

// BACKGROUNDS
function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export function getCurrentBackgroundId(){

    let query = useQuery()
    
    let backgroundId = query.get("background")
    
    if (!backgroundId) backgroundId = "none"

    return backgroundId
}

export function getBackgroundUrlFromId(id){

    if (!id) return ''

    return `./img/background-${id}.png`
}
