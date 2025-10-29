using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace JSON_Reader {
    public static class JSON_Read {


        //static private HighScoresList _highScoresList = new HighScoresList();
        //static private HighScores highScore = new HighScores();




        public static List<HighScores> readJSON(string jsonString) {
            //LATER UITLEZEN UIT FILE TOEVOEGEN

            HighScoresList highScoresList = JsonConvert.DeserializeObject<HighScoresList>(jsonString);
            return highScoresList.HighScores;
        }

        public static string writeJSON() {

            HighScoresList highScoresList = new() 
            {
                //Voorbeeld/test data
                HighScores = 
                [
                    new HighScores("Blub", 10, 20, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScores("^_^", 20, 35, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScores("Kaaskoekje", 15, 25, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScores("Griesmeelpap2012", 5, 15, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScores("Lot_toL", 30, 50, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScores("MeepMeep", 25, 40, TimeOnly.FromDateTime(DateTime.Now)),
                    new HighScores("Snelle Jelle", 12, 22, TimeOnly.FromDateTime(DateTime.Now))
                ]
            };

            string jsonString = JsonConvert.SerializeObject(highScoresList, Formatting.Indented);
            return jsonString;
        }
    }
}
