import { useNavigate } from "react-router-dom";
import { Heading, Box, Button } from "@chakra-ui/react";
import Coopernet from "../../utils/Coopernet";
const Navbar = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    Coopernet.oauth = {};
    navigate("/login");
  };
  const token =
    Coopernet.oauth.access_token ?? JSON.parse(localStorage.getItem("token"));
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      backgroundColor="teal.500"
      fontSize="1.7rem"
      p={4}
      alignItems="center"
    >
      <Heading as="h2" mr={2} fontSize="x2" color="white">
        Crealead todo
      </Heading>
      {token && (
        <Button onClick={logoutUser} variantColor="red">
          Logout
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
