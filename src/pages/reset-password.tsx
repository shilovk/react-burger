import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../services/hooks/use-app-dispatch";
import { resetPassword } from "../services/actions/reset-password";
import { RootState } from "../services/reducers/reducers";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, success } = useSelector(
    (state: RootState) => state.resetPassword,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(password, code));
  };

  useEffect(() => {
    if (success) {
      alert("Успешно сохранено!");
      navigate("/login");
    }
  }, [success, navigate]);

  const onPasswordIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="text text_type_main-medium">Восстановление пароля</div>
        <form onSubmit={handleSubmit} className="mt-6">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Введите новый пароль"
            onChange={(e) => setPassword(e.target.value)}
            icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
            value={password}
            name="password"
            error={false}
            onIconClick={onPasswordIconClick}
            errorText="Ошибка"
            size="default"
            extraClass="mb-5"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name="code"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="mb-5"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />

          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={isLoading || !password || !code}
          >
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>

          {error && (
            <div className="mt-5 text text_type_main-default text-red-500">
              {error}
            </div>
          )}

          <div className="mt-20 text text_type_main-default">
            Вспомнили пароль?
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
