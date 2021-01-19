import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-fbfdc-default-rtdb.firebaseio.com/",
});

export default instance;
