export default class ConsumerService {
  static async RegisterUser(body) {
    try {
      const resp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Auth/Register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: {
            body: JSON.stringify(body),
          },
        }
      );

      const data = await resp.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async LogInUser(body) {
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Auth/Login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(body),
        }
      );

      return respp;
    } catch (err) {
      console.log(err);
    }
  }

  static async LogInUserFb(body) {
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Auth/LoginWithFb`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(body),
        }
      );

      return respp;
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateUserPut(body) {
    try {
      const resp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Auth/UpdateUserProfile`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(body),
        }
      );

      const dataa = await resp.json();
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateUserGet() {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Auth/GetUserProfile`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const string = await response.text();
      console.log(string);
      const json = string === "" ? {} : JSON.parse(string);
      console.log("usao");
      if (json) {
        return json;
      } else {
        return {};
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async PostOrder(body) {
    try {
      const resp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Consumer/PlaceOrder`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(body),
        }
      );

      const dataa = await resp.json();

      return dataa;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetProducts() {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Consumer/GetProducts`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async GetUserImage() {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Auth/GetImg`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.blob();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async GetOrders() {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Consumer/GetCompletedOrdersByUser`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log("funkcija" + data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async GetConsumerOrder(id) {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Consumer/GetOrderById/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log("id : " + id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async GetCurrentOrders() {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Consumer/GetOrdersInProgress`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      // console.log("funkcija" + data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
