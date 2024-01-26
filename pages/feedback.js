import React, { useState } from "react";
import { feedBackPath, fileDataPath } from "./api/feedback";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Feedback = ({ fileData }) => {
  const [showDetails, setShowDetails] = useState(null);

  const showItemDetails = async (id) => {
    const res = await axios.get(`/api/${id}`);
    setShowDetails(res.data.feedback);
  };

  return (
    <div>
      {showDetails && showDetails.text && <p>{showDetails.text}</p>}
      <ul>
        {fileData.map((item) => (
          <li key={item.id}>
            {item.email}{" "}
            <Button onClick={() => showItemDetails(item.id)}>
              Show Details
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;

export async function getStaticProps() {
  try {
    const filePath = feedBackPath();
    const data = await fileDataPath(filePath);
    return {
      props: {
        fileData: data,
      },
    };
  } catch (error) {
    console.error("Error fetching feedback data:", error);
    return {
      props: {
        fileData: [],
      },
    };
  }
}
