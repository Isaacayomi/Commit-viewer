import NavLogo from "./NavLogo";

function ViewPageNav({ setShowViewPage, setQuery, onSetResult }) {
  return (
    <>
      <NavLogo />
      <button
        onClick={() => {
          setShowViewPage(false);
          setQuery("");
          onSetResult([]);
          console.log("working");
        }}
        className="border text-dark-blue m-4 w-20"
      >
        BACK
      </button>
    </>
  );
}

export default ViewPageNav;
