import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchProfile, updateProfile } from "../../services/actions/profile";
import { RootState, useDispatch, useSelector } from "../../services/types";

export const ProfileEdit: React.FC = () => {
  const dispatch = useDispatch();
  const { name, email, isLoading, error, successMessage } = useSelector((state: RootState) => state.profile);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile(newName, newEmail, password));
  };

  const handleCancel = () => {
    setName(name);
    setEmail(email);
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        onChange={(e) => setName(e.target.value)}
        icon="EditIcon"
        value={newName}
        name="name"
        ref={inputRef}
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
        ref={inputRef}
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
        ref={inputRef}
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
      {error && <div className="mt-5 text-red-600">{error}</div>}
      {successMessage && <div className="mt-5 text-green-600">{successMessage}</div>}
    </form>
  );
};
