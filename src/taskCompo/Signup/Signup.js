import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Input, Box, Center, Heading, Button, Text, VStack } from "@chakra-ui/react";
import { auth } from "../firerbase" // Corrected import path

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "", // Corrected field name to match the state
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.password) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = res.user;
      await updateProfile(user, {
        displayName: values.name,
      });
      navigate("/login");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitButtonDisabled(false);
    }
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
          Signup
        </Heading>
        <VStack bg="black" spacing={4} w="100%" h="auto">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            color="black"
            bg="white"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            color="black"
            bg="white"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            color="black"
            bg="white"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, password: event.target.value }))
            }
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
          Sign Up
        </Button>
        {errorMsg && (
          <Text mt={4} bg="black" textAlign="center" color="red">
            {errorMsg}
          </Text>
        )}
        <Text mt={4} bg="black" textAlign="center" color="white">
          Already have an account?{" "}
          <Link to="/login">
            <Text bg="black" as="span" color="blue.500">
              Log In
            </Text>{" "}
          </Link>
        </Text>
      </Box>
    </Center>
  );
}

export default Signup;
