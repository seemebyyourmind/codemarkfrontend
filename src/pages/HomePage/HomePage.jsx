import { Outlet, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Homepage() {
  return (
    <>
      <div id="detail" className=" px-2 py-2">
        <Navbar></Navbar>
        <ul>
          <li>
            <Link to={`orderpage`}> orderpage</Link>
          </li>
          <li>
            <Link to={`productpage`}> productpage</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
}
