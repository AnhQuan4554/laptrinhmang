import axios from "axios";
/* cái này dùng ở app.ts
khi đăng nhập có jwt gửi lên local thì nó sẽ lấy xuống 
chuyển về dạng chuẩn Bear trên header aithencation của server */
const setAuthToken = (token: String) => {
  // console.log(token);
  if (token) {
    const x = token.toString().slice(1, token.length - 1);
    axios.defaults.headers.common["Authorization"] = "Beaer " + x;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
