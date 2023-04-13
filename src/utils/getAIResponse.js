import axios from "axios";

export async function getData(searchText) {
  try {
    const res = await axios.post("http://localhost:3000/api/get-ai-response", {
      searchText,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
}
