import React from 'react'
import ReactDOM from 'react-dom'

import App from './main/app'

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import reducers from './main/reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// aqui temos 3 chamadas de métodos diferentes que um vai pegando o resultado do outro para continuar
// apenas com o applymiddleware e promise ele vai esperar 
// automaticamente a promise ser resolvida para propogar a action para os reducers, apenas 1 promise
// multi serve para fazer várias requisições (promises) na mesma action retornando um array
// thunk serve para disparar as requisições em ordem pois o multi dispara todas ao mesmo tempo
const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("app")
);
