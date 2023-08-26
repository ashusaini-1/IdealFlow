import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  HStack,
  Text,
  Center,
  VStack,
  IconButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { auth } from "./firerbase"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 

const Task = () => {
  const navigate=useNavigate();
  const [inputFields, setInputFields] = useState([{ id: 0, value: "" }]);
  const [enteredTexts, setEnteredTexts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState(null); // Track the logged-in user

  const handleAddField = () => {
    setEnteredTexts([...enteredTexts, inputFields[0].value]);
    setInputFields([{ id: inputFields.length, value: "" }]);
  };

  const handleInputChange = (id, newValue) => {
    const updatedFields = inputFields.map((field) =>
      field.id === id ? { ...field, value: newValue } : field
    );
    setInputFields(updatedFields);

    if (newValue.includes("idea<>")) {
      const suggestion = newValue.split("idea<>")[1];
      const filteredSuggestions = enteredTexts.filter((text) =>
        text.includes(suggestion)
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const currentValue = inputFields[0].value;
    const newValue = currentValue.replace("idea<>", `idea<>${suggestion} `);
    setInputFields([{ id: inputFields.length, value: newValue }]);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleDeleteText = (index) => {
    const updatedTexts = enteredTexts.filter((_, i) => i !== index);
    setEnteredTexts(updatedTexts);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe(); // Cleanup the listener on unmount
    };
  }, []);


  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user using Firebase
      console.log('User signed out');
      navigate('/signup'); // Redirect to signup page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
      <HStack>
        {user && (
          <Box
            border="1px solid black"
            p={2}
            bg="white"
            borderRadius="8px"
            marginTop="5%"
          >
            <Text bg="white" fontSize="18px" color="black">
              Logged in as: {user.email}
            </Text>
          
          </Box>
        )}
        </HStack>

        <HStack marginTop="5%" alignItems="flex-start" spacing={2}>
          <Input
            placeholder="Enter text"
            borderColor="transparent"
            borderBottom="2px solid gray"
            _hover={{ borderBottomColor: "gray.600" }}
            _focus={{
              borderBottomColor: "teal.500",
              boxShadow: "0px 1px 0px 0px teal.500",
            }}
            value={inputFields[0].value}
            onChange={(e) =>
              handleInputChange(inputFields[0].id, e.target.value)
            }
          />
          <Button
            colorScheme="teal"
            variant="outline"
            borderRadius="8px"
            _hover={{ backgroundColor: "teal.500" }}
            onClick={handleAddField}
          >
            Add
          </Button>
          <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
        </HStack>
        <Center marginTop="6%">
          <VStack mt={4} spacing={2} alignItems="flex-start">
            {showSuggestions && (
              <List>
                {suggestions.map((suggestion, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    cursor="pointer"
                    fontSize="20px"
                    fontWeight="bold"
                    width="50vh"
                    position="relative"
                    _hover={{
                      textDecoration: "none",
                      backgroundColor: "gray.100",
                    }}
                  >
                    {suggestion}
                  </ListItem>
                ))}
              </List>
            )}
            {enteredTexts.map((text, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                border="5px solid gray"
                borderRadius="10px"
                marginTop="0rem"
                px={2}
                width="24rem"
              >
                <Text flex="1" fontSize="20px" fontWeight="bold">
                  {text}
                </Text>
                <IconButton
                  icon={<CloseIcon />}
                  colorScheme="black"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteText(index)}
                />
              </Box>
            ))}
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default Task;
