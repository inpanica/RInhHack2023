import axios from 'axios';


export const postFp = async (content) => {
    try{
        const response = await axios.post('http://190.115.29.135/hshapi/',{
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
        const response = await axios.post('http://190.115.29.135/userapi/',{
            username: name,
            fp: fp
        })
        return response
    }
    catch(e){
        return e.response
    }
}