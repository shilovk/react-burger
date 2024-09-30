export interface ConstructorItemProps {
  text: string;
  price: number;
  thumbnail: string;
  type: "top" | "bottom" | undefined; // Тип для type
  isLocked: boolean;
  dragIcon?: boolean;
  extraClass?: string;
}
