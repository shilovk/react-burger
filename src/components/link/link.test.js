import React from "react";
import renderer from "react-test-renderer";
import { it, expect } from "@jest/globals";
import { Link } from "./link";

it("Ссылка рендерится без ошибок", () => {
  const tree = renderer.create(<Link title="Рецепт пельменей" url="https://pelmeni.gov" />).toJSON();
  expect(tree).toMatchSnapshot();
});
