import SessionContext from "./SessionContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "http://production.ihorlubricants.me";
export default function SessionProvider({ children }) {
  const [projectsList, setProjectsList] = useState([]);
  const [news, setNews] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [session, setSession] = useState({
    user: {
      token: AsyncStorage.getItem("token"),
      username: AsyncStorage.getItem("username"),
      user_id: AsyncStorage.getItem("user_id"),
      g_hash: AsyncStorage.getItem("g_hash"),
      fullName: AsyncStorage.getItem("fullName"),
      fcmToken: AsyncStorage.getItem("fcmToken"),
    },
  });

  function updateSession(nextSession) {
    let value =
      typeof nextSession === "function"
        ? nextSession
        : prevSession => ({ ...prevSession, ...nextSession });
    setSession(value);
  }

  useEffect(() => {
    (async () => {
      console.log("blabla");
      setIsLoading(true);
      let username = await AsyncStorage.getItem("username");
      let access_token = await AsyncStorage.getItem("token");
      let user_id = await AsyncStorage.getItem("user_id");
      let g_hash = await AsyncStorage.getItem("g_hash");
      let fullName = await AsyncStorage.getItem("fullName");
      let fcmToken = await AsyncStorage.getItem("fcmToken");
      let user = {
        username,
        access_token,
        user_id,
        g_hash,
        fullName,
        fcmToken,
      };
      updateSession({ user });
      if (access_token) {
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    })();
  }, []);

  const storeData = async (value, name, user_id, g_hash, fullName) => {
    try {
      await AsyncStorage.setItem("token", value);
      await AsyncStorage.setItem("username", name);
      await AsyncStorage.setItem("user_id", JSON.stringify(user_id));
      await AsyncStorage.setItem("g_hash", g_hash);
      await AsyncStorage.setItem("fullName", fullName);
    } catch (e) {
      console.log(e.message);
    }
  };

  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log({ [store[i][0]]: store[i][1] });
        return true;
      });
    });
  });

  const getRequest = async (params, path) => {
    let response = await axios.get(`${baseURL}/${path}`, {
      params,
      headers: {
        Authorization: `Bearer ${
          params.access_token ? params.access_token : session.user.access_token
        }`,
      },
    });
    return response.data;
  };

  const getProjectsList = async () => {
    let member_id = session.user.user_id;
    let g_hash = session.user.g_hash;
    let params = { member_id, g_hash };
    let res = await getRequest(params, "request/api/getlistprojects");
    setProjectsList(res);
  };

  const pushNotification = async (member_id, token) => {
    let response = await axios.post(`${baseURL}/request/api/settoken`, {
      member_id,
      m_member_token: token,
    });

    console.log("token response", response);
  };

  const getNewsInfo = async () => {
    let member_id = session.user.user_id;
    let g_hash = session.user.g_hash;
    let params = { member_id, g_hash };
    let res = await getRequest(params, "request/api/getlistnews");
    return res;
  };

  const getCategoriesList = async id => {
    let member_id = session.user.user_id;
    let g_hash = session.user.g_hash;
    let fk_category_id = id;
    let params = { member_id, g_hash, fk_category_id };
    console.log("res", params);
    let res = await getRequest(params, "request/api/getlistategories");

    return res;
  };

  const getListPlaces = async id => {
    let member_id = session.user.user_id;
    let g_hash = session.user.g_hash;
    let fk_category_id = id;
    let params = { member_id, g_hash, fk_category_id };

    let res = await getRequest(params, "request/api/getlistplaces");
    return res;
  };

  const getListOfContacts = async id => {
    let member_id = session.user.user_id;
    let g_hash = session.user.g_hash;
    let project_id = id;
    let params = { member_id, g_hash, project_id };
    let res = await getRequest(params, "request/api/getlistcontacts");
    return res;
  };

  const getListOfProjectFiles = async id => {
    let member_id = session.user.user_id;
    let g_hash = session.user.g_hash;
    let project_id = id;
    let params = { member_id, g_hash, project_id };
    let res = await getRequest(params, "request/api/getlistfiles");
    return res;
  };

  const getListOfAppointments = async project_id => {
    let member_id = session.user.user_id;
    let g_hash = session.user.g_hash;
    let params = { member_id, g_hash, project_id };
    let res = await getRequest(params, "request/api/getlistappointments");
    return res;
  };

  const Login = async (email, password) => {
    setError(false);
    setIsLoading(true);
    try {
      const pa_user_name = email;
      const pa_password = password;
      let res = await axios.put(`${baseURL}/auth/login`, {
        pa_user_name,
        pa_password,
      });
      if (res.data) {
        const data = {
          scope: "*",
          client_id: 2,
          username: res.data.member_name,
          password: pa_password,
          client_secret: "HMiQlvgehMY5reJpptWIMGEL0Vfq73A7DWeHMaxx",
          grant_type: "password",
        };

        let responseToken = await axios.post(`${baseURL}/oauth/token`, data);
        if (responseToken.data) {
          const { access_token } = responseToken.data;

          let member_id = res.data.member_id;
          let g_hash = res.data.g_hash;

          let params = {
            member_id,
            g_hash,
            access_token,
          };

          let result = await getRequest(
            params,
            "request/api/getprofileinformation"
          );
          if (result) {
            let fcmToken = await AsyncStorage.getItem("fcmToken");
            pushNotification(res.data.member_id, fcmToken);
            storeData(
              access_token,
              data.username,
              res.data.member_id,
              res.data.g_hash,
              result.profile_data.pa_fullname
            );
            const user = {
              username: data.username,
              access_token,
              user_id: res.data.member_id,
              g_hash: res.data.g_hash,
              fullName: result.profile_data.pa_fullname,
            };
            updateSession({ user });
            setIsLoading(false);
            setIsLoggedIn(true);
          } else {
            setIsLoading(false);
            setIsLoggedIn(false);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsLoggedIn(false);
      setError(true);
      setErrorMessage(error.message);
    }
  };

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("user_id");
      await AsyncStorage.removeItem("g_hash");
      await AsyncStorage.removeItem("fullName");
      const user = { token: null, username: null, user_id: null };
      updateSession({ user });
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const context = {
    isLoggedIn,
    projectsList,
    session,
    actions: { Logout, Login },
    isLoading,
    setIsLoading,
    error,
    errorMessage,
    getProjectsList,
    getListOfAppointments,
    getListOfContacts,
    getListOfProjectFiles,
    getNewsInfo,
    getCategoriesList,
    getListPlaces,
    pushNotification,
  };

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
