const fetchData = async () => {
  try {
    const response = await fetch("/getRecipie");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export default fetchData;
