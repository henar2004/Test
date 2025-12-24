export default function Footer() {
  return (
    <footer className="portfolio-bg pb-3">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center small text-white">
          <span>© {new Date().getFullYear()} Henar Garcia Boada</span>

          <div className="d-flex gap-3">
            <a href="#" className="text-decoration-none text-white">
              LinkedIn
            </a>
            <a
              href="mailto:hegarbod@gmail.com"
              className="text-decoration-none text-white"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
