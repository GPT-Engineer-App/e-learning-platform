import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Text, Input, Button, FormControl, FormLabel, useToast, Image, Flex, Link, List, ListItem } from "@chakra-ui/react";
import { FaUserGraduate, FaChalkboardTeacher, FaSignInAlt } from "react-icons/fa";

const Index = () => {
  // State management hooks for forms and authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const toast = useToast();

  // Function to handle login or signup
  const handleAuth = async (isSignup) => {
    const url = `https://backengine-77ar.fly.dev/${isSignup ? "signup" : "login"}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: `Logged ${isSignup ? "up" : "in"} successfully!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      const errorData = await response.json();
      toast({
        title: `Failed to log ${isSignup ? "up" : "in"}.`,
        description: errorData.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Function to switch between login and signup
  const toggleAuthMode = () => {
    setIsSigningUp(!isSigningUp);
  };

  // Render the authentication form
  const renderAuthForm = () => (
    <VStack spacing={4}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button leftIcon={isSigningUp ? <FaUserGraduate /> : <FaSignInAlt />} colorScheme="teal" onClick={() => handleAuth(isSigningUp)}>
        {isSigningUp ? "Sign Up" : "Login"}
      </Button>
      <Text>
        {isSigningUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link color="teal.500" onClick={toggleAuthMode}>
          {isSigningUp ? "Login" : "Sign Up"}
        </Link>
      </Text>
    </VStack>
  );

  // Render the main application content
  const renderAppContent = () => (
    <VStack spacing={4}>
      <Heading>Welcome to the Learning Management System</Heading>
      <Text>Manage your courses and profile</Text>
      {/* More content like listing courses, enrolling, etc, will be added here */}
    </VStack>
  );

  return (
    <ChakraProvider>
      <Box p={8}>
        <Flex direction={isLoggedIn ? "row" : "column"} align="center" justify="center" minH="100vh">
          <Box minWidth="sm" p={8} shadow="md" borderWidth="1px">
            {isLoggedIn ? renderAppContent() : renderAuthForm()}
          </Box>
          {isLoggedIn && (
            <Box minWidth="sm" p={8} shadow="md" borderWidth="1px" ml={8}>
              <List spacing={3}>
                <ListItem>
                  <Text fontWeight="bold">Name:</Text>
                  <Text>{name}</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Bio:</Text>
                  <Text>{bio}</Text>
                </ListItem>
                <ListItem>
                  <Image src={profilePicture || "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxkZWZhdWx0JTIwcHJvZmlsZXxlbnwwfHx8fDE3MDk2MTI3Mjd8MA&ixlib=rb-4.0.3&q=80&w=1080"} alt="Profile Picture" />
                </ListItem>
              </List>
            </Box>
          )}
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
