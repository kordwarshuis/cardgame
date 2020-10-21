// https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
function quotesToHtmlEntities(str) {
  return String(str).replace(/"/g, "&quot;").replace(/"/g, "&apos;");
}

// // DATA CLEANING:
//       // still necessary? :
//       // // replace characters in the source so they don't mess up quotes: ' replaced by ‘
//       // // this is not done by quotesToHtmlEntities
//       // dataCardsSelection[i].Prejudice = dataCardsSelection[i].Prejudice.replace(/'/g, "‘");
//       for (var i = 0; i < dataCardsAll.length; i++) {
//         for (var k in dataCardsAll[i]) {
//           if (dataCardsAll[i].hasOwnProperty(k)) {
//             // console.log("Key is " + k + ", value is: " + dataLayer1[i][k]);
//             // the csv source from google introduces \' so we remove the backslash:
//             dataCardsAll[i][k] = dataCardsAll[i][k].replace(/\\'/g, "‘");
//             //experimental:
//             dataCardsAll[i][k] = dataCardsAll[i][k].replace(/'/g, "‘");
//           }
//         }
//       }