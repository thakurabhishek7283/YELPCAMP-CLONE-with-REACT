import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Form from "../components/Form/Form";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CreateLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "USER_REFRESH" });
  }, []);
  return (
    <>
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "80vh",
          marginY: 3,
        }}
      >
        <Form />
      </Container>

      <Footer />
    </>
  );
};

export default CreateLayout;
