const DashboardSidebar = () => {
  return (
    <div>
      <ul className="leading-[40px]">
        <li className="hover:underline cursor-pointer">Update</li>
        <li className="hover:underline cursor-pointer">Favorit</li>
        <li className="hover:underline cursor-pointer">Setting</li>
      </ul>

      <div className="divide-x"></div>
    </div>
  );
};

export default DashboardSidebar;
