import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'
export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    //para este método será necessário um middleware para fazer esperar o promise do axios, por ser async

    return (dispatch, getState) => {
        //pegar o valor da descrição na própria store
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : "";
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({ type: 'TODO_SEARCHED', payload: resp.data}))
    }

    // antigo necessário trazer a descrição (usando o promise somente)
    // const search = description ? `&description__regex=/${description}/` : "";
    // const request = axios.get(`${URL}?sort=-createdAt${search}`)
    // return {
    //     type: 'TODO_SEARCHED',
    //     payload: request
    // }
}

export const add = description => {
    //por causa do middleware THUNK agora usamos direto o dispatch para controlar as requisições
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const markAsDone = todo => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispatch(search()))
    }
}


export const markAsPending = todo => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispatch(search()))
    }
}

export const remove = todo => {
    //thunk
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    //multi
    return [
        {type: 'TODO_CLEAR'},
        search()
    ]
}