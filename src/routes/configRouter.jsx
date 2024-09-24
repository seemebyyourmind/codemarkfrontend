import { createBrowserRouter } from "react-router-dom";
import PageTitle from "../components/PageTitle";

import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

import IntroducePage from "../pages/ProductPage/ProductPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Profile from "../pages/ProfilePage/Profile";
import Submit from "../pages/ProfilePage/Submit";

// import ProductType from "../components/Products/ProductType";


import AdminDashboard from "../pages/Admin/AdminDashboard";

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
import ProblemCategory from "../pages/Admin/Problem/ProblemCategory";
import CategoryDetail from "../pages/Admin/Problem/CategoryDetail";
import CategoryInfo from "../components/Admin/Category/Info";
import CategoryProblems from "../components/Admin/Category/Problem";

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


//user 
import GroupPage from "../pages/User/Group/Group"
import ProblemPage from "../pages/User/Problem/Problem"


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IntroducePage /> },
      {
        path: "about",
        element: <IntroducePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "group",
        element: <GroupPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "problem/:id",
        element: <ProblemPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "submit",
        element: <IntroducePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "info",
            element: <Profile />,
          },
          {
            path: "submit",
            element:  <Submit />,
          },
        
        ],
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
        errorElement: <ErrorPage />, 
          children:[
            { index: true, element:  <InfoUser />,errorElement: <ErrorPage />, },
            {  path: "info", 
            element: <InfoUser />,
            errorElement: <ErrorPage />,
            },
            { path: "group", 
              element: <GroupUser/>,
              errorElement: <ErrorPage />,
              },
            { path: "submit", 
                element: <SubmitUser />,
                errorElement: <ErrorPage />,
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
            { index: true, element:  <InfoUser />,errorElement: <ErrorPage />, },
            { path: "list", 
            element: <ProblemList />,
            errorElement: <ErrorPage />,
            },
            { path: "add", 
              element: <ProblemAdd />,
              errorElement: <ErrorPage />,
             },
             { path: "category", 
              element: <ProblemCategory />,
              errorElement: <ErrorPage />,
             },
             { path: "categorydetail/:id", 
              element: <CategoryDetail/>,
              errorElement: <ErrorPage />,
              children:[
                { index: true, element: <CategoryInfo />,errorElement: <ErrorPage />, },
                
                { path: "problems", 
                  element: <CategoryProblems />,
                  errorElement: <ErrorPage />,
                  },
                  { path: "info", 
                    element: <CategoryInfo />,
                    errorElement: <ErrorPage />,
                    },
                
    
              ]
            },
            { path: "problemdetail/:id", 
                element: <><PageTitle title="UserMagager|Detail |Admin"  /><ProblemDetail/></> ,
                errorElement: <ErrorPage />,
                  children:[
                    { index: true, element:  <InfoProblem />,errorElement: <ErrorPage />, },
                    {  path: "info", 
                    element: <InfoProblem />,
                    errorElement: <ErrorPage />,
                    },
                    { path: "detail", 
                      element: <DetailProblem />,
                      errorElement: <ErrorPage />,
                      },
                    { path: "submit", 
                        element: <SubmitProblem />,
                        errorElement: <ErrorPage />,
                     },
                     { path: "testcase", 
                      element: <TestCaseProblem />,
                      errorElement: <ErrorPage />,
                   },
        
                  ]
                },
           
          ]
      },
      { path: "group", 
        element: <><PageTitle title="GroupMagager|Admin"  /><GroupManager /></>,
        errorElement: <ErrorPage />,
        children:[
          { index: true, element: <GroupList />,errorElement: <ErrorPage />, },
          { path: "list", 
          element: <GroupList />,
          errorElement: <ErrorPage />,
          },
          { path: "add", 
            element: <GroupAdd/>,
            errorElement: <ErrorPage />,
            },
          { path: "detail/:id", 
              element: <GroupDetail/>,
              errorElement: <ErrorPage />,
              children:[
                { index: true, element: <InfoGroup />,errorElement: <ErrorPage />, },
                {  path: "members", 
                element: <UserGroup />,
                errorElement: <ErrorPage />,
                },
                { path: "problems", 
                  element: <ProblemGroup />,
                  errorElement: <ErrorPage />,
                  },
                  { path: "info", 
                    element: <InfoGroup />,
                    errorElement: <ErrorPage />,
                    },
                
    
              ]
            },
         

        ]
    }, 
     { path: "executed", 
      element:  <><PageTitle title="UserMagager|codeExcecute |Admin"  /><CodeExcute/></>,
      errorElement: <ErrorPage />},//them
      { path: "submit", 
        element: <SubmitManager />,
        errorElement: <ErrorPage />,
        children:[
          { path: "list", 
          element: <SubmitList />,
          errorElement: <ErrorPage />,
          },
          { path: "detail/:id", 
            element: <SubmitDetail/>,
            errorElement: <ErrorPage />,
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
        { path: "profile", 
          element: <Profile />,
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
        path: "order",
        element: <Profile />,
      },
      
    
    ],
  },
]);
export default router;
