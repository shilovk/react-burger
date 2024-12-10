import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../services/hooks/use-app-dispatch";
import { useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  logout,
} from "../services/actions/profile";
import { RootState } from "../services/reducers/reducers";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, email, isLoading, error, successMessage } = useSelector(
    (state: RootState) => state.profile,
  );
  const isAuth = useSelector((state: RootState) => state.login.isAuthenticated);

  const [newName, setName] = useState(name);
  const [newEmail, setEmail] = useState(email);
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    setName(name);
    setEmail(email);
  }, [name, email]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile(newName, newEmail, password));
  };

  const handleCancel = () => {
    setName(name);
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="mt-20 flex min-h-screen items-start justify-center">
      <div className="w-1/4 text-left text_type_main-medium">
        <div className="mb-5 hover:text-white">Профиль</div>
        <div className="mb-5 text-grayText hover:text-white">
          История заказов
        </div>
        <div
          className="text-grayText cursor-pointer hover:text-white"
          onClick={() => dispatch(logout())}
        >
          Выход
        </div>
        <div className="mt-20 text_type_main-default text-grayText">
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>

      <div className="w-1/2 text-center">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            icon="EditIcon"
            value={newName}
            name="name"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            size="default"
            extraClass="mb-5 ml-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            icon="EditIcon"
            value={newEmail}
            name="email"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            size="default"
            extraClass="mb-5 ml-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            type="password"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            icon="EditIcon"
            value={password}
            name="password"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            size="default"
            extraClass="mb-5 ml-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <div className="mt-5">
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              {isLoading ? "Сохранение..." : "Сохранить"}
            </Button>
            <Button type="secondary" onClick={handleCancel} htmlType="button">
              Отмена
            </Button>
          </div>
        </form>
      </div>

      {error && <div className="mt-5 text-red-600">{error}</div>}
      {successMessage && (
        <div className="mt-5 text-green-600">{successMessage}</div>
      )}
    </div>
  );
}
