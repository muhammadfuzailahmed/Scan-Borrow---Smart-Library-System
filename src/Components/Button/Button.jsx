import React from "react";

function Button({ icon, title, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-700 transition hover:cursor-pointer">
      {icon} {title}
    </button>
  );
}

export default Button;
