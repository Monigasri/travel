import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../styles/FeedbackPage.css";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/feedback");
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading feedbacks...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", marginTop: "50px" }}>{error}</p>;

  return (
    <div className="feedback-page">
      <Navigation />

      <div className="feedback-container">
        <h1>User Feedbacks</h1>
        {feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          <div className="feedback-grid">
            {feedbacks.map((fb) => (
              <div className="feedback-card" key={fb._id}>
                <h3>{fb.name}</h3>
                <p><strong>Email:</strong> {fb.email}</p>
                <p>{fb.message}</p>
                <p className="timestamp">{new Date(fb.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FeedbackPage;
