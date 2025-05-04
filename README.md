# Protein Secondary Structure Prediction using Hybrid Neural Networks (CNN+BiLSTM+BiGRU)

This project leverages a hybrid deep learning architecture combining Convolutional Neural Networks (CNNs), Bidirectional Long Short-Term Memory (BiLSTM), and Bidirectional Gated Recurrent Units (BiGRU) for accurate prediction of protein secondary structures.

---

## Features
- **Model Architecture**: A hybrid neural network architecture integrating CNN, BiLSTM, and BiGRU.
- **Input**: Amino acid sequences of length limited to **512** due to computational constraints.
- **Output**: Predicted secondary structure categorized into Helix (H), Beta Strand (E), and Coil (C).
- **Performance**: Achieved a Q3 accuracy of **88.99%**.

---

## Sample Input and Output

**Input**: 
```
LTFGDFDEHEVDALASGITFGDFDD
```

**Output**: 
```
CEECCCCCCHHHHHHCCCCCCCCCC
```

---

## Project Overview

### Steps to Run the Project

1. **Download the Project**
   - Download and extract the zip file.
   - Download `best_model_kernel_5.h5` (pre-trained model) from dropbox link - 
     https://www.dropbox.com/scl/fi/uyor3rqikf817ck6nxubt/best_model_kernel_5.h5?rlkey=zmiqmw3hct0ooeo72dsrivxrv&st=3ivqb1ow&dl=0.
   - Move the downloaded `best_model_kernel_5.h5` file to `Protein-Secondary-Structure-Prediction-and-Data-Bank\PSSP`.
   > Caution : Make sure the file name is `best_model_kernel_5.h5` and not renamed to `best_model_kernel_5 (1).h5` or something else while downloading.

1. **Install Dependencies**
   - Open a terminal and navigate to the server directory:
     ```bash
      cd server
      npm install
      npm install find-free-port
      npm install nodemailer
      cd ..
     ```
   - Navigate to the client directory:
      ```bash
      cd client
      npm install
      npm install react-router-dom axios
      npm install react-icons
      cd ..
      ```
   - Install Python dependencies:
      ```bash
      pip install Flask Flask-Cors numpy pandas tensorflow scikit-learn keras
      ```
2. **Update Environment Variables**
   - Open `Protein-Secondary-Structure-Prediction-and-Data-Bank\PSSP\server\.env`.
   - Update the environment variables accordingly.
     
3. **Start the Backend Server**
   - Open a terminal and navigate to the `server` directory:
      ```bash
      cd server
      npm start
      ```

4. Start the Frontend Client

   - Open a new terminal and navigate to the `client` directory:
      ```bash
      cd client
      npm run dev
      ```
   - Once the server starts, hold `Ctrl` and click on the generated link http://localhost:5173/ to open the web interface in your browser.
   
5. **Run the Flask API**
   - Execute the `app.py` script to start the Flask application:
      ```bash
      python app.py
      ```

---

## Web Application

The web interface contains the following tabs:

- **Home**: Information about proteins and their structure.
- **Data Analysis**: Insights and visualizations related to the dataset.
- **Structure Prediction**: Predict protein secondary structures from amino acid sequences.
- **Data Bank**: A repository of curated protein data.
- **Resources**: Links to external resources and documentation.
- **Admin**: Administrative panel for managing the application.

---

## Model Performance

- **Q3 Score (Accuracy)**: 88.99%
- **Confusion Matrix**:

![output](https://github.com/user-attachments/assets/d9b946ea-4caa-4b65-a92d-516008e7bee4)
![confusion_matrix](https://github.com/user-attachments/assets/fd97828e-a57a-4ea0-b303-2c0ed3528a8c)

- **Classification Report**:

![classification_report](https://github.com/user-attachments/assets/b6cc79bf-17d7-4c9b-8891-5008d74a8ba2)
  
---

## Technology Stack

- **Backend**: Flask, Node.js
- **Frontend**: React.js
- **Model Training**: Python (TensorFlow/Keras)
- **Deployment**: npm, Flask

---

## Usage

1. Start the server and client as described in the steps above.
2. Use the web interface to input amino acid sequences and obtain secondary structure predictions.

---

## Resources

- [Protein Data Bank (PDB)](https://www.rcsb.org/)
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [React.js Documentation](https://reactjs.org/)
- [Keras Documentation](https://keras.io/api/)

---

## Screenshots

![Screenshot 2025-01-05 131020](https://github.com/user-attachments/assets/5ff9fb5f-1510-4207-b055-b18e6e198801)
![Screenshot 2025-05-02 223739](https://github.com/user-attachments/assets/95b70f4f-01b0-4d9d-b269-24e0d506954c)
![Screenshot 2025-01-05 131056](https://github.com/user-attachments/assets/da7b71d5-4527-4e96-8b0b-c4773199f4fc)
![Screenshot 2025-05-02 223905](https://github.com/user-attachments/assets/720cfbae-0bab-4507-ac40-4b83242ead63)
![Screenshot 2025-01-05 131129](https://github.com/user-attachments/assets/c05191f0-ece6-418e-adf9-b2f19a98063f)
![Screenshot 2025-01-05 131158](https://github.com/user-attachments/assets/947f80ca-9761-4e28-8318-e250f49e01a5)
![Screenshot 2025-05-02 223654](https://github.com/user-attachments/assets/3f981f44-9911-4d2e-86ad-c2cd792145db)
![Screenshot 2025-01-05 131331](https://github.com/user-attachments/assets/0ae65a6e-b1c4-4843-8972-649659754929)
![Screenshot 2025-01-05 131414](https://github.com/user-attachments/assets/4bf8285d-00be-4f84-8d4e-691722270196)
![Screenshot 2025-01-05 131427](https://github.com/user-attachments/assets/05ba9e95-085e-4e4c-98e1-5c848a0af75f)
![Screenshot 2025-01-05 131439](https://github.com/user-attachments/assets/3a135fbc-d324-4eea-9d6a-ce3d73d4592e)
![Screenshot 2025-01-05 131446](https://github.com/user-attachments/assets/efab8764-22de-45d2-8648-c9773144f0a6)
![Screenshot 2025-01-05 131455](https://github.com/user-attachments/assets/a7741b2e-4a83-42dd-8a40-70defadaff24)
![Screenshot 2025-01-05 131500](https://github.com/user-attachments/assets/2798b488-e73c-4298-a0d0-c751472dadd4)
![Screenshot 2025-01-05 131530](https://github.com/user-attachments/assets/c74b113a-3711-4a16-a914-b91234eb9f87)
![Screenshot 2025-05-02 223450](https://github.com/user-attachments/assets/cbf3fe59-9258-48e4-83fe-e876f265dc85)

