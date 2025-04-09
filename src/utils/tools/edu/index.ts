import axios from "axios";

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

export const generateQuiz = async () => {
  const options = {
    method: "GET",
    url: "https://current-affairs-of-india.p.rapidapi.com/today-quiz",
    headers: {
      "x-rapidapi-key": "cbb05f142fmsh1f86fd2c613b03ap172139jsn5ed48da4bff4",
      "x-rapidapi-host": "current-affairs-of-india.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);

    return data;
  } catch (error) {
    return error;
  }
};
