import React from 'react';
import '../Styling/Resources.css';
// import accuracyImg from '../Styling/media/epoch_accuracy.png';
// import lossImg from '../Styling/media/epoch_loss.png';
// import learningRateImg from '../Styling/media/epoch_learning_rate.png';
import confmatrixImg from '../Styling/media/confusion_matrix.png';
import classrepImg from '../Styling/media/classification_report.png';
import mdlarch from '../Styling/media/model_architecture.png';



function openModal(imageSrc) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = 'block';
  modalImg.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}



const Resources = () => {
  return (
    <div className='resources-container'>
      {/* Section: AI Model Description */}
      <section className='model-info'>
        <h1>Hybrid Neural Networks for Protein Secondary Structure Prediction</h1>
        <p>
        The model was trained on an extensive dataset of 128,644 unique protein sequences, sourced from the Dictionary of Protein 
        Secondary Structure (DSSP). The dataset was split into 70% for training, 10% for validation, and 20% for testing. Due to 
        computational constraints, the maximum sequence length was limited to 256. The architecture includes an embedding layer 
        to capture dense vector representations of amino acid sequences, multiple convolutional layers to identify spatial dependencies, 
        a BiLSTM layer for capturing long-term dependencies, and a BiGRU layer for short-term dependencies, all processed through 
        time-distributed dense layers and an output layer. Techniques like dropout and L2 regularization were used to avoid overfitting 
        and improve generalization. The model's training process is optimized using techniques such as EarlyStopping, which prevents 
        overfitting, and ReduceLROnPlateau, which dynamically adjusts the learning rate. The large scale and diversity of the dataset promoted us to design a slightly more complex architecture to 
        adequately learn the intricate patterns in protein sequences. A custom metric – masked accuracy was defined to avoid inclusion 
        of padding in accuracy calculations. This approach achieved a Q3 accuracy of 88.99%, showing that hybrid architectures are effective 
        for PSSP.
        </p>
      </section>

    
    {/* Section: Confusion Matrix */}
    <section className='model-architecture'>
      <h2>Model Architecture</h2>
      <img src={mdlarch} alt="Model Architecture" onClick={() => openModal(mdlarch)} />
    </section>

      <section className='feature-descriptions'>
      <h2>Dataset Feature Description</h2>

      <div className='feature'>
        <h3>Protein Sequence (input)</h3>
        <p>
          This is the sequence of amino acids that make up the protein. Proteins are long chains of molecules called amino acids, and the order in which these amino acids are arranged determines the protein's structure and function. Each letter in the sequence represents a different type of amino acid. For example, 'A' stands for alanine, 'P' stands for proline, and so on.
        </p>
      </div>

      <div className='feature'>
        <h3>Three-State Secondary Structure Classification (dssp3)</h3>
        <p>
          Proteins fold into specific shapes, and the secondary structure represents this folding pattern. The three-state classification categorizes the protein into three basic shapes: 'C' for coils (flexible, unstructured parts), 'E' for beta sheets (flat, ribbon-like structures), and 'H' for helices (spiral-like structures). This classification helps understand how the protein's shape contributes to its function.
        </p>
      </div>

      <div className='feature'>
        <h3>Eight-State Secondary Structure Classification (dssp8)</h3>
        <p>
          This is a more detailed classification of protein structures, breaking them into eight possible states instead of three. It includes additional types of structures like turns (T), bends (B), bridges (G), and more. This finer breakdown provides more insights into the protein’s shape and flexibility.
        </p>
      </div>

      <div className='feature'>
        <h3>Unit Cell Lengths (Length a, Length b, Length c)</h3>
        <p>
          In crystallography, proteins are often arranged in a repeating 3D grid, called a unit cell. 'Length a', 'Length b', and 'Length c' are the dimensions of this cell in three different directions, measured in Angstroms (Å), which is a unit of length commonly used to measure molecules. These dimensions help determine the size and shape of the protein's crystal structure.
        </p>
      </div>

      <div className='feature'>
        <h3>Unit Cell Angles (Angle Alpha, Angle Beta, Angle Gamma)</h3>
        <p>
          These are the angles between the edges of the unit cell in the crystal structure. Proteins can crystallize into different shapes, and these angles (measured in degrees) describe the geometry of the cell. Alpha, Beta, and Gamma correspond to the angles between the edges Length b and c, Length a and c, and Length a and b, respectively.
        </p>
      </div>

      <div className='feature'>
        <h3>Crystallographic Space Group</h3>
        <p>
          The space group describes the symmetry of the crystal. Proteins can form crystals with different symmetries, and the space group notation (like 'P 21 21 21') tells scientists about the symmetry and orientation of the protein in the crystal lattice.
        </p>
      </div>

      <div className='feature'>
        <h3>Molecular Weight</h3>
        <p>
          The molecular weight of a protein is its total mass, usually measured in kilodaltons (kDa). It's calculated based on the combined weight of all the atoms in the protein. This value is important because it gives an idea of the protein's size and helps compare different proteins.
        </p>
      </div>

      <div className='feature'>
        <h3>Deposited Atom Count</h3>
        <p>
          This is the total number of atoms that were recorded when determining the protein's structure using X-ray crystallography or another method. It includes all the atoms found in the protein structure, which can range from a few hundred to thousands.
        </p>
      </div>

      <div className='feature'>
        <h3>Polymer Monomer Count</h3>
        <p>
          Proteins are polymers made up of repeating units called monomers (amino acids). This count refers to the total number of monomers (amino acids) in the protein chain. A higher number indicates a longer protein chain.
        </p>
      </div>

      <div className='feature'>
        <h3>Modelled Polymer Monomer Count</h3>
        <p>
          This is the number of monomers (amino acids) that were accurately captured in the model of the protein’s structure. Not all parts of a protein can always be modeled due to flexibility or disorder, so this count might be lower than the total number of monomers.
        </p>
      </div>

      <div className='feature'>
        <h3>Unmodeled Polymer Monomer Count</h3>
        <p>
          These are the monomers (amino acids) that were not captured in the structure model. Some parts of the protein might be too flexible or disordered to model accurately, and this count reflects how many monomers were left out.
        </p>
      </div>
      </section>

      <div class="res">
        <h1>Results</h1>
      </div>


    {/* Section: Graphs */}
    {/* <section className='model-graphs'>
      <div className='graph'>
        <h3>Accuracy</h3>
        <img src={accuracyImg} alt="Epoch Accuracy" onClick={() => openModal(accuracyImg)} />
      </div>
      <div className='graph'>
        <h3>Loss</h3>
        <img src={lossImg} alt="Loss Graph" onClick={() => openModal(lossImg)} />
      </div>
      <div className='graph'>
        <h3>Learning Rate</h3>
        <img src={learningRateImg} alt="Learning Rate Graph" onClick={() => openModal(learningRateImg)} />
      </div>
    </section> */}

    {/* Section: Confusion Matrix */}
    <section className='confusion-matrix'>
      <h2>Confusion Matrix</h2>
      <img src={confmatrixImg} alt="Confusion Matrix" onClick={() => openModal(confmatrixImg)} />
    </section>

    {/* Section: Classification Report */}
    <section className='classification-report'>
      <h2>Classification Report</h2>
      <img src={classrepImg} alt="Classification Report" onClick={() => openModal(classrepImg)} />
    </section>

    {/* Fullscreen Modal - Shared for Both Images */}
    <div id="modal" className="modal" onClick={closeModal}>
      <span className="close">&times;</span>
      <img className="modal-content" id="modalImage" />
    </div>

      {/* Section: Downloads */}
      <section className='downloads'>
      <h2>Downloads</h2>
      <div className='download-buttons'>
        <a href='/data_bank.csv' download>
          <button>Download Protein Data Bank Dataset (.csv)</button>
        </a>
        <a href='/model_dataset.rar' download>
          <button>Download Model Training Dataset (.rar)</button>
        </a>
        {/* <a href='/source_code.ipynb' download>
          <button>Download Model Source Code (.ipynb)</button>
        </a>
        <a href='/documentation.pdf' download>
          <button>Download Model Documentation (.pdf)</button>
        </a> */}
      </div>
    </section>

      {/* Section: External Links */}
      <section className='external-links'>
        <h2>External Resources</h2>
        <ul>
          <li><a href="https://www.rcsb.org/" target="_blank" rel="noopener noreferrer">RCSB Protein Data Bank</a></li>
          <li><a href="https://www3.cmbi.umcn.nl/xssp/" target="_blank" rel="noopener noreferrer">DSSP Web Server</a></li>
          <li><a href="https://dunbrack.fccc.edu/pisces/" target="_blank" rel="noopener noreferrer">PISCES Protein Sequence Culling Server</a></li>
          <li><a href="https://www.kaggle.com/datasets/alfrandom/protein-secondary-structure" target="_blank" rel="noopener noreferrer">Kaggle: Protein Secondary Structure Dataset 1</a></li>
          <li><a href="https://www.kaggle.com/datasets/kirkdco/protein-secondary-structure-2022" target="_blank" rel="noopener noreferrer">Kaggle: Protein Secondary Structure Dataset 2</a></li>
          <li><a href="https://www.kaggle.com/datasets/tamzidhasan/protein-secondary-structure-casp12-cb513-ts115" target="_blank" rel="noopener noreferrer">Kaggle: Protein Secondary Structure Dataset 3</a></li>
        </ul>
      </section>
    </div>
  );
}

export default Resources;
