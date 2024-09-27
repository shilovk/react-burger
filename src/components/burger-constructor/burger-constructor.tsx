import React, { useState } from "react";
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
  const bun = ingredients.find(
    (ingredient) => ingredient._id === selectedBunId,
  );
  const selectedIngredients = ingredients.filter((ingredient) =>
    selectedIds.includes(ingredient._id),
  );

  const [totalPrice] = useState(
    (bun ? bun.price * 2 : 0) +
      selectedIngredients.reduce((acc, item) => acc + item.price, 0),
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    onOrder();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={`${styles["burger-constructor"]} pt-20`}>
      {bun && (
        <div className={`${styles["burger-constructor__bun"]} pl-9 pb-5`}>
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
          />
        ))}
      </div>

      {bun && (
        <div className={`${styles["burger-constructor__bun"]} pl-9`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_large}
          />
        </div>
      )}

      <div className={`${styles["burger-constructor__bottom"]} pl-30`}>
        <div className="text text_type_digits-medium ">{totalPrice}</div>
        <CurrencyIcon className="pl-2" type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="small"
          extraClass="ml-2"
          onClick={handleOpenModal}
        >
          <span className="text text_type_main-small">Оформить заказ</span>
        </Button>
      </div>

      {isModalOpen && orderNumber && (
        <Modal title="Детали заказа" onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
