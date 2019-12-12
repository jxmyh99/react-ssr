import React from 'react'
import { Route } from 'react-router-dom'
import Index from './page/Index'
import About from './page/About'

export default (
  <div>
    <Route path='/' exact component={Index} />
    <Route path='/about' exact component={About} />
  </div>
)
