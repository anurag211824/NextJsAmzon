import Link from 'next/link'
import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const AdminLayout = ({ children }) => {
  return (
    <div>
      <div className='bg-red-500'>fddfgdf</div>
      <div className='flex flex-col gap-2'>
            <Link href="/admin/productlist">ProductList</Link>
            <Link href="/admin/userlist">userlist</Link>
            <Link href="/admin/addproduct">userlist</Link>
          </div>
      {children}
    </div>
  )
}

export default AdminLayout