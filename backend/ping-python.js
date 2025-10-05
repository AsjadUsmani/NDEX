// backend/ping-python.js
import axios from "axios";
const url = process.env.PYTHON_AI_URL || "http://127.0.0.1:8001";
axios.get(url + "/")
  .then(r => console.log("ok:", r.data))
  .catch(e => console.error("err:", e.message));
