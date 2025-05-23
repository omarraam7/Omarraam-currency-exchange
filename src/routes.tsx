import Home from './pages/Home';
import History from './pages/History';
import About from './pages/About';
import Contact from './pages/Contact';

export const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/history',
    component: History,
    name: 'History',
  },
  {
    path: '/about',
    component: About,
    name: 'About',
  },
  {
    path: '/contact',
    component: Contact,
    name: 'Contact',
  },
];