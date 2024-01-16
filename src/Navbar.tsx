import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const paths = [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/todos',
    name: 'todos',
  },
  {
    path: '/persist-mutating',
    name: 'persist mutating',
  },
];

export function Navbar() {
  return (
    <div>
      {paths.map(({ path, name }) => (
        <NavLink
          key={path}
          className={({ isActive }) =>
            classNames('px-3 text-blue-600', {
              underline: !isActive,
            })
          }
          to={path}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
}
