import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../services/hooks/use-app-dispatch";
import { login } from "../services/actions/login";
import { RootState } from "../services/reducers/reducers";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.login,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md text-center">
        <h1 className="text-xl font-bold">Вход</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="mb-5 ml-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
            value={password}
            name="password"
            error={false}
            onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
            errorText="Ошибка"
            size="default"
            extraClass="mb-5 ml-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />

          {error && <p className="text-red-600">{error}</p>}

          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={isLoading || !email || !password}
          >
            {isLoading ? "Авторизация..." : "Войти"}
          </Button>

          <div className="mt-20 text text_type_main-default">
            Вы новый пользователь?
            <Link
              to="/register"
              className="ml-2 text_type_main-default text-blueLink hover:underline"
            >
              Зарегистрироваться
            </Link>
          </div>
          <div className="mt-2 text text_type_main-default">
            Забыли пароль?
            <Link
              to="/forgot-password"
              className="ml-2 text_type_main-default text-blueLink hover:underline"
            >
              Восстановить пароль
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
