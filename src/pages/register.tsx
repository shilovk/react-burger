import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../services/reducers/reducers";
import { register } from "../services/actions/register";
import { useAppDispatch } from "../services/hooks/use-app-dispatch";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, error, success } = useSelector(
    (state: RootState) => state.register,
  );

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(email, password, name));
  };

  const onPasswordIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="text text_type_main-medium">Регистрация</div>
        <form onSubmit={handleSubmit} className="mt-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-5"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-5"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
            icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
            error={false}
            onIconClick={onPasswordIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-5"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />

          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={isLoading || !email || !password || !name}
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>

          {error && (
            <div className="mt-5 text text_type_main-default text-red-500">
              {error}
            </div>
          )}

          <div className="mt-20 text text_type_main-default">
            Уже зарегистрированы?
            <Link
              to="/login"
              className="ml-2 text_type_main-default text-blueLink hover:underline"
            >
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
