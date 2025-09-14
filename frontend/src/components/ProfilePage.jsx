import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/status", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.authenticated) setUser(data.user);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  };

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  if (!user) return <div style={{ padding: 24 }}>Not logged in.</div>;

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', padding: 24 }}>
      <h1>Profile</h1>
      <div style={{ marginTop: 16 }}>
        {user.avatarUrl && (
          <img src={user.avatarUrl} alt="avatar" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover' }} />
        )}
        <div><strong>Name:</strong> {user.name}</div>
        {user.username && <div><strong>Username:</strong> {user.username}</div>}
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Google ID:</strong> {user.googleId}</div>
      </div>
      <button onClick={handleLogout} style={{ marginTop: 24 }}>Logout</button>
    </div>
  );
};

export default ProfilePage;