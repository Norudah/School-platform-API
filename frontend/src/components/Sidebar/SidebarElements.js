import { Link } from "react-router-dom";

const SidebarElements = ({ children, to }) => {
  return (
    <li>
      <Link
        to={to}
        className={
          "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        }>
        {children}
      </Link>
    </li>
  );
};

export default SidebarElements;
