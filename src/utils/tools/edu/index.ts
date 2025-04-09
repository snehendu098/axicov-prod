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
    console.error(error);
  }
};
