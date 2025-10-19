import { Outlet } from 'react-router-dom';
import Header from '../feature/Header';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
