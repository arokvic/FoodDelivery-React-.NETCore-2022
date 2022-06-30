export default class DelivererService {
  static async PostFinishedOrder(id) {
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Deliverer/FinishOrder/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async GetMyOrder() {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Deliverer/GetInProgressOrder`,
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
      return {};
    }
  }

  static async AcceptOrder(id) {
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Deliverer/AcceptOrder/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return respp;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetPendingOrders() {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Deliverer/GetPendingOrders`,
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
}
