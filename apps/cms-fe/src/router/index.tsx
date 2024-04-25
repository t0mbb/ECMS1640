import { createBrowserRouter, Navigate } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import LayoutDashboard from '../layouts/Dashboard';


import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Update from '../pages/Home/Update';
import Detail from '../pages/Home/Detail';
import Create from '../pages/Home/Create';

import CreateFac from '../pages/Faculty/Create';
import ListFac from '../pages/Faculty/List';
import UpdateFac from '../pages/Faculty/Update';

import CreateEvent from '../pages/Event/Create';
import ListEvent from '../pages/Event/List';
import UpdateEvent from '../pages/Event/Update';
import DetailEvent from '../pages/Event/Detail';

import CreateContribution from '../pages/Contribution/CreateContribution';
import ListContribution from '../pages/Contribution/ListContribution';
import UpdateContribution from '../pages/Contribution/UpdateContribution';
import DetailContribution from '../pages/Contribution/DetailContribution';
import Homepage from '../pages/Login/Home'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import RoleProtected, {
  RoleName,
} from '../components/RoleProtected/RoleProtected';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <Homepage />,
      },
    ],
  },
  {
    path: '/account',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'detail/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><Detail /></RoleProtected>,
      },
      {
        path: 'update/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><Update /></RoleProtected>,
      },
      {
        path: 'createAcc',
        element: <RoleProtected allowedRole={[RoleName.ADMIN]}><Create /></RoleProtected>,
      },
    ],
  },

  {
    path: '/faculty',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <ListFac/>,
      },
      {
        path: 'createFac',
        element: <RoleProtected allowedRole={[RoleName.ADMIN,RoleName.MARKETING_COORDINATOR , RoleName.MARKETING_MANAGER]}><CreateFac /></RoleProtected>,
      },
      {
        path: 'update/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN,RoleName.MARKETING_COORDINATOR, RoleName.MARKETING_MANAGER]}><UpdateFac /></RoleProtected>,
      },
    ],
  },
  

  {
    path: '/Event',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: 'listEvent',
        element: <ListEvent/>,
      },
      {
        path: 'createEvent',
        element: <RoleProtected allowedRole={[RoleName.ADMIN, RoleName.MARKETING_MANAGER]}><CreateEvent /></RoleProtected>,
      },
      {
        path: 'update/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN, RoleName.MARKETING_MANAGER]}><UpdateEvent /></RoleProtected>,
      },
      {
        path: 'detail/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN, RoleName.MARKETING_MANAGER]}><DetailEvent /></RoleProtected>,
      },
    ],
  },
  {
    path: '/con',
    element: <ProtectedRoute><LayoutDashboard /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <ListEvent/>,
      },
      {
        path: 'createCon/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN , RoleName.STUDENT ]}><CreateContribution /></RoleProtected>,
      },
      {
        path: 'update/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN , RoleName.STUDENT ]}><UpdateContribution /></RoleProtected>,
      },
      {
        path: 'listCon/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN , RoleName.STUDENT , RoleName.MARKETING_MANAGER]}><ListContribution /></RoleProtected>,
      },
      {
        path: 'detail/:id',
        element: <RoleProtected allowedRole={[RoleName.ADMIN , RoleName.STUDENT ,RoleName.MARKETING_MANAGER]}><DetailContribution /></RoleProtected>,
      },
    ],
  },


  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
