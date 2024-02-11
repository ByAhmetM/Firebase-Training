import { useState } from "react";
import { auth, resetPassword, update } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  console.log(auth.currentUser);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };
  return (
    <>
      <form className="grid gap-y-4" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">Profili Güncelle</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ad-Soyad
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-700"
              placeholder="İsminiz"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fotoğraf
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-700"
              placeholder="Fotoğrafını güncelle"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            className="inline-flex  cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Güncelle
          </button>
        </div>
      </form>

      <form className="grid gap-y-4 mt-5" onSubmit={handleResetSubmit}>
        <h1 className="text-xl font-bold mb-4">Parolayı Güncelle</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parola
          </label>
          <div className="mt-1">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-700"
              placeholder="Değiştirmk istemiyorsan değiştirme"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              disabled={!password}
              className="inline-flex mt-3  cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Değiştir
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;
