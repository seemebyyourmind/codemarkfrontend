import { Outlet ,Link , useLocation} from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'

// import { useState } from 'react'

const UserDetail=()=>{
    const location = useLocation();
    
    return(

        <>
        
        <Breadcrumb pageName='UserDetail' />
        <div className="flex flex-wrap gap-5 xl:gap-20">
            <Link
              to="./info"
              className={`inline-flex items-center justify-center rounded-full py-4 px-10 text-center font-medium  lg:px-8 xl:px-10 ${location.pathname.endsWith('/info') ? 'bg-white text-black dark:bg-slate-200' : 'bg-black text-white hover:bg-opacity-90 dark:bg-slate-500'}`}
            
            >
              Thông tin
            </Link>

            <Link
              to="./group"
              className={`inline-flex items-center justify-center rounded-full py-4 px-10 text-center font-medium  lg:px-8 xl:px-10 ${location.pathname.endsWith('/group') ? 'bg-white text-black dark:bg-slate-200' : 'bg-black text-white hover:bg-opacity-90 dark:bg-slate-500'}`}
             
            >
              Nhóm
            </Link>

            <Link
            
              to="./submit"
              className={`inline-flex items-center justify-center rounded-full py-4 px-10 text-center font-medium  lg:px-8 xl:px-10 ${location.pathname.endsWith('/submit') ? 'bg-white text-black dark:bg-slate-200' : 'bg-black text-white hover:bg-opacity-90 dark:bg-slate-500'}`}
              
              >
           
             Bài nộp
            </Link>

          </div>

        <Outlet/>
        </>
    )
}
export default UserDetail