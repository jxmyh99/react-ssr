import React from 'react'

import ReactDom from 'react-dom'

import { BrowserRouter, Route } from 'react-router-dom'
import routes from '../src/App'
import { getClientStore } from '../src/store/store'
import { Provider } from 'react-redux'
import Header from '../src/component/Header'
const store = getClientStore()
const Page = (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      {routes.map(route => <Route {...route} />)}
    </BrowserRouter>
  </Provider>

)
ReactDom.hydrate(Page, document.getElementById('root'))
