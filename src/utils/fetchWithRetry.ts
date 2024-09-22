
export const fetchWithRetry = async (url: string, retries = 3): Promise<Response> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response;
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying... attempts left: ${retries}`);
        return fetchWithRetry(url, retries - 1);
      } else {
        throw error;
      }
    }
  };
  