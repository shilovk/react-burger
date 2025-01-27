const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = async (res: Response): Promise<any> => {
  if (!res.ok) {
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || `Ошибка ${res.status}`);
    } catch {
      throw new Error(`Ошибка ${res.status}: ${text}`);
    }
  }
  return res.json();
};

const checkSuccess = <T extends { success?: boolean }>(res: T): T => {
  if (res?.success) {
    return res;
  }
  throw new Error("Ответ не success");
};

export const request = (endpoint: string, options?: RequestInit) =>
  fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess);
