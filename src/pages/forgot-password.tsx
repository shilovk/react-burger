import React, { useState, useEffect } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../services/hooks/use-app-dispatch";
import { forgotPassword } from "../services/actions/forgot-password";
import { RootState } from "../services/reducers/reducers";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, success } = useSelector((state: RootState) => state.forgotPassword);

  useEffect(() => {
    if (success) {
      alert("Успешно отправлено! Проверьте ваш email.");
      navigate("/reset-password");
    }
  }, [success, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md text-center  text text_type_main-default">
        <h1 className="text-xl font-bold">Восстановление пароля</h1>
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

          <Button htmlType="submit" type="primary" size="medium" disabled={isLoading || !email}>
            {isLoading ? "Отправка..." : "Восстановить"}
          </Button>

          {error && <div className="mt-5 text-red-500">{error}</div>}

          <div className="mt-20 text text_type_main-default">
            Вспомнили пароль?
            <Link to="/login" className="ml-2 text-blueLink hover:underline">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
