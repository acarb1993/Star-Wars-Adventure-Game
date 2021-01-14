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
    
    useEffect(async () => { 
        // This makes the initial call to see how many data points there are
        let response = await fetch(url)
        if(!response.ok) { 
            setState(apiStates.ERROR)
            setError("Could not fetch URL") 
        } else {
            let result = await response.json()
            // Count is the number of data points returned from the call
            const count = result.count
            // This gets each data point individually and adds it to data
            for(let i = 1; i <= count; i++) {
                let response = await fetch(url + i)
                if(!response.ok) {
                    setState(apiStates.ERROR)
                    setError("Could not fetch individual call")
                } else {
                    let result = await response.json()
                    setData(data => [...data, result])
                }
            }
        }
        setState(apiStates.SUCCESS)
    }, [url])

    return [data, state, error]
}