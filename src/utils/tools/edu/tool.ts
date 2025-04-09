import { parseJson } from "@/helpers/parse-json";
import { Agent } from "@/utils/agent";
import { Tool } from "@langchain/core/tools";

export class SearchJobs extends Tool {
  name = "search_jobs";
  description = `Searches jobs based on keywords provided by the user

Analyze user's request and find out job keywords that suits the user's skillset
If you can't find any job keywords for it, ask the user for providing job keywords so that you can find them

Inputs (input is a JSON string separated by space)
keywords: string, eg "blockchain" (required)

**IMPORTANT INSTRUCTIONS**:
- If you can't find any job keywords for the user's request, ask the user for providing job keywords so that you can find them
- Don't separate the keywords using ',', ';' or anything other than just a whitespace
- ALWAYS make sure that keywords are always 1 word and in lowercase

**EXAMPLES**
User: Find me some jobs
You: Please provide the job keywords

User: I don't know what to search for
You: Tell me some skills that you are good at

User: I am good at building backend applications
You: <search job with keyword "backend">
`;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = parseJson(input);
      const jobs = await this.agent.searchJobs(parsedInput.keywords);

      return JSON.stringify({
        status: "success",
        jobs,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}

export class GetBookRecommendations extends Tool {
  name = "get_book_recommendations";
  description = `Get book recommendations based on keywords provided by the user

Analyze user's request and find out book keywords that suits the user's skillset
If you can't find any book keywords for it, ask the user for providing book keywords so that you can find them

Inputs (input is a JSON string separated by space)
keywords: string, eg "blockchain" (required)

**IMPORTANT INSTRUCTIONS**:
- If you can't find any book keywords for the user's request, ask the user for providing book keywords so that you can find them
- Don't separate the keywords using ',', ';' or anything other than just a whitespace

**EXAMPLES**
User: Find me some books
You: Please provide the book keywords

User: I don't know what to search for
You: Tell me something that interests you

User: I am like to read about science fiction
You: <search book with keyword "science fiction">
`;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = parseJson(input);
      const books = await this.agent.getBookRecommendations(
        parsedInput.keywords
      );

      return JSON.stringify({
        status: "success",
        books,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}

export class GenerateCurrentAffairsQuiz extends Tool {
  name = "generate_current_affairs_quiz";
  description = `Generate a quiz based on the current affairs

This tool will generate a quiz based on the current affairs
It will return a JSON string with the following structure:

**EXAMPLES**
User: Generate a quiz based on current affairs
You: <generate quiz>
`;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const quiz = await this.agent.generateCurrentAffairsQuiz();

      return JSON.stringify({
        status: "success",
        quiz,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}
