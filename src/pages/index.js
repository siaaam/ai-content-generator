import { getData } from "@/utils/getAIResponse";
import { makeLonger } from "@/utils/makeLongerText";
import { makeShorter } from "@/utils/makeShortenText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Hearts } from "react-loader-spinner";

export default function Home() {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");
  const [responseStatus, setResponseStatus] = useState(false);
  const { data, mutate, isLoading, isError } = useMutation({
    queryKey: ["AIarticle"],
    mutationFn: (searchText) => getData(searchText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AIarticle"] });
    },
  });
  const handleClick = () => {
    setResponseStatus(false);
    setSearchText("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(`${searchText} and generate me article in 80 words`);
    setResponseStatus(true);
  };
  if (isError) return "Error..";
  const AIArticle = data?.choices[0]?.text;

  const resultElement = (
    <>
      <h1 className="text-xl">
        Search Topic :{" "}
        {searchText.charAt(0).toUpperCase() + searchText.slice(1)}
      </h1>
      <div className="my-5 border border-purple-400 p-3 bg-black ">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Hearts
              height="80"
              width="80"
              color="#a82ec9"
              ariaLabel="hearts-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <>
            <p className="mb-3">{AIArticle}</p>
            <span className="bg-purple-500 px-4 py-1 rounded-full font-semibold text-sm">
              {AIArticle?.length}
            </span>
          </>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleClick}
          className="bg-slate-500 hover:bg-slate-400 text-white py-2 px-4 rounded"
        >
          New Search
        </button>
        <button
          onClick={() => makeShorter(AIArticle, setResponseStatus, mutate)}
          className="bg-slate-500 hover:bg-slate-400 text-white py-2 px-4 rounded"
        >
          Make it short
        </button>
        <button
          onClick={() => makeLonger(AIArticle, setResponseStatus, mutate)}
          className="bg-slate-500 hover:bg-slate-400 text-white py-2 px-4 rounded"
        >
          Make it long
        </button>
      </div>
    </>
  );
  const formElement = (
    <form onSubmit={handleSubmit}>
      <label className="block font-medium text-gray-900 mb-2" htmlFor="message">
        Search
      </label>
      <div className="relative">
        <textarea
          className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-black focus:border-transparen focus:outline-none pl-12 pr-5 pt-2 my-3 resize-none"
          id="message"
          name="message"
          rows={3}
          placeholder="Enter your message here"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <span className="absolute text-3xl top-2 left-2">
          <BiSearch />
        </span>
      </div>

      <div className=" flex justify-end gap-3">
        <button
          type="submit"
          className="bg-slate-500 hover:bg-slate-400 text-white py-2 px-4 rounded"
        >
          Generate Text
        </button>
      </div>
    </form>
  );
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className=" w-[600px] bg-gray-600 p-3 m-3">
        {responseStatus ? resultElement : formElement}
      </div>
    </div>
  );
}
