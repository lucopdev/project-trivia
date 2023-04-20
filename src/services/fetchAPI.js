const getToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await request.json();

  return data;
};

export default getToken;
