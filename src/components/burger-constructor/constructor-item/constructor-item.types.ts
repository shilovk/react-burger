export interface ConstructorItemProps {
  text: string;
  price: number;
  thumbnail: string;
  type: "top" | "bottom" | undefined;
  isLocked: boolean;
  dragIcon?: boolean;
  extraClass?: string;
  onRemove?: () => void;
  index?: number;
  moveIngredient?: (dragIndex: number, hoverIndex: number | undefined) => void;
}
