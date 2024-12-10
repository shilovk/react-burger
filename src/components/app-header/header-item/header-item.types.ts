import React from "react";

export interface HeaderItemProps {
  icon: React.ReactElement;
  title: string;
  route: string;
  extraClass?: string;
}
