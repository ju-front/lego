import { createBrowserRouter } from 'react-router-dom';
import Home from 'pages/Home';
import SigninPage from 'pages/SigninPage';
import ClassCreatePage from 'pages/ClassCreatePage';
import AttendanceCheckPage from 'pages/AttendanceCheckPage';
import DashboardPage from 'pages/DashboardPage';
import AttendanceListPage from 'pages/AttendanceListPage';

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
    path: 'Signin',
    element: <SigninPage />,
    children: [],
  },
  {
    path: 'Attendance-List',
    element: <AttendanceListPage role={userRole} />,
    children: [],
  },
  {
    path: 'Class-Create',
    element: <ClassCreatePage />,
    children: [],
  },
  {
    path: 'Attendance-Check',
    element: <AttendanceCheckPage role={userRole} />,
    children: [],
  },
  {
    path: 'Dashboard',
    element: <DashboardPage role={userRole} />,
    children: [],
  },
]);
