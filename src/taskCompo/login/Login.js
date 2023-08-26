import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Input,
  Box,
  Center,
  Heading,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";

import { auth } from "../firerbase";


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        navigate("/task");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <Center minHeight="100vh">
      <Box
        p={6}
        shadow="md"
        borderRadius="md"
        bg="black"
        w="300px"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading bg="black" size="lg" mb={4} color="white">
          Login
        </Heading>
        <VStack bg="black" spacing={4} w="100%" h="auto">
          <Input
            type="email"
            name="email"
            color="black"
            bg="white"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter email address"
          />
          <Input
            type="password"
            name="password"
            color="black"
            bg="white"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
          />
        </VStack>

        <Button
          onClick={handleSubmission}
          disabled={submitButtonDisabled}
          colorScheme="blue"
          size="lg"
          w="full"
          top="10px"
          _hover={{ backgroundColor: "blue.600" }}
          _focus={{ boxShadow: "none" }}
          zIndex="1"
        >
          Login
        </Button>
        <Text mt={4} bg="black" textAlign="center" color="white">
          Not have an account?{" "}
          <Link to="/signup">
            <Text bg="black" as="span" color="blue.500">
              Join now
            </Text>{" "}
          </Link>
        </Text>
      </Box>
    </Center>
  );
}

export default Login;
