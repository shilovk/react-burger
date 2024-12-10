export const checkResponse = (response: Response) => {
  if (!response.ok) {
    return response.json().then((error) => {
      throw new Error(error.message || "Ошибка сервера");
    });
  }
  return response.json();
};
