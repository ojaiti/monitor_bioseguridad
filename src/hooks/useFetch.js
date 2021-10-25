import { useEffect, useRef, useState } from 'react'

export const useFecth = (url) => {
    const isMounted = useRef(true)
    const [state, setState] = useState({data: null, loading: true, error: null})
    
    useEffect(() => {
        return () =>{
            isMounted.current = false
        }
    }, [])

    useEffect(() => {
        setState({data: null, loading: true, error: null})
        fetch(url)
            .then(res => res.json())
            .then( data => {
                isMounted.current ? setState({ loading: false, errors: null, data}) : console.log('Set State no se llamó')
            })
    }, [url])
    return state
}
