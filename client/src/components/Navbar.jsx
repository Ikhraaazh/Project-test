import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Navigation() {
  const MySwal = withReactContent(Swal)
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  const changePage = (page) => {
    navigate(page);
  };

  const logoutHandler = () => {
    localStorage.clear();
    MySwal.fire({icon: "success", title: "Good bye", text: "Have a nice time"})
    navigate("/login");
  };

  useEffect(() => {
    if (access_token) {
      setToken(true);
      axios({
        method: "GET",
        url: "http://localhost:3000",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!access_token) {
      setToken(false);
    }
  }, [access_token]);

  return (
    <Navbar className="shadow-sm p-3 mb-5 bg-white fixed-top">
      <Navbar.Brand className="ms-3">
        <img
          src="./img/br3.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
        />
        Skills
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {!token ? (
          <>
            <Navbar.Text
              className="me-4 text-success"
              style={{ cursor: "pointer" }}
              onClick={() => changePage("/login")}
            >
              Masuk
            </Navbar.Text>
            <Navbar.Text
              className="me-3 text-success"
              style={{ cursor: "pointer" }}
              onClick={() => changePage("/register")}
            >
              Daftar
            </Navbar.Text>
          </>
        ) : (
          <div
            className="d-flex flex-row"
            style={{
              border: "solid",
              borderColor: "green",
              borderWidth: "1px",
              marginBotton: "-10px",
              cursor: "pointer",
            }}
            onClick={logoutHandler}
          >
            <img
              src="./img/pexels-pixabay-45201.jpg"
              style={{
                height: "40px",
                borderRadius: "50px",
                padding: "5px",
                marginTop: "5px",
              }}
              alt="profile pic"
            />
            <div className="ps-2">
              <span className="text-success pe-2">{user.username}</span>
              <br />
              <span className="pe-2">as a {user.job}</span>
            </div>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
