import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY1OTY5NSwiZXhwIjoxOTU5MjM1Njk1fQ.X5yOThQQb7J-LYGfrakfDqGvL2zlDlUZSS8yjyMc-Rk";
const SUPABASE_URL = "https://mvqqinfaudikutijoljq.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//const supabaseData =

export default function ChatPage() {
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from("messages")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        console.log("Dados da consulta: ", data);
        setMessageList(data);
      });
  }, []);

  function handleNewMessage(newMessage) {
    const message = {
      //id: messageList.length + 1,
      from: "Nathalai",
      text: newMessage,
    };

    supabaseClient
      .from("messages")
      .insert([message])
      .then(({ data }) => {
        console.log("Criando mensagem: ", data);
        setMessageList([data[0], ...messageList]);
      });

    setMessage("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        //backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/the-lord-of-the-rings-hobbit-house-entrance.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: "rgba(33, 41, 49, 0.85)",
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList messages={messageList} />
          {/* {messageList.map((currentMessage) => {
            return (
              <li key={currentMessage.id}>
                {currentMessage.from}: {currentMessage.text}
              </li>
            );
          })} */}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={message}
              onChange={(eventInfos) => {
                //console.log(eventInfos);
                const newValue = eventInfos.target.value;
                setMessage(newValue);
              }}
              onKeyPress={(eventInfos) => {
                if (eventInfos.key === "Enter") {
                  eventInfos.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Escreva sua mensagem aqui"
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log(props.messages);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
  );
}
