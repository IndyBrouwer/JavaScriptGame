using System.Xml;
using Newtonsoft.Json;

namespace JSON_Reader {
    public class JSON_Read {
        public static List<HighScore> readJSON() {

            string jsonString;
            HighScoresList highScoresList = new();
            try {
                jsonString = File.ReadAllText("../../../../highscores.json");
            } catch (FileNotFoundException e) {
                jsonString = writeJSON(); // remove later, maybe??
            }

            highScoresList = JsonConvert.DeserializeObject<HighScoresList>(jsonString);
            return highScoresList.HighScores;
        }

        public static string GiveDataFetchingError() {
            return "No table data found.";
        }

        public static string writeJSON() {
            // unused function, only for creating example JSON file.

            HighScoresList highScoresList = new() {
                //Voorbeeld/test data
                HighScores =
                [
                    new HighScore("Blub", 10, 20, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScore("^_^", 20, 35, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScore("Kaaskoekje", 15, 25, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScore("Griesmeelpap2012", 5, 15, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScore("Lot_toL", 30, 50, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScore("MeepMeep", 25, 40, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScore("Snelle Jelle", 12, 22, TimeOnly.FromDateTime(DateTime.Now))
                ]
            };

            string jsonString = JsonConvert.SerializeObject(highScoresList, Newtonsoft.Json.Formatting.Indented);
            return jsonString;
        }
    }
}
