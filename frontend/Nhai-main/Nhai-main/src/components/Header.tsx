import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 fixed top-0 left-0 lg:left-64 right-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded"></div>
          <h1 className="text-sm md:text-xl font-bold text-[#0b3d91] truncate">
            National Highway AI Monitoring System
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-[#0b3d91] rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="text-sm hidden md:block">
            <p className="font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">Control Center</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
