import React, { useState } from "react";
import { X } from "lucide-react";

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! Myself Jaadu! How may i assist you?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");

    // Simulate AI response (replace with actual AI logic in a real implementation)
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, isUser: false },
      ]);
    }, 1000);
  };

  const getAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes("prescription")) {
      return "We offer a wide range of prescription lenses. You can upload your prescription during the checkout process, or we can contact your optometrist for you.";
    } else if (
      lowerInput.includes("return") ||
      lowerInput.includes("exchange")
    ) {
      return "We have a 30-day return and exchange policy. If you're not satisfied with your purchase, you can return or exchange it within 30 days of delivery.";
    } else if (lowerInput.includes("shipping")) {
      return "We offer free standard shipping on all orders. Expedited shipping options are also available at checkout.";
    } else if (lowerInput.includes("frame") || lowerInput.includes("style")) {
      return "We have a variety of frame styles including classic, modern, and trendy options. You can browse our collection on our website or use our virtual try-on feature to see how they look on you.";
    } else if (lowerInput.includes("customize")) {
      return "Yes, we offer customizable lenses. You can choose options such as anti-reflective coating, blue light filtering, and transition lenses. Select your preferences during the ordering process.";
    } else if (lowerInput.includes("types")) {
      return "We offer a wide range of eyewear, including prescription glasses, sunglasses, blue light blocking glasses, and sports eyewear. Our selection includes various styles, materials, and brands to suit every need.";
    } else if (lowerInput.includes("replacement")) {
      return "Yes, we offer lens replacement services. If you have frames you love, you can send them to us for new lenses, or you can order lenses separately if you have a recent prescription.";
    } else if (lowerInput.includes("warranty")) {
      return "Yes, we offer a one-year warranty on most eyewear purchases, covering manufacturing defects. Please refer to our warranty policy for more information on what is included.";
    } else if (lowerInput.includes("materials")) {
      return "Our frames are made from a variety of high-quality materials, including acetate, metal, and titanium. Each material offers different benefits, such as durability, flexibility, and style options.";
    } else if (
      (lowerInput.includes("payment") && lowerInput.includes("method")) ||
      lowerInput.includes("option") ||
      lowerInput.includes("options")
    ) {
      return "We accept various payment methods, including credit/debit cards, UPI, and other secure payment options.";
    } else if (
      lowerInput.includes("number") ||
      lowerInput.includes("call") ||
      lowerInput.includes("contact")
    ) {
      return "Sumit Tripathi: 9999999999 \n Dayyan Shaikh: 8888888888";
    } else {
      return "I'm sorry, I didn't quite understand that. Could you please rephrase your question or ask about prescriptions, warrenty, payment options, shipping, or return policy?";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed overflow-hidden bg-white rounded-lg shadow-xl bottom-4 right-4 w-80">
      <div className="flex items-center justify-between p-4 text-white bg-blue-500">
        <h3 className="font-semibold">Jaadu Assistant</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto h-80">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-3/4 p-2 rounded-lg ${
                message.isUser
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
