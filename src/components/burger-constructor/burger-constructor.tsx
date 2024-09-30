import React, { useState, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import ConstructorItem from "./constructor-item/constructor-item";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IngredientProps } from "./burger-constructor.types";

interface BurgerConstructorProps extends IngredientProps {
  selectedIds: string[];
  selectedBunId: string;
  onOrder: () => void;
  orderNumber: string | null;
}

function BurgerConstructor({
  ingredients,
  selectedIds,
  selectedBunId,
  onOrder,
  orderNumber,
}: BurgerConstructorProps) {
  const bun = useMemo(() => {
    return ingredients.find((ingredient) => ingredient._id === selectedBunId);
  }, [ingredients, selectedBunId]);

  const selectedIngredients = useMemo(() => {
    return ingredients.filter((ingredient) =>
      selectedIds.includes(ingredient._id),
    );
  }, [ingredients, selectedIds]);

  const totalPrice = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      selectedIngredients.reduce((acc, item) => acc + item.price, 0)
    );
  }, [bun, selectedIngredients]);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    onOrder();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={`${styles["burger-constructor"]} pt-20`}>
      {bun && (
        <div className={`${styles["burger-constructor__bun"]} pb-2 pr-3`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_large}
          />
        </div>
      )}

      <div className={styles["burger-constructor__items"]}>
        {selectedIngredients.map((item) => (
          <ConstructorItem
            key={item._id}
            type={undefined}
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image_large}
            dragIcon={true}
            extraClass="pb-2"
          />
        ))}
      </div>

      {bun && (
        <div className={`${styles["burger-constructor__bun"]} pr-3`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_large}
          />
        </div>
      )}

      <div className={`${styles["burger-constructor__bottom"]} pt-5 pr-3`}>
        <div className="text text_type_digits-medium">{totalPrice}</div>
        <CurrencyIcon className="pl-2" type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-7"
          onClick={openModal}
        >
          <span className="text text_type_main-small">Оформить заказ</span>
        </Button>
      </div>

      {isModalOpen && orderNumber && (
        <Modal title="Детали заказа" onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
