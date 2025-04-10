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

**RESPONSE INSTRUCTIONS**:
- Always provide the job url in the response
- Always provide the job location in the response
- Always provide the job company in the response
- Always make sure that the response is complete and properly formatted using markdown

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
      const jobs = (await this.agent.searchJobs(parsedInput.keywords)).map(
        (job: any) => ({
          name: job.name,
          company: job.company,
          url: job.url,
          location: job.location,
        })
      );

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

export class GenerateQuiz extends Tool {
  name = "generate__quiz";
  description = `Generate a quiz based on arbitary topic

This tool will generate a quiz based on the topic, difficulty, number of questions provided by the user

Inputs ( input is a JSON string ):
difficulty: string, eg "hard" (required)
n_questions: number, eg 10 (required)
topic: string, eg "science" (required)
n_options: number, eg 4 (optional, the default value is 4)

**IMPORTANT INSTRUCTIONS**:
- Don't generate the the required parameters yourself
- Always provide response in the following markdown format:
\`\`\`
# <QUIZ TITLE>
<A short description of the quiz>

# Questions:

### <Question 1>
  - <Option 1>
  - <Option 2>
  - <Option 3>
  - <Option 4>
  - Correct Option: <Correct Option> (only mention this if the quiz is being generated for teacher and not student)
\`\`\`  
**RESPONSE INSTRUCTIONS**:
- Always provide the quiz title in the response
- Always provide the quiz description in the response
- Always provide the quiz questions in the response
- Always provide the quiz options in the response
- Provide the quiz correct option in the response only if the quiz is being generated for teacher and not student
`;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = parseJson(input);
      const quiz = await this.agent.generateQuiz(
        parsedInput.difficulty,
        parsedInput.n_questions,
        parsedInput.topic,
        parsedInput.n_options
      );

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
