import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="text text_type_main-medium">Any body in the space?</div>
        <p className="mt-10 text-gray-400">Кажется, Вы вышли за пределы галактики...</p>
        <div className="mt-10 text text_type_main-default">
          Перейти?
          <Link to="/" className="ml-2 text_type_main-default text-blueLink hover:underline">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
