import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getTodos = async () => {
    try {
        return await axios({
            url: `${baseUrl}/todos`,
            method: 'GET'
        })
    } catch (err) {
        console.error(err);
    }
}

export const deleteTodo = async (id) => {
    try {
        return await axios({
            url: `${baseUrl}/${id}/todo`,
            method: 'DELETE'
        })
    } catch (err) {
        console.error(err);
    }
}

export const updateTodo = async (request) => {
    try {
        return await axios({
            url: `${baseUrl}/todo`,
            method: 'PUT',
            data: JSON.stringify(request),
            headers: {'Content-Type': 'application/json'}
        })
    } catch (err) {
        console.error(err);
    }
}

export const addTodo = async (request) => {
    try {
        return await axios({
            url: `${baseUrl}/todo`,
            method: 'POST',
            data: JSON.stringify(request),
            headers: {'Content-Type': 'application/json'}
        })
    } catch (err) {
        console.error(err);
    }
}

export const getTodosByListId = async (id) => {
    try {
        return await axios({
            url: `${baseUrl}/${id}/todos`,
            method: 'GET'
        })
    } catch (err) {
        console.error(err);
    }
}