import { createContext, useContext, useState } from 'react';

export const RouterContext = createContext({ currentPath: '/', navigate: () => {} });

export function RouterProvider({ children, initialPath = '/' }) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  return (
    <RouterContext.Provider value={{ currentPath, navigate: setCurrentPath }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function NavLink({ to, end = false, children, className, title }) {
  const { currentPath, navigate } = useContext(RouterContext);
  const isActive = end ? currentPath === to : currentPath.startsWith(to);
  const resolvedClass = typeof className === 'function' ? className({ isActive }) : className;
  return (
    <button type="button" onClick={() => navigate(to)} title={title} className={resolvedClass}>
      {children}
    </button>
  );
}
