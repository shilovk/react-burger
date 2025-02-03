import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";

const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Сегодня, ${format(date, "HH:mm", { locale: ru })}`;
  }

  if (isYesterday(date)) {
    return `Вчера, ${format(date, "HH:mm", { locale: ru })}`;
  }

  return format(date, "d MMMM, HH:mm", { locale: ru });
};

export default formatOrderDate;
