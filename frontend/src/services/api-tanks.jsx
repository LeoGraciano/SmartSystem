import { BASE_API_URL } from "../entity/urls";

export default class APISupply {
  static allTanks(token) {
    return fetch(`${BASE_API_URL}/Tank/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  static createTank(body, token) {
    return fetch(`${BASE_API_URL}/Tank/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  static getTank(id, token) {
    return fetch(`${BASE_API_URL}/Tank/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  static updateTank(id, body, token) {
    return fetch(`${BASE_API_URL}/Tank/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
  static deleteTank(id, token) {
    return fetch(`${BASE_API_URL}/Tank/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then(() => {})
      .catch((error) => console.log(error));
  }
  static allFuelSupplies(token) {
    return fetch(`${BASE_API_URL}/FuelSupply/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  static createFuelSupply(body, token) {
    return fetch(`${BASE_API_URL}/FuelSupply/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  static getFuelSupply(id, token) {
    return fetch(`${BASE_API_URL}/FuelSupply/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  static updateFuelSupply(id, body, token) {
    return fetch(`${BASE_API_URL}/FuelSupply/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
  static deleteFuelSupply(id, token) {
    return fetch(`${BASE_API_URL}/FuelSupply/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then(() => {})
      .catch((error) => console.log(error));
  }
}
