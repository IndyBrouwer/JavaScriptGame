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
            DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
            dgvHighScores = new DataGridView();
            labelHighscoreText = new Label();
            lblError = new Label();
            ((System.ComponentModel.ISupportInitialize)dgvHighScores).BeginInit();
            SuspendLayout();
            // 
            // dgvHighScores
            // 
            dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = SystemColors.Window;
            dataGridViewCellStyle1.Font = new Font("Segoe UI", 9F);
            dataGridViewCellStyle1.ForeColor = SystemColors.WindowText;
            dataGridViewCellStyle1.SelectionBackColor = SystemColors.Highlight;
            dataGridViewCellStyle1.SelectionForeColor = SystemColors.HighlightText;
            dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
            dgvHighScores.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
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
            labelHighscoreText.Location = new Point(292, 9);
            labelHighscoreText.Name = "labelHighscoreText";
            labelHighscoreText.Size = new Size(226, 50);
            labelHighscoreText.TabIndex = 6;
            labelHighscoreText.Text = "Highscores!";
            // 
            // lblError
            // 
            lblError.AutoSize = true;
            lblError.Font = new Font("Segoe UI", 12F, FontStyle.Bold);
            lblError.ForeColor = Color.Red;
            lblError.Location = new Point(318, 65);
            lblError.Name = "lblError";
            lblError.Size = new Size(0, 21);
            lblError.TabIndex = 7;
            // 
            // frmHighScores
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(815, 386);
            Controls.Add(lblError);
            Controls.Add(labelHighscoreText);
            Controls.Add(dgvHighScores);
            Name = "frmHighScores";
            Text = "Game High Scores";
            ((System.ComponentModel.ISupportInitialize)dgvHighScores).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private DataGridView dgvHighScores;
        private Label labelHighscoreText;
        private Label lblError;
    }
}
