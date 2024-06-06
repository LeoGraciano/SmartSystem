import { BASE_API_URL } from "../entity/urls";

export default class APIUser {
  static getUserFromToken(token) {
    return fetch(`${BASE_API_URL}/User/?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
  static loginUser(body) {
    return fetch(`${BASE_API_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
  static registerUser(body) {
    console.log(body);
    return fetch(`${BASE_API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
