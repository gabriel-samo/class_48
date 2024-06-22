export const handleTime = (time: string) => {
  const formatted = time.replace("T", " ").split(".")[0];
  let date: any = formatted.split(" ")[0].split("-");
  date = `${date[2]}-${date[1]}-${date[0]}`;
  const newTime = formatted.split(" ")[1];
  return `${date} ${newTime}`;
};
