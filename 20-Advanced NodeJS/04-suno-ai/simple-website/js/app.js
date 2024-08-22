document.getElementById("generate").addEventListener("click", () => {
  const description = document.getElementById("description").value;
  const reqBody = {
    gpt_description_prompt: description,
    make_instrumental: false,
    mv: "chirp-v3-0",
    prompt: description
  };
  document.getElementById("result1").innerHTML = "Generating...";
  axios
    .post("http://localhost:8000/generate/description-mode", reqBody)
    .then((res) => {
      console.log(res.data.clips[0].id);
      console.log(res.data.clips[1].id);
      return { clip1: res.data.clips[0].id, clip2: res.data.clips[1].id };
    })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
      document.getElementById("result1").innerHTML = "Error";
    });
});
