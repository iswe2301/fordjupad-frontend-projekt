import { useAuth } from "../context/AuthContext"

const ProfilePage = () => {

  const { user } = useAuth(); // Importera user från AuthContext

  return (
    <>
    <h1>Mina sidor</h1>
    {/* Visa användarens förnamn om denne är inloggad */}
    <h2>Hej och välkommen, {user ? user.firstname : ""}!</h2>
    </>
  )
}

export default ProfilePage