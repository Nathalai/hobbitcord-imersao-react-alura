import { Box, Button, Text, Image } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";

export default function Error404() {
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals[200],
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Image
          styleSheet={{
            marginBottom: "16px",
          }}
          src={"https://c.tenor.com/DnpJz0JZo9MAAAAC/gandalf.gif"}
        />

        <Text
          variant="body1"
          styleSheet={{
            color: appConfig.theme.colors.neutrals[900],
            //backgroundColor: appConfig.theme.colors.neutrals[500],
            fontSize: "24px",
            padding: "8px 10px",
            //borderRadius: "8px",
          }}
        >
          {"Parece que você está perdido..."}
        </Text>

        <Text
          variant="body2
          "
          styleSheet={{
            color: appConfig.theme.colors.neutrals[900],
            //backgroundColor: appConfig.theme.colors.neutrals[500],
            padding: "8px 10px",
            //borderRadius: "8px",
          }}
        >
          {"A página que você está procurando não foi encontrada"}
        </Text>

        <Box as="form"></Box>
        <Button
          type="button"
          onClick={() => (window.location.href = "/")}
          label="Voltar à página inicial"
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["000"],
            mainColor: appConfig.theme.colors.primary[400],
            mainColorLight: appConfig.theme.colors.primary[300],
            mainColorStrong: appConfig.theme.colors.primary[500],
          }}
          styleSheet={{
            borderRadius: "100px",
            marginTop: "16px",
          }}
        />
      </Box>
    </>
  );
}
