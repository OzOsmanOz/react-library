import React from "react";

const Header = () => {
  return (
    <div className="header ">
      <nav
        className="navbar navbar-dark "
        style={{ backgroundColor: "#06283D" }}
      >
        <div className="container">
          <a
            style={{ color: "#DFF6FF", fontSize: "18px", fontWeight: "700" }}
            className="navbar-brand "
            href="#"
          >
            Kitaplığım
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link " aria-current="page" href="#">
                Kitaplarım
              </a>
              <a className="nav-link" href="#">
                Kategoriler
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
