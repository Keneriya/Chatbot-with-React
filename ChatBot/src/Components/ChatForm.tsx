import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef(null); // 🔑 make sure this exists

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();

    if (!userMessage) return;

    // clear input after sending
    inputRef.current.value = "";

    //updatechat history with the user message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      // calling the function to generate the bot's response
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef} // ✅ not useRef
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-rounded">
        keyboard_arrow_down
      </button>
    </form>
  );
};
export default ChatForm;
