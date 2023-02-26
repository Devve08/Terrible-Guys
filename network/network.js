import axios from "axios";
const baseURL = "http://production.ihorlubricants.me";

const getRequest = async (params, path) => {
  let response = await axios.get(`${baseURL}/${path}`, {
    params,
    headers: {
      Authorization: `Bearer ${params.access_token}`,
    },
  });
  console.log("res", response);
  return response.data;
};

export default getRequest;
