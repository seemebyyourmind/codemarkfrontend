import { Outlet, Link, useLocation } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'

const GroupDetail = () => {
    const location = useLocation();
    
    return (
        <>
        <Breadcrumb pageName={`Chi tiết nhóm${  JSON.stringify(import.meta.env)}`}/>
        <div className="flex flex-wrap gap-5 xl:gap-20">
            <Link
              to="./info"
              className={`inline-flex items-center justify-center rounded-full py-4 px-10 text-center font-medium lg:px-8 xl:px-10 ${location.pathname.endsWith('/info') ? 'bg-white text-black dark:bg-slate-200' : 'bg-black text-white hover:bg-opacity-90 dark:bg-slate-500'}`}
            >
              Thông tin
            </Link>

            <Link
              to="./members"
              className={`inline-flex items-center justify-center rounded-full py-4 px-10 text-center font-medium lg:px-8 xl:px-10 ${location.pathname.endsWith('/members') ? 'bg-white text-black dark:bg-slate-200' : 'bg-black text-white hover:bg-opacity-90 dark:bg-slate-500'}`}
            >
             Thành viên
            </Link>

            <Link
              to="./problems"
              className={`inline-flex items-center justify-center rounded-full py-4 px-10 text-center font-medium lg:px-8 xl:px-10 ${location.pathname.endsWith('/problems') ? 'bg-white text-black dark:bg-slate-200' : 'bg-black text-white hover:bg-opacity-90 dark:bg-slate-500'}`}
            >
             Bài tập
            </Link>
            
           
        </div>

        <Outlet/>
        </>
    )
}

export default GroupDetail
