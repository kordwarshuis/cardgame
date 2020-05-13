function splitString(string,splitter) {
    if (string !== "") {
      // https://stackoverflow.com/a/5963202
      // and the divider is a |
      return string.split(splitter);
    }
}