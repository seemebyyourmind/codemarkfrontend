import { createBrowserRouter } from "react-router-dom";
import PageTitle from "../components/PageTitle";

import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
// import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Profile from "../pages/ProfilePage/Profile";
import Order from "../pages/ProfilePage/Order";
import PetAdopt from "../pages/ProfilePage/PetAdopt";
import PetAdoptRequire from "../pages/ProfilePage/PetAdoptRequire";
import UpdateProfile from "../pages/ProfilePage/UpdateProfile";
// import ProductType from "../components/Products/ProductType";

import PetProduct from "../components/Products/PetProduct";
import StuffProduct from "../components/Products/StuffProduct";

import PetProductDetail from "../components/Products/PetProduct/PetProductDetail";
import StuffProductDetail from "../components/Products/StuffProduct/StuffProductDetail";
import AdminDashboard from "../pages/Admin/AdminDashboard";


// import UserManager from "../components/Admin/User/UserManager";

import PrivateRouter from "../components/PrivateRouter/PrivateRouter";

import UserManager from "../pages/Admin/User/UserManager"
import DashBoard from "../pages/Admin/Dashboard"

//import admin/user
// import SearchUser from '../pages/Admin/User/SearchUser'
import UpdateUser from '../pages/Admin/User/UpdateUser'
import UserDetail from '../pages/Admin/User/UserDetail'
import UserList from '../pages/Admin/User/UserList'
import CodeExcute from "../pages/Admin/User/CodeExcute";

//userdetail
import InfoUser from "../components/Admin/User/Info";
import GroupUser from "../components/Admin/User/Group";
import SubmitUser from "../components/Admin/User/Submit";

//problem
import ProblemManager from "../pages/Admin/Problem/ProblemManager";
import ProblemAdd from "../pages/Admin/Problem/ProblemAdd";
import ProblemList from "../pages/Admin/Problem/ProblemList";
import ProblemDetail from "../pages/Admin/Problem/ProblemDetail";
import InfoProblem from "../components/Admin/Problem/Info"
import DetailProblem from "../components/Admin/Problem/Detail"
import TestCaseProblem from "../components/Admin/Problem/TestCase"
import SubmitProblem from "../components/Admin/Problem/Submit"


//group
import GroupManager from "../pages/Admin/Group/GroupManager";
import GroupAdd from "../pages/Admin/Group/GroupAdd";
import GroupList from "../pages/Admin/Group/GroupList";
import GroupDetail from "../pages/Admin/Group/GroupDetail";
import UserGroup from "../components/Admin/Group/User"
import ProblemGroup from "../components/Admin/Group/Problem"
import InfoGroup from "../components/Admin/Group/Info";


//submit 

