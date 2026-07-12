import { Menu, UserCircle } from "lucide-react";

function Navbar({ title, subtitle, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-gray-700 transition hover:text-primary"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="font-raleway text-lg font-bold text-gray-900">
            {title}
          </h2>

          <p className="font-voces text-xs text-secondary">{subtitle}</p>
        </div>
      </div>

      <div className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-gray-100">
        <UserCircle size={36} className="text-primary" />
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-gray-900">Admin</p>
          <p className="font-voces text-xs text-secondary">Administrator</p>
        </div>
    </div>
    </header>
  );
}

export default Navbar;
