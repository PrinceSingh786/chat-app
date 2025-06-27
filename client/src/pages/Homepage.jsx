import { useContext } from "react";
import ChatContainer from "../componentss/ChatContainer";
import RightSidebar from "../componentss/RightSidebar";
import Sidebar from "../componentss/Sidebar";
import { ChatContext } from "../../context/ChatContext";

const Homepage = () => {
  const { selectedUser } = useContext(ChatContext);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1e215d] via-[#282142] to-[#4b2067]">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden shadow-2xl h-[90vh] w-full max-w-7xl grid grid-cols-1 relative ${selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-2"
          }`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Homepage;
