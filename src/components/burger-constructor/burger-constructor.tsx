import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { RootState } from "../../services/reducers/reducers";
import {
  addIngredient,
  setBun,
  removeIngredient,
  reorderIngredients,
} from "../../services/actions/burger-constructor";
import ConstructorItem from "./constructor-item/constructor-item";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../services/actions/burger-constructor";
import { createOrder } from "../../services/actions/order";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { ingredients, bun } = useSelector(
    (state: RootState) => state.burgerConstructor,
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const allIngredients: Ingredient[] = useSelector(
    (state: RootState) => state.burgerIngredients.ingredients,
  );

  const [isModalOpen, setModalOpen] = useState(false);

  const [, dropBunTop] = useDrop({
    accept: "bun",
    drop: (item: { id: string }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(setBun(item.id));
    },
  });

  const [, dropBunBottom] = useDrop({
    accept: "bun",
    drop: (item: { id: string }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(setBun(item.id));
    },
  });

  const [, drop] = useDrop({
    accept: ["sauce", "main"],
    drop: (item: { id: string }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(addIngredient(item.id));
    },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const selectedIngredients = useMemo<Ingredient[]>(() => {
    return ingredients
      .map((ingredient) => {
        // Найти объект ингредиента по id
        const foundIngredient = allIngredients.find(
          (item) => item._id === ingredient.id,
        );
        // Если найден, добавить uniqueId
        return foundIngredient
          ? { ...foundIngredient, uniqueId: ingredient.uniqueId }
          : undefined;
      })
      .filter((item): item is Ingredient => !!item); // Фильтруем undefined
  }, [ingredients, allIngredients]);

  const selectedBun = useMemo<Ingredient | null>(() => {
    return allIngredients.find((item) => item._id === bun) || null;
  }, [bun, allIngredients]);

  const totalPrice = useMemo(() => {
    return (
      (selectedBun ? selectedBun.price * 2 : 0) +
      selectedIngredients.reduce((acc, item) => acc + item.price, 0)
    );
  }, [selectedBun, selectedIngredients]);

  const handleOrder = () => {
    if (!selectedBun) {
      alert("Пожалуйста, добавьте булку в заказ.");
      return;
    }

    const ingredientIds = [
      selectedBun._id,
      ...ingredients.map((ingredient) => ingredient.id),
      selectedBun._id,
    ];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(createOrder(ingredientIds));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const orderNumber = useSelector(
    (state: RootState) => state.order.orderNumber,
  );

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
            onRemove={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              dispatch(removeIngredient(item._id));
            }}
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
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-7"
          onClick={handleOrder}
        >
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
