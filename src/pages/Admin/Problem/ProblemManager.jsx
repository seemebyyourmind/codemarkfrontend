import { Outlet } from "react-router-dom"
import UserInfo from "../../../components/Admin/User/UserInfo"
const ProblemManager=()=>{
  return (<div className="m-3">
  <UserInfo/>
    < Outlet/>
  </div>)
}
export default ProblemManager