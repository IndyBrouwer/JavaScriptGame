using JSON_Reader;

namespace HighScoresForm
{
    public partial class HighScoresForm : Form
    {
        public HighScoresForm() {
            InitializeComponent();

            tableFill();

            // make sure binding is complete before formatting
            dgvHighScores.DataBindingComplete += dgvHighScores_DataBindingComplete;
        }

        private void dgvHighScores_DataBindingComplete(object? sender, DataGridViewBindingCompleteEventArgs e) {
            // format table after data binding is complete -- won't work properly if done before
            tableFormat();
        }

        private void tableFill() {
            List<HighScore> tableData = JSON_Read.readJSON();

            tableData = (tableData.OrderByDescending(highScore => highScore.HighestMass)).ToList<HighScore>(); // order by highest mass
            addRankToList(tableData); // add rank after ordering list

            if (tableData.Count == 0) {
                lblError.Text = JSON_Read.GiveDataFetchingError();
            }

            dgvHighScores.DataSource = tableData;
        }

        private List<HighScore> addRankToList(List<HighScore> tableData) {
            for (int i = 0; i < tableData.Count; i++) {
                tableData[i].PlayerRank = i + 1;
            }

            return tableData;
        }

        private void tableFormat() {
            // color top 3 ranks
            int rowCount = dgvHighScores.Rows.Count;

            // ensure rows exist before coloring
            if (rowCount > 0)
                dgvHighScores.Rows[0].DefaultCellStyle.BackColor = Color.Gold; // rank 1
            if (rowCount > 1)
                dgvHighScores.Rows[1].DefaultCellStyle.BackColor = Color.Silver; // rank 2
            if (rowCount > 2)
                dgvHighScores.Rows[2].DefaultCellStyle.BackColor = Color.Peru; // rank 3



            if (dgvHighScores.Columns.Count == 0) // ensure table is not empty
                return;

            // format columns
            if (dgvHighScores.Columns.Contains("PlayerRank")) {
                dgvHighScores.Columns["PlayerRank"].HeaderText = "Rank";
                dgvHighScores.Columns["PlayerRank"].AutoSizeMode = DataGridViewAutoSizeColumnMode.ColumnHeader;
                dgvHighScores.Columns["PlayerRank"].HeaderCell.Style.Font = new Font(dgvHighScores.Font, FontStyle.Bold);
                dgvHighScores.Columns["PlayerRank"].DefaultCellStyle.Font = new Font(dgvHighScores.Font, FontStyle.Bold);
            }

            if (dgvHighScores.Columns.Contains("PlayerName")) {
                dgvHighScores.Columns["PlayerName"].HeaderText = "Player";
                dgvHighScores.Columns["PlayerName"].AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            }

            if (dgvHighScores.Columns.Contains("HighestMass")) {
                dgvHighScores.Columns["HighestMass"].HeaderText = "Highest Mass";
                dgvHighScores.Columns["HighestMass"].AutoSizeMode = DataGridViewAutoSizeColumnMode.ColumnHeader;
                dgvHighScores.Columns["HighestMass"].HeaderCell.Style.Font = new Font(dgvHighScores.Font, FontStyle.Bold);
                dgvHighScores.Columns["HighestMass"].DefaultCellStyle.Font = new Font(dgvHighScores.Font, FontStyle.Bold);
            }

            if (dgvHighScores.Columns.Contains("FoodEaten")) {
                dgvHighScores.Columns["FoodEaten"].HeaderText = "Food Eaten";
                dgvHighScores.Columns["FoodEaten"].AutoSizeMode = DataGridViewAutoSizeColumnMode.ColumnHeader;
            }

            if (dgvHighScores.Columns.Contains("TimeSurvived")) {
                dgvHighScores.Columns["TimeSurvived"].HeaderText = "Time Survived";
                dgvHighScores.Columns["TimeSurvived"].AutoSizeMode = DataGridViewAutoSizeColumnMode.ColumnHeader;
            }

            dgvHighScores.ClearSelection();
        }
    }
}
