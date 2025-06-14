import React from 'react'
import Header from './components/Header'
// import HomeScreen from './screens/HomeScreen'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export default function App() {
  return (
    <>
    <Header />
    <Container className='my-2'>
      <Outlet />
    </Container>
    
    </>
  )
}
