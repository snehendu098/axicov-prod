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
      "x-rapidapi-key": "cbb05f142fmsh1f86fd2c613b03ap172139jsn5ed48da4bff4",
      "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);
    if (data.success) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
