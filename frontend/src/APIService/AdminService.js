export default class AdminService {
  static async GetUsers() {
    try {
      const response = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Admin/GetUnverifiedDeliverers`,
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

  static async PostUser(body) {
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Admin/VerifyUser`,
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

      return respp;
    } catch (err) {
      console.log(err);
    }
  }
  static async AddProduct(body) {
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Admin/AddProduct`,
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
      if (respp.ok) {
        const jsoned = await respp.json();
        return jsoned;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
