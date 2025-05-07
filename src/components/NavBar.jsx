import NavLogo from "./NavLogo";

function NavBar() {
  return (
    // className="w-[28.75rem] "
    <nav>
      <NavLogo />
      <div className="flex justify-center items-center gap-8  ">
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </div>
    </nav>
  );
}

export default NavBar;
