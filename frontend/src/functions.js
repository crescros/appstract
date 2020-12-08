import axios from "axios"

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

export function getDrawings() {
    return axios({
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET",
        url: baseUrl + "/api/drawings"
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

export function getBackgroundUrlFromId(id){

    if (!id) return ''

    return `./img/background-${id}.png`
}
