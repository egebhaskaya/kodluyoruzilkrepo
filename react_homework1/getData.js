import axios from "axios";

export async function getData(userID) {
  const getUserData = await axios(
    "https://jsonplaceholder.typicode.com/users/" + userID
  );

  const getUserPostData = await axios(
    "https://jsonplaceholder.typicode.com/posts?id=" + userID
  );

  getUserData.data["posts"] = getUserPostData.data;
  return console.log(getUserData.data);
}
