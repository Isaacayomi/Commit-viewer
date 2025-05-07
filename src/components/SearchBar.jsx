import key from "./key";

function SearchBar({
  className = " ",
  query,
  setQuery,
  setShowViewPage,
  setCommitData,
  onSetResult,
  setIsLoading,
}) {
  async function fetchRepo(query) {
    try {
      setIsLoading(true);
      const res = await fetch(`https://api.github.com/repos/${query}/commits`, {
        header: { Authorization: `Bearer ${key}` },
      });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setCommitData(data);
      onSetResult(data);
      setShowViewPage(true);
    } catch (err) {
      setShowViewPage(false);
      alert(
        err.message === "Something went wrong"
          ? `Enter repo name in this format "Facebook/react" `
          : "Please check your internet connection"
      );
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchRepo(query);
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="E.g. facebook/react"
        className={` max-w-width-styling w-[90%] mx-auto pt-[0.9375rem] pb-[0.9375rem] px-4 outline-none bg-[#DFE4EA] rounded-lg mb-6 ${className}`}
      />
    </form>
  );
}
export default SearchBar;
