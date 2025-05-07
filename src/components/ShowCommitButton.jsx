import key from "./key";
function ShowCommitButton({
  className = "",
  query,
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
      console.log(`This is data`, data);
    } catch (err) {
      setShowViewPage(false);
      alert(
        err.message === "Something went wrong"
          ? `Enter repo name in this format "Facebook/react" `
          : "Please check your internet connection"
      );
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={() => fetchRepo(query)}
      className={`max-w-width-styling w-[90%] text-center rounded-lg bg-[#F3663F] py-4 mb-8 text-white text-xl font-[600]  leading-[1.75rem] ${className}`}
    >
      See commits 🚀
    </button>
  );
}

export default ShowCommitButton;
