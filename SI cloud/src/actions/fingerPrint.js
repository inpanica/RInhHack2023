import axios from 'axios';


export const postFp = async (content) => {
    try{
        const response = await axios.post('http://85.192.41.43/hshapi/',{
            fp: content
        })
        return response
    }

    catch (e){
        return e.response
    }

}

export const setUserInfo = async (name, fp) => {
    try{
        const response = await axios.post('http://85.192.41.43/userapi/',{
            username: name,
            fp: fp
        })
        return response
    }
    catch(e){
        return e.response
    }
}