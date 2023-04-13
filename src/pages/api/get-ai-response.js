const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { searchText, shorten } = req.body;
      console.log(searchText);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Read this topic: ${searchText} `,
        temperature: 0,
        max_tokens: 200,
      });
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
