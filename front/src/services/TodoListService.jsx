import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getLists = async () => {
    try {
        return await axios({
            url: `${baseUrl}/lists`,
            method: 'GET'
        })
    } catch (err) {
        console.error(err);
    }
}

export const deleteList = async (id) => {
    try {
        return await axios({
            url: `${baseUrl}/${id}/list`,
            method: 'DELETE'
        })
    } catch (err) {
        console.error(err);
    }
}

export const updateList = async (request) => {
    try {
        return await axios({
            url: `${baseUrl}/list`,
            method: 'PUT',
            data: JSON.stringify(request),
            headers: {'Content-Type': 'application/json'}
        })
    } catch (err) {
        console.error(err);
    }
}

export const addList = async (request) => {
    try {
        return await axios({
            url: `${baseUrl}/list`,
            method: 'POST',
            data: JSON.stringify(request),
            headers: {'Content-Type': 'application/json'}
        })
    } catch (err) {
        console.error(err);
    }
}