import SubmitManager from "../pages/Admin/Submit/SubmitManager";
import SubmitList from "../pages/Admin/Submit/SubmitList";
import SubmitDetail from "../pages/Admin/Submit/SubmitDetail";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ProductPage /> },
      {
        path: "productpage",
        element: <ProductPage />,
        children: [
          // { index: true, element: <ProductType /> },
          {
            path: "pet/:specieid/",
            element: <PetProduct />,
          },
          {
            path: "pet/:specieid/:id",
            element: <PetProduct />,
          },
          {
            path: "stuff/:catalogid/:id",
            element: <StuffProduct />,
          },
          {
            path: "stuff/:catalogid/",
            element: <StuffProduct />,
          },
        ],
      },
      {
        path: "orderpage",
        element: <OrderPage />,
      },
      {
        path: "petdetail/:id",
        element: <PetProductDetail />,
      },
      {
        path: "stuffdetail/:id",
        element: <StuffProductDetail />,
      },
    ],
  },
  {
    path: "/admin",
    element: <><PageTitle title="Admin" /><AdminDashboard allowedRoles={['admin']} /></>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <><DashBoard/></>,
        errorElement: <ErrorPage />,
      },
      { path: "user", 
        element: <><PageTitle title="UserMagager |Admin"  /><UserManager /></>,
        errorElement: <ErrorPage />,
      children:[
        { index:true, path: "userlist", 
        element: <><PageTitle title="UserMagager|ListUser |Admin"  /><UserList /></>,
        errorElement: <ErrorPage />},
        {
          path: "updateuser/:id",
          element:<><PageTitle title="UserMagager|Update|Admin"  /><UpdateUser /></> ,
          errorElement: <ErrorPage />
        },
        
        { path: "userdetail/:id", 
        element: <><PageTitle title="UserMagager|Detail |Admin"  /><UserDetail /></> ,
        errrElement: <ErrorPage />,
          children:[
            {  path: "info", 
            element: <InfoUser />,
            errrElement: <ErrorPage />,
            },
            { path: "group", 
              element: <GroupUser/>,
              errrElement: <ErrorPage />,
              },
            { path: "submit", 
                element: <SubmitUser />,
                errrElement: <ErrorPage />,
             },

          ]
        },

        // { path: "searchUser", 
        // element:  <><PageTitle title="UserMagager|ListUserw |Admin"  /><SearchUser /></>,
        // errorElement: <ErrorPage />},
        { path: "codeexcute", 
          element:  <><PageTitle title="UserMagager|ListUserw |Admin"  /><CodeExcute/></>,
          errorElement: <ErrorPage />}
      ]
        },

      { path: "problem", 
          element: <><PageTitle title="ProblemMagager|Admin"  /><ProblemManager /></>,
          errorElement: <ErrorPage />,
          children:[
            { path: "list", 
            element: <ProblemList />,
            errrElement: <ErrorPage />,
            },
            { path: "add", 
              element: <ProblemAdd />,
              errrElement: <ErrorPage />,
             },
            { path: "problemdetail/:id", 
                element: <><PageTitle title="UserMagager|Detail |Admin"  /><ProblemDetail/></> ,
                errrElement: <ErrorPage />,
                  children:[
                    {  path: "info", 
                    element: <InfoProblem />,
                    errrElement: <ErrorPage />,
                    },
                    { path: "detail", 
                      element: <DetailProblem />,
                      errrElement: <ErrorPage />,
                      },
                    { path: "submit", 
                        element: <SubmitProblem />,
                        errrElement: <ErrorPage />,
                     },
                     { path: "testcase", 
                      element: <TestCaseProblem />,
                      errrElement: <ErrorPage />,
                   },
        
                  ]
                },
           
          ]
      },
      { path: "group", 
        element: <><PageTitle title="GroupMagager|Admin"  /><GroupManager /></>,
        errorElement: <ErrorPage />,
        children:[
          { path: "list", 
          element: <GroupList />,
          errrElement: <ErrorPage />,
          },
          { path: "add", 
            element: <GroupAdd/>,
            errrElement: <ErrorPage />,
            },
          { path: "detail/:id", 
              element: <GroupDetail/>,
              errrElement: <ErrorPage />,
              children:[
                {  path: "members", 
                element: <UserGroup />,
                errrElement: <ErrorPage />,
                },
                { path: "problems", 
                  element: <ProblemGroup />,
                  errrElement: <ErrorPage />,
                  },
                  { path: "info", 
                    element: <InfoGroup />,
                    errrElement: <ErrorPage />,
                    },
                
    
              ]
            },
         

        ]
    },
      { path: "submit", 
        element: <SubmitManager />,
        errorElement: <ErrorPage />,
        children:[
          { path: "list", 
          element: <SubmitList />,
          errrElement: <ErrorPage />,
          },
          { path: "detail/:id", 
            element: <SubmitDetail/>,
            errrElement: <ErrorPage />,
            },

        ]
      },  
    { path: "detail", 
      element: <SubmitDetail />,
      errorElement: <ErrorPage />,
      },
      { path: "dashboard", 
        element: <DashBoard />,
        errorElement: <ErrorPage />,
        },
      
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: <PrivateRouter allowedRoles={['user']} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "petadopt",
        element: <PetAdopt />,
      },
      {
        path: "petrequire",
        element: <PetAdoptRequire />,
      },
      {
        path: "updateprofile",
        element: <UpdateProfile />,
      },
    ],
  },
]);
export default router;
