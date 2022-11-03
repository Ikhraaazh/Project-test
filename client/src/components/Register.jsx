import { Form, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    job: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (name === "password" && !value) {
      setErrorMessage(`${name} tidak boleh kosong`);
    } else {
      setErrorMessage("");
    }
  };

  const confirmHandler = (e) => {
    const value = e.target.value;
    setConfirmPass(value);
    if (form.password !== value) {
      setErrorConfirm("Harus sama dengan password");
    } else {
      setErrorConfirm("");
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      if (form.password !== confirmPass) {
        throw { name: "Password harus sesuai" };
      }

      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: form,
      });
      if (data.message !== "New account added") throw { name: data.message };

      MySwal.fire({
        icon: "success",
        title: data.message,
        text: "Register success",
      });
      navigate("/login");
    } catch (error) {
      if (error.name === "Password harus sesuai") {
        console.log(error.name);
        MySwal.fire({ icon: "error", title: error.name });
      } else {
        console.log(error.response.data.message);
        MySwal.fire({ icon: "error", title: error.response.data.message });
      }
    } finally {
      setForm({
        ...form,
        password: "",
      });
      setConfirmPass("");
    }
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
            <h3>Silahkan daftar akun anda disini</h3>
            <Form
              style={{ width: "80%", marginTop: "3%" }}
              onSubmit={registerHandler}
            >
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama anda"
                  value={form.username}
                  name="username"
                  onChange={inputHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Masukkan email anda"
                  value={form.email}
                  name="email"
                  onChange={inputHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pekerjaan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan pekerjaan anda"
                  value={form.job}
                  name="job"
                  onChange={inputHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password anda"
                  value={form.password}
                  name="password"
                  onChange={inputHandler}
                />
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPass}
                  onChange={confirmHandler}
                />
                {errorConfirm && <p className="text-danger">{errorConfirm}</p>}
              </Form.Group>
              <Button type="submit" variant="primary" style={{ width: "100%" }}>
                Daftar
              </Button>
            </Form>
            <div style={{ marginTop: "3%" }}>
              <p>
                Sudah punya akun?{" "}
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login sekarang{" "}
                </span>{" "}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
