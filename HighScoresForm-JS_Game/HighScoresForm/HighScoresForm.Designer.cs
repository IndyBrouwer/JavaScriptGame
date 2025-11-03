namespace HighScoresForm
{
    partial class HighScoresForm
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
            dgvHighScores = new DataGridView();
            lblHighScores = new Label();
            lblError = new Label();
            ((System.ComponentModel.ISupportInitialize)dgvHighScores).BeginInit();
            SuspendLayout();
            // 
            // dgvHighScores
            // 
            dgvHighScores.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvHighScores.Location = new Point(37, 162);
            dgvHighScores.Name = "dgvHighScores";
            dgvHighScores.Size = new Size(726, 345);
            dgvHighScores.TabIndex = 0;
            // 
            // lblHighScores
            // 
            lblHighScores.AutoSize = true;
            lblHighScores.Font = new Font("Impact", 36F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblHighScores.Location = new Point(263, 38);
            lblHighScores.Name = "lblHighScores";
            lblHighScores.Size = new Size(292, 60);
            lblHighScores.TabIndex = 1;
            lblHighScores.Text = "HIGHSCORES!";
            // 
            // lblError
            // 
            lblError.AutoSize = true;
            lblError.Font = new Font("Segoe UI", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblError.ForeColor = Color.Red;
            lblError.Location = new Point(328, 117);
            lblError.Name = "lblError";
            lblError.Size = new Size(0, 21);
            lblError.TabIndex = 2;
            // 
            // HighScoresForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 533);
            Controls.Add(lblError);
            Controls.Add(lblHighScores);
            Controls.Add(dgvHighScores);
            Name = "HighScoresForm";
            Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)dgvHighScores).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private DataGridView dgvHighScores;
        private Label lblHighScores;
        private Label lblError;
    }
}
