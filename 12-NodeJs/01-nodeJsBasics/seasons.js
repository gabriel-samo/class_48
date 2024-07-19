exports.seasonName = (englishName) => {
  switch (englishName) {
    case "winter":
      return "חורף";
    case "spring":
      return "אביב";
    case "summer":
      return "קיץ";
    case "autumn":
      return "סתיו";
    default:
      return "Unknown";
  }
};