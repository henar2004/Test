import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 footer-neo position-relative">
      <div className="container text-center">

        <div className="d-flex justify-content-center gap-3 mb-2 flex-wrap">
          <span className="badge bg-dark text-danger border border-danger">© 2025 Henar</span>
          <span className="badge bg-dark text-danger border border-danger">Fullstack Dev</span>
          <span className="badge bg-dark text-danger border border-danger">Cyberpunk Fan</span>
        </div>

        <p className="neon-muted small mt-2 mb-0">
          Powered by Bootstrap
        </p>

        <div className="footer-line mt-3"></div>
      </div>
    </footer>
  );
}
