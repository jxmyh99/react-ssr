import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import Index from './page/Index'
import About from './page/About'
import User from './page/User'
import NotFound from './page/NotFound'
import Member from './page/Member'
import Login from './page/Login'
import './App.css'
// export default (
//   <div>
//     <Route path='/' exact component={Index} />
//     <Route path='/about' exact component={About} />
//   </div>
// )

export default [
  {
    path: '/',
    component: Index,
    exact: true,
    key: 'index'
  },
  {
    path: '/user',
    component: User,
    exact: true,
    key: 'user'
  },
  {
    path: '/about',
    component: About,
    exact: true,
    key: 'about'
  },
  {
    path: '/member',
    component: Member,
    exact: true,
    key: 'member'
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    key: 'login'
  },
  {
    component: NotFound
  }
]
