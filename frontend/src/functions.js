import axios from "axios"
import { useLocation } from "react-router-dom"

const baseUrl = process.env.NODE_ENV === "development" ? " http://localhost:3016" : process.env.REACT_APP_APPSTRACT_URL


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
        console.log(data)
        return data
    })
}

export function removeDrawing(id) {
    return axios({
        data: { "id": id },
        headers: {
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        url: baseUrl + "/api/drawings"
    }).then(data => {
        return data
    })
}

// RATINGS 

export function getRating(drawing_id) {
    return axios({
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET",
        url: baseUrl + "/api/ratings?id=" + drawing_id
    }).then(data => {

        const result = {
            "average": data.data[0]["AVG(value)"],
            "count": data.data[0]["COUNT(value)"]
        }

        return result
    })
}

export function postRating(drawing_id, rating) {

    const postData = {
        "drawing_id": drawing_id,
        "rating": rating
    }

    console.log(postData)

    return axios({
        data: postData,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        url: baseUrl + "/api/ratings"
    })
}

// BACKGROUNDS
function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export function getCurrentBackgroundId() {

    let query = useQuery()

    let backgroundId = query.get("background")

    if (!backgroundId) backgroundId = "none"

    return backgroundId
}

export function getBackgroundUrlFromId(id) {

    if (!id) return ''

    return `./img/background-${id}.png`
}

// DOM
export function getScreenWidth() {
    return window.innerWidth - 22
}