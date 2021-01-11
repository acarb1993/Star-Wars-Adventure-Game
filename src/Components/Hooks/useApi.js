// Connects to the Star Wars API, returns the data as an array

import {useState, useEffect} from "react" 

export const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
}

export const useApi = (url) => {
    const [data, setData] = useState([])
    const [state, setState] = useState(apiStates.LOADING)
    const [error, setError] = useState("")

    useEffect( () => {
        fetch(url)
            .then((resp) => resp.json())
            .then((result) => {
                // Get the total number of items from the call
                let count = result.count
                // Loop through each page and get the result
                for(var i = 1; i <= count; i++) {
                    fetch(url + i) 
                        .then( (resp) => resp.json() )
                        .then( (result) => {
                            setData(data => [...data, result])
                        })
                        .catch( () => {
                            setState(apiStates.ERROR)
                            setError("Generic Error")
                        })
                }
                setState(apiStates.SUCCESS)
            })
            .catch(() => {
                setState(apiStates.ERROR)
                setError("Generic Error")
            })
    }, [url])

    return [data, state, error]
}