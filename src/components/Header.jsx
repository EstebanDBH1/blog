import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
      setRedirect(true);
    });
  }

  const username = userInfo?.username;

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <header className="flex justify-between items-center">
      <Link to="/" className="logo">
        Alpacka.
      </Link>
      <nav>
        {username && (
          <>
            <div className="flex gap-2 items-center">
              <Link to="/create">Create new post</Link>
              <a onClick={logout} href="/">
                Salir
              </a>
              <p>({username})</p>
            </div>
          </>
        )}
        {!username && (
          <>
            <div className="flex items-center gap-2 ">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
