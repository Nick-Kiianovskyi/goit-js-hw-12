
import axios from "axios";

const API_URL = "https://pixabay.com/api/";
const API_KEY = "54003788-96a27274a1926d2f6361511ae"; 

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,        
        per_page: 15       
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Pixabay API error: " + error.message);
  }
}
