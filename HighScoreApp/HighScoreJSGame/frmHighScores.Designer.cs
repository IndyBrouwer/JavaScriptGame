namespace HighScoreJSGame
{
    partial class frmHighScores
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent() {
            DataGridViewCellStyle dataGridViewCellStyle2 = new DataGridViewCellStyle();
            dgvHighScores = new DataGridView();
            labelHighscoreText = new Label();
            label1 = new Label();
            ((System.ComponentModel.ISupportInitialize)dgvHighScores).BeginInit();
            SuspendLayout();
            // 
            // dgvHighScores
            // 
            dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = SystemColors.Window;
            dataGridViewCellStyle2.Font = new Font("Segoe UI", 9F);
            dataGridViewCellStyle2.ForeColor = SystemColors.WindowText;
            dataGridViewCellStyle2.SelectionBackColor = SystemColors.Highlight;
            dataGridViewCellStyle2.SelectionForeColor = SystemColors.HighlightText;
            dataGridViewCellStyle2.WrapMode = DataGridViewTriState.True;
            dgvHighScores.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
            dgvHighScores.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvHighScores.Location = new Point(74, 89);
            dgvHighScores.Name = "dgvHighScores";
            dgvHighScores.Size = new Size(663, 272);
            dgvHighScores.TabIndex = 5;
            // 
            // labelHighscoreText
            // 
            labelHighscoreText.AutoSize = true;
            labelHighscoreText.Font = new Font("Segoe UI", 27.75F, FontStyle.Bold | FontStyle.Underline, GraphicsUnit.Point, 0);
            labelHighscoreText.Location = new Point(294, 23);
            labelHighscoreText.Name = "labelHighscoreText";
            labelHighscoreText.Size = new Size(226, 50);
            labelHighscoreText.TabIndex = 6;
            labelHighscoreText.Text = "Highscores!";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(834, 23);
            label1.Name = "label1";
            label1.Size = new Size(38, 15);
            label1.TabIndex = 7;
            label1.Text = "label1";
            // 
            // frmHighScores
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1224, 386);
            Controls.Add(label1);
            Controls.Add(labelHighscoreText);
            Controls.Add(dgvHighScores);
            Name = "frmHighScores";
            Text = "Game High Scores";
            Load += frmHighScores_Load;
            ((System.ComponentModel.ISupportInitialize)dgvHighScores).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private DataGridView dgvHighScores;
        private Label labelHighscoreText;
        private Label label1;
    }
}
