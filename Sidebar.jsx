import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { label: "Tarot", emoji: "🔮", path: "/tarot" },
    { label: "Numerologia", emoji: "🌙", path: "/numerologia" },
    { label: "Arquétipos", emoji: "🧠", path: "/arquétipos" },
    { label: "Relatórios", emoji: "📜", path: "/relatórios" },
    { label: "Rituais", emoji: "✨", path: "/rituais" },
  ];

  return (
    <aside className="relative z-10 h-screen p-6 text-white bg-black border-r border-gray-800 w-60 font-unbounded">
      <h1 className="mb-8 text-xl font-bold text-dourado">VOZ DA NOITE</h1>
      <ul className="space-y-6">
        {menuItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg hover:text-dourado transition ${
                  isActive ? "text-dourado font-semibold" : "text-white"
                }`
              }
            >
              <span className="text-xl">{item.emoji}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;