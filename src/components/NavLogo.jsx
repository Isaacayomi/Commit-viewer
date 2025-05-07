function NavLogo({ className = "" }) {
  return (
    <img
      src="images/commitviewer-logo.png"
      alt="logo"
      className={`block m-auto py-4 ${className}`}
    />
  );
}

export default NavLogo;
