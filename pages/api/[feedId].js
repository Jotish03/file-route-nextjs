// feedback.js
import { feedBackPath, fileDataPath } from "./feedback";

export default async function handler(req, res, next) {
  try {
    const feedbackId = req.query.feedId; // Access the query parameter "feedId"
    console.log(feedbackId);
    const filePath = feedBackPath();
    const data = await fileDataPath(filePath);
    const selectedData = data.find((feedback) => feedback.id === feedbackId);

    if (!selectedData) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json({ feedback: selectedData });
  } catch (error) {
    console.error("Error fetching feedback details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
