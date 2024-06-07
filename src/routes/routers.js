import { createBrowserRouter } from 'react-router-dom';
import Home from 'pages/Home';
import { DashboardPage } from 'pages/DashboardPage';
import { ClassCreatePage } from 'pages/ClassCreatePage';
import { CheckPage } from 'pages/CheckPage';
import { SheetPage } from 'pages/SheetPage';

/*예시로 Teacher로 설정, 실제로는 사용자 정보를 기반으로 설정
 * user.role에 따라 Sidebar의 메뉴가 다르게 보여진다.
 * role은 Teacher, Student 두 가지로 구분한다.
 */
const userRole = 'Teacher';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [],
  },
  {
    path: 'dashboard',
    element: <DashboardPage role={userRole} />,
    children: [],
  },
  {
    path: 'class-create',
    element: <ClassCreatePage />,
    children: [],
  },
  {
    path: 'check',
    element: <CheckPage role={userRole} />,
    children: [],
  },
  {
    path: 'sheet',
    element: <SheetPage role={userRole} />,
    children: [],
  },
]);
