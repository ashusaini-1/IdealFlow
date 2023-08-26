import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Name = () => {
  return (
    <Box bg="black" color="white" p={3} display="flex" justifyContent="space-between" alignItems="center">
      <Box bg="black">
        <Text bg="black" fontSize={["xs", "sm", "md", "lg"]} fontWeight="bold">
          IdealFlow Assignment App
        </Text>
      </Box>
      <Box bg="black">
        <Text bg="black" fontSize={["xs", "sm", "md", "lg"]}>Created By Ashu Saini</Text>
      </Box>
    </Box>
  );
};

export default Name;
