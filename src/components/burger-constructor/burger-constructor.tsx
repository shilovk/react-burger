import React, { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { addIngredient, setBun, removeIngredient, reorderIngredients } from "../../services/actions/burger-constructor";
import ConstructorItem from "./constructor-item/constructor-item";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createOrder } from "../../services/actions/order";
import { RootState, useDispatch, useSelector } from "../../services/types";

const BurgerConstructor = () => {
  const isAuth = !!sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ingredients, bun } = useSelector((state: RootState) => state.burgerConstructor);
  const allIngredients = useSelector((state: RootState) => state.burgerIngredients.ingredients);
  const [isModalOpen, setModalOpen] = useState(false);

  const [, dropBunTop] = useDrop({
    accept: "bun",
    drop: (item: { id: string }) => {
      dispatch(setBun(item.id));
    },
  });

  const [, dropBunBottom] = useDrop({
    accept: "bun",
    drop: (item: { id: string }) => {
      dispatch(setBun(item.id));
    },
  });

  const [, drop] = useDrop({
    accept: ["sauce", "main"],
    drop: (item: { id: string }) => {
      dispatch(addIngredient(item.id));
    },
  });

  const selectedIngredients = useMemo(() => {
    return ingredients.map((ingredient) => ({
      ...allIngredients.find((item) => item._id === ingredient.id)!,
      uniqueId: ingredient.uniqueId,
    }));
  }, [ingredients, allIngredients]);

  const selectedBun = useMemo(() => {
    return allIngredients.find((item) => item._id === bun) || null;
  }, [bun, allIngredients]);

  const totalPrice = useMemo(() => {
    return (selectedBun ? selectedBun.price * 2 : 0) + selectedIngredients.reduce((acc, item) => acc + item.price, 0);
  }, [selectedBun, selectedIngredients]);

  const handleOrder = () => {
    if (!isAuth) {
      alert("Требуется авторизация");
      localStorage.setItem("redirectTo", "/");
      navigate("/login");
      return;
    }

    if (!selectedBun) {
      alert("Пожалуйста, добавьте булку в заказ.");
      return;
    }

    const ingredientIds = [selectedBun._id, ...ingredients.map((ingredient) => ingredient.id), selectedBun._id];

    dispatch(createOrder(ingredientIds));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const orderNumber = useSelector((state: RootState) => state.order.orderNumber);

  const moveIngredient = (dragIndex: number, hoverIndex?: number) => {
    if (hoverIndex === undefined) return;

    dispatch(reorderIngredients(dragIndex, hoverIndex));
  };

  return (
    <section className={`${styles["burger-constructor"]} pt-20`}>
      <div ref={dropBunTop} className={styles["burger-constructor__bun"]}>
        {selectedBun && (
          <ConstructorItem
            key={selectedBun._id}
            type={"top"}
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            dragIcon={false}
            extraClass="pb-2 pr-3"
          />
        )}
      </div>
      <div ref={drop} className={styles["burger-constructor__items"]}>
        {selectedIngredients.map((item, index) => (
          <ConstructorItem
            key={item.uniqueId}
            index={index}
            type={undefined}
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            dragIcon
            extraClass="pb-2"
            moveIngredient={moveIngredient}
            onRemove={() => dispatch(removeIngredient(item._id))}
          />
        ))}
      </div>
      <div ref={dropBunBottom} className={styles["burger-constructor__bun"]}>
        {selectedBun && (
          <ConstructorItem
            key={selectedBun._id}
            type={"bottom"}
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            dragIcon={false}
            extraClass="pb-2 pr-3"
          />
        )}
      </div>
      <div className={`${styles["burger-constructor__bottom"]} pt-5 pr-3`}>
        <div className="text text_type_digits-medium">{totalPrice}</div>
        <CurrencyIcon className="pl-2" type="primary" />
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-7" onClick={handleOrder}>
          <span className="text text_type_main-small">Оформить заказ</span>
        </Button>
      </div>
      {isModalOpen && orderNumber && (
        <Modal title="Детали заказа" onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber.toString()} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
