import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, emailVerification, logout } from "../firebase";
import { logout as logoutHandle } from "../redux/authSlice";
import UpdateProfile from "../components/UpdateProfile";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", { replace: true });
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="max-w-xl mx-auto py-5">
        <h1 className="flex gap-x-4 items-center">
          {user.photoURL && (
            <img
              className="w-7 h-7 rounded-full"
              src={auth.currentUser.photoURL}
            />
          )}
          Oturumun açık ({user.email})
          <button
            onClick={handleLogout}
            className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
          >
            Çıkış Yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
            >
              Eposta Onayla
            </button>
          )}
        </h1>
        <UpdateProfile />
      </div>
    );
  }
  return (
    <div>
      <Link to="/register">Kayıt Ol</Link>
      <Link to="/login">Giriş yap</Link>
    </div>
  );
};

export default Home;
