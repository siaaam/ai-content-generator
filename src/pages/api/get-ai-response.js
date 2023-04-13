const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { searchText } = req.body;
      console.log(searchText);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Read this topic: ${searchText} `,
        temperature: 0,
        max_tokens: 200,
      });
      return res.status(200).send(response.data);
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(405).send("Method not allowed.");
  }
}
