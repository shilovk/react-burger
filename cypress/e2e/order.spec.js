describe("Order", function () {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should drag ingredients, place an order, login, and confirm order", function () {
    cy.get("[class^=app_app]").first().as("app");
    cy.get("button").contains("Оформить заказ").as("createOrder");
    cy.get("[class^=burger-constructor_burger-constructor__bun]").first().as("constructorBun");
    cy.get("[class^=burger-constructor_burger-constructor__items]").first().as("constructorItems");

    // Перетаскиваем булку
    cy.contains("Краторная булка").parent().find("img").as("bun");
    cy.get("@bun").trigger("dragstart", { dataTransfer: new DataTransfer() });
    cy.get("@constructorBun")
      .trigger("dragover", { dataTransfer: new DataTransfer() })
      .trigger("drop", { dataTransfer: new DataTransfer() })
      .trigger("dragend");
    cy.get("@constructorBun").contains("Краторная булка").should("be.visible");

    // Перетаскиваем ингредиент
    cy.contains("Соус Spicy-X").parent().find("img").as("ingredient");
    cy.get("@ingredient").trigger("dragstart", { dataTransfer: new DataTransfer() });
    cy.get("@constructorItems")
      .trigger("dragover", { dataTransfer: new DataTransfer() })
      .trigger("drop", { dataTransfer: new DataTransfer() })
      .trigger("dragend");
    cy.get("@constructorItems").contains("Соус Spicy-X").should("be.visible");

    // Нажимаем "Оформить заказ" и переходим на страницу логина
    cy.get("@createOrder").click();
    cy.url().should("include", "/login");
    cy.contains("Вход").should("be.visible");

    // Вводим логин и пароль из env
    cy.get('input[name="email"]').type(Cypress.env("email"), { force: true });
    cy.get('input[name="password"]').type(Cypress.env("password"), { force: true });

    // Нажимаем кнопку "Войти"
    cy.get("button").contains("Войти").click();

    // Проверяем, что после успешного входа нас перенаправило обратно
    cy.url().should("not.include", "/login");

    // Оформляем заказ и проверяем его детали
    cy.get("@createOrder").click();
    cy.get("@app").contains("Создание заказа").should("be.visible");

    cy.get("[class^=modal_modal]", { timeout: 20000 })
      .first()
      .within(() => {
        cy.contains("Детали заказа").should("be.visible");

        cy.get("p.text_type_digits-large")
          .should("be.visible")
          .invoke("text")
          .then((orderNumber) => {
            expect(orderNumber).to.match(/^\d+$/); // Проверяем, что это число
          });

        cy.contains("Ваш заказ начали готовить").should("be.visible");
        cy.contains("Дождитесь готовности на орбитальной станции").should("be.visible");
      });

    cy.get("[class^=modal_modal__closeButton]").click({ force: true });
    cy.contains("Детали заказа").should("not.exist");
  });
});
