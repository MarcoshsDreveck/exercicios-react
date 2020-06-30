import { combineReducers } from 'redux'
import todoReducer from '../todo/todoReducer'

const rootReducer = combineReducers({
    //retornar uma função
    todo: todoReducer
})

export default rootReducer