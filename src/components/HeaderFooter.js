import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../HeaderFooter.css";

function HeaderFooter({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100 page-container">
      {/* Header Section */}
      <header className="header">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="header-title h3 mb-0">My Application</h1>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="main-content py-4">
        <div className="container">{children}</div>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} My Application. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HeaderFooter;
