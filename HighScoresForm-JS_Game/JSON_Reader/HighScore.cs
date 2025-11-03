using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JSON_Reader {
    public class HighScore {
        private int _playerRank;
        private string _playerName;
        private int _highestMass;
        private int _foodEaten;
        private TimeOnly _timeSurvived;


        public int PlayerRank { get => _playerRank; set => _playerRank = value; }
        public string PlayerName { get => _playerName; set => _playerName = value; }
        public int HighestMass { get => _highestMass; set => _highestMass = value; }
        public int FoodEaten { get => _foodEaten; set => _foodEaten = value; }
        public TimeOnly TimeSurvived { get => _timeSurvived; set => _timeSurvived = value; }


        public HighScore(string playerName, int foodEaten, int highestMass, TimeOnly timeSurvived) {
            this.PlayerRank = 0; // Default rank, gets set after sorting list
            this.PlayerName = playerName;
            this.HighestMass = highestMass;
            this.FoodEaten = foodEaten;
            this.TimeSurvived = timeSurvived;
        }
    }





    public class HighScoresList {
        private List<HighScore> _highScores;

        public List<HighScore> HighScores { get => _highScores; set => _highScores = value; }
    }
}
