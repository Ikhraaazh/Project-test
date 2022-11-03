import { Form, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!value) {
      setErrorMessage(`${name} tidak boleh kosong`);
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: "http://localhost:3000/login",
      data: input,
    })
      .then(({ data }) => {
        console.log(data);
        if (data.message)
          throw new Error({ response: { data: { message: data.message } } });

        localStorage.access_token = data.access_token;
        MySwal.fire({
          icon: "success",
          title: "Welcome",
          text: "Login success",
        });
        navigate("/");
      })
      .catch(({ response }) => {
        console.log(response.data.message);
        MySwal.fire({ icon: "error", text: response.data.message });
      })
      .finally(() => {
        setInput({
          email: "",
          password: "",
        });
      });
  };

  return (
    <div>
      <Row className="landing" style={{ width: "100vw" }}>
        <Col>
          {" "}
          <Image
            src="./img/20944201.jpg"
            thumbnail
            alt="ini gambar"
            style={{ border: "none" }}
          />{" "}
        </Col>
        <Col>
          <div style={{ marginLeft: "10%", marginTop: "15%" }}>
            <h3>Silahkan masuk ke akun anda</h3>
            {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
            <Form
              style={{ width: "80%", marginTop: "3%" }}
              onSubmit={loginHandler}
            >
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Masukkan email anda"
                  value={input.email}
                  onChange={inputHandler}
                  name="email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password anda"
                  value={input.password}
                  onChange={inputHandler}
                  name="password"
                />
                <Form.Text className="d-flex justify-content-end text-danger">
                  Lupa password?
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button type="submit" variant="primary" style={{ width: "100%" }}>
                Masuk
              </Button>
            </Form>
            <div style={{ marginTop: "3%" }}>
              <p>
                Belum punya akun?{" "}
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Daftar sekarang
                </span>{" "}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
