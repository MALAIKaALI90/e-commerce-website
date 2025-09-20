import React from 'react'
import UserMenu from '../components/UserMenu'
import MyAddress from '../pages/MyAddress'
import MyOrders from '../pages/MyOrders'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
  <section>
    <div>
    {/**left menu */}

<UserMenu/>

    {/*right for contnet */}
<Outlet/>
    </div>
  </section>
  )
}

export default Dashboard
