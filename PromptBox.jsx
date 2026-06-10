export default function PromptBox() {
  return (
    <div className="border border-gray-700 rounded-xl bg-[#202123] p-3 flex">
      <input
        type="text"
        placeholder="Ask AI to create a resume..."
        className="flex-1 bg-transparent outline-none text-white"
      />

      <button className="px-4 text-green-500">
        ➤
      </button>
    </div>
  );
}