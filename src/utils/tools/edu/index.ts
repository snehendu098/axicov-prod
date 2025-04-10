import axios from "axios";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { llm, serperTool } from "@/constants";
import { HumanMessage } from "@langchain/core/messages";

export const searchJobs = async (keywords: string) => {
  const options = {
    method: "GET",
    url: "https://linkedin-data-api.p.rapidapi.com/search-jobs",
    params: {
      keywords: keywords,
      datePosted: "anyTime",
      sort: "mostRelevant",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
      "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    return error;
  }
};

export const getBooks = async (keywords: string) => {
  const options = {
    method: "GET",
    url: "https://book-recommender1.p.rapidapi.com/recommend/keyword",
    params: {
      keyword: keywords,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
      "x-rapidapi-host": "book-recommender1.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const generateQuiz = async (
  difficulty: string,
  n_questions: number,
  topic: string,
  n_options?: number
) => {
  try {
    const reactAgent = createReactAgent({
      llm,
      tools: [serperTool],
      messageModifier: `You are an expert Quiz Generator. 
Generate a multiple-choice quiz of ${difficulty} difficulty, give me ${n_questions} questions and answers about ${topic}.
Each question should have exactly ${
        n_options || 4
      } options. Make 100%% sure that there is only one correct option and that this is one of the {n_options} options.
With every question, also give a brief explanation on why this is the right answer and the others are not.
Give the quiz a title based on the topic.

Make sure to search the web to generate the quiz and provide the most accurate and up-to-date information if needed

ALWAYS provide clear responses in **markdown format only**.
`,
    });

    const response = await reactAgent.invoke({
      messages: [
        new HumanMessage(
          `Generate a ${difficulty} quiz on ${topic} with ${n_questions} questions and ${
            n_options || 4
          } options`
        ),
      ],
    });

    return response.messages[0].content.toString();
  } catch (error) {
    return error;
  }
};
