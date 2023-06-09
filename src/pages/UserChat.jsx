import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";

const UserChat = () => {
  useEffect(() => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token").split("|")[1]
      : null;
    const csrfToken = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
    const headers = {
      Authorization: `Bearer ${token}`,
      "X-Csrf-Token": csrfToken,
      "Access-Control-Allow-Credentials": true,
    };
    const pusher = new Pusher("d78816008ab4abe53329", {
      cluster: "ap1",
      forceTLS: true,
      userAuthentication: {
        endpoint: "http://localhost:8000/api/pusherauth",
        transport: "ajax",
        params: {
          Authorization: `Bearer ${token}`,
          "X-Csrf-Token": csrfToken,
          "Access-Control-Allow-Credentials": true,
        },
        headers,
        paramsProvider: null,
        headersProvider: null,
        customHandler: null,
      },
      channelAuthorization: {
        endpoint: "http://localhost:8000/api/pusherauthchannel",
        transport: "ajax",
        params: {},
        headers,
        paramsProvider: null,
        headersProvider: null,
        customHandler: null,
      },
    });
    pusher.connection.bind("state_change", function (states) {
      console.log("Channels current state is " + states.current);
    });
    pusher.connection.bind("error", function (err) {
      // console.log(err);
    });
    try {
      pusher.signin();
      const chanel = pusher.subscribe("presence-chat");
      chanel.bind("new-message", (data) => {
        // console.log(data);
      });
    } catch (err) {
      // console.log(err);
    }
  }, []);

  return <></>;
};

export default UserChat;
