const Profile = ({ user }) => {
    const joined = new Date(user.joined)
    
    return (
        <div>
            <h2 className="white f3">Name: {user.name}</h2>
            <h2 className="white f3">Username: {user.username}</h2>
            <h2 className="white f3">Email: {user.email}</h2>
            <h2 className="white f3">Entries: {user.entries}</h2>
            <h2 className="white f3">Date Joined: {joined.toDateString()}</h2>
        </div>
    );
}

export default Profile;

