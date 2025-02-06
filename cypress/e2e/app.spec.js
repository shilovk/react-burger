describe("Main page with ingredients", function () {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
  });

  it("should display ingredients", function () {
    cy.contains("Соберите бургер").should("be.visible");
    cy.contains("Краторная булка", { timeout: 1000 }).should("be.visible");
  });

  it("should open ingredient details modal when clicking an ingredient", function () {
    cy.contains("Краторная булка").click();
    cy.get("[class^=modal_modal]")
      .first()
      .within(() => {
        cy.contains("Детали ингридиента").should("be.visible");
        cy.contains("Краторная булка").should("be.visible");
        cy.get("img").should("be.visible");
        cy.contains("Калории").should("be.visible");
        cy.contains("Белки").should("be.visible");
        cy.contains("Жиры").should("be.visible");
        cy.contains("Углеводы").should("be.visible");
      });
    cy.get("[class^=modal_modal__closeButton]").click({ force: true });
    cy.contains("Детали ингридиента").should("not.exist");
  });

  it("should redirect to login when trying to place an order", function () {
    cy.get("button").contains("Оформить заказ").click();
    cy.url().should("include", "/login");
    cy.contains("Вход").should("be.visible");
  });
});
