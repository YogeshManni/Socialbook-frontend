import axios from "axios";
import FormData from "form-data"; // Ensure correct import

const Moderate = async (text) => {
  let data = new FormData();
  data.append("lang", "en");
  data.append("models", "general,self-harm");
  data.append("mode", "ml");
  data.append("api_user", process.env.REACT_APP_API_USER);
  data.append("api_secret", process.env.REACT_APP_API_SECRET);
  data.append("text", text); // Append the text parameter correctly

  try {
    console.log("Making API request with text:", text);

    return await fetch(process.env.REACT_APP_MODERATIONURL, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((response) => {
        // Ensure you log the full response
        console.log("API Response:", response);

        // Handle the actual response
        const moderationData = response.moderation_classes;
        if (!moderationData) {
          console.log("No moderation data returned!");
          return true;
        }
        console.log(moderationData);
        const notValid =
          moderationData.sexual >= 0.2 ||
          moderationData.discriminatory >= 0.2 ||
          moderationData.insulting >= 0.2 ||
          moderationData.violent >= 0.2 ||
          moderationData.toxic >= 0.2 ||
          moderationData["self-harm"] >= 0.2;

        console.log("Moderation validation result:", notValid);
        return notValid; // Return the moderation result
      });
  } catch (error) {
    if (error.response) {
      console.error("API error response:", error.response.data);
    } else {
      console.error("Request error:", error.message);
    }
    return true; // Return false if any error occurs
  }
};

export default Moderate;
