import fs from "fs/promises";
export const feedBackPath = () => {
  return process.cwd() + "/data/dummy.json";
};

export const fileDataPath = async (filePath) => {
  const fileData = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileData);
  return data;
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedback,
    };

    try {
      const filePath = feedBackPath();
      const data = await fileDataPath(filePath);

      data.push(newFeedback);
      await fs.writeFile(filePath, JSON.stringify(data));
      res.status(201).json({ message: "Success", feedback: newFeedback });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    try {
      const filePath = feedBackPath();
      const dataFeed = await fileDataPath(filePath);
      res.status(200).json({ feedback: dataFeed });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
