import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";



export default function Homepage() {
 
  return (
    <>
      <div id="detail" className=" px-16 py-2 bg-zinc-50">
        <Navbar></Navbar>
        <hr />
        <SubNav />
        <hr />
         <Outlet /> 
      </div>
    </>
  );
}
