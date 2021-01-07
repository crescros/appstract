import React, { useEffect, useState } from 'react'
import { postRating, getRating } from "../../functions"
import Rating from '@material-ui/lab/Rating';
import { Grid, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"

export default function AppstractRating({ img }) {
    const [rating, setRating] = useState(null)
    const [ratingCount, setRatingCount] = useState(0)
    const [ count, setCount ] = useState(0)
   

    const history = useHistory()

    useEffect(() => {
        (async () => {
            getRating(img.id).then(rating => {
                setRating(rating.average)
                setRatingCount(rating.count)
            })
        })()

        , [count]
    })

    function handleRate(e, newRating) {

        let value = newRating 
        if(!newRating){
            value = 5
        }
        postRating(img.id, value).then(() => {
            setCount(count + 1)
        })
    }

    return (
        < Grid container direction="column" align="center" justify="center">
            <Grid item>
                <Rating
                    value={rating}
                    onChange={handleRate}
                    max={5}
                />
            </Grid>
            <Grid item>
                <Typography>{ratingCount} ratings</Typography>
            </Grid>
        </Grid  >
    )
}
