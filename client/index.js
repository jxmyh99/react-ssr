import React from 'react'

import ReactDom from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from '../src/App'
import { getClientStore } from '../src/store/store'
import { Provider } from 'react-redux'
import Header from '../src/component/Header'
const store = getClientStore()
const Page = (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Switch>
        {routes.map(route => <Route {...route} />)}
      </Switch>

    </BrowserRouter>
  </Provider>

)
ReactDom.hydrate(Page, document.getElementById('root'))
