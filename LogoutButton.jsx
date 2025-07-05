import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/intro");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-400 hover:text-dourado transition"
    >
      🚪 Sair
    </button>
  );
}