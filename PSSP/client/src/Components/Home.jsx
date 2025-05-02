import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../Styling/Home.css';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { HiSquare3Stack3D } from 'react-icons/hi2';
import proteinGif from  '../Styling/media/proteins.gif';

const Home = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    Axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true })
      .then(() => {
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="profile-section" ref={dropdownRef}>
        <div className="profile-icon" onClick={toggleDropdown}>
          <FaUserCircle size={30} />
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            {/* <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
              Profile
            </Link> */}
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="home-content">
        <h1> Protein Secondary Structure Analysis </h1>

        {/* {/* <div className="search-container">
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div> */}
      </div> 



      <div className="para1">
        <p>
          <h2>1. Proteins</h2>
          Proteins are polymers of amino acids linked via αpeptide bonds. They can be represented as primary,
          secondary, tertiary, and even quaternary structures, but from a nutritional viewpoint only the primary
          (amino acid) sequence is of interest. Similarly, although there are many compounds in the body that can be
          chemically defined as amino acids, we are only concerned with the 20 canonical amino acids encoded in DNA,
          plus 5 others—ornithine, citrulline, γ -aminobutyrate, β-alanine, and taurine—that play quantitatively
          important roles in the body. <br /><br /> Of the 20 amino acids present in proteins, 9 are considered nutritionally
          indispensable (essential) in adult humans because the body is not able to synthesize their carbon skeletons.
          These 9 amino acids are leucine, valine, isoleucine, histidine, lysine, methionine, threonine, tryptophan,
          and phenylalanine. In addition, 2 others are made from their indispensable precursors: cysteine from methionine,
          and tyrosine from phenylalanine.
        </p>
      </div>

      {/* Displaying the GIF */}
      {/* <div className="gif-container">
          <img src={proteinGif} alt="Protein Structure Animation" className="protein-gif" />
        </div> */}

      <div className='para2'>
        <p>
          <h2>2. Why Is It Important to Study Proteins?</h2>
          In the drama of life on a molecular scale, proteins are where the action is.
          Proteins are molecular devices, in the nanometer scale, where biological function is exerted.
          They are the building blocks of all cells in our bodies and in all living creatures of all kingdoms.
          Although the information necessary for life to go on is encoded by the DNA molecule, the dynamic process
          of life maintenance, replication, defense and reproduction are carried out by proteins.
          There are twenty natural amino acids, whose frequency is higher than other special ones with particular
          functions. These twenty amino acids can be grouped together forming polypeptide chains, or proteins, in
          different ways determined by the genetic code and limited by stereochemical properties. These proteins
          may have a constitutive or transient cell expression in regard to its functions. It is worth mentioning
          that efforts are underway to make proteins of unnatural amino acids as well. <br /><br /> The Gene Ontology
          Project uses three categories to describe a gene product or protein. Molecular Function is the category that
          describes the tasks performed by individual proteins and can be broadly divided into twelve subcategories;
          namely cellular processes, metabolism, DNA replication/modification, transcription/translation, intracellular
          signaling, cell-cell communication, protein folding/degradation, transport, multifunctional proteins,
          cytoskeletal/structural, defense and immunity, and miscellaneous functions. Structural proteins, for example,
          are responsible for the cell integrity and cell overall shape, their functions varies from composing the
          cytoskeleton to assembling transmembrane ion channels, a structure essential for cell osmolarity and even
          for synaptic information flux. Not only the DNA molecule cannot replicate itself without protein machinery
          such as the transcription complex, or transcription bubble; but also the mitosis and meiosis events of cell
          duplication and gamete production cannot go on without proteins performing crossing-over events and
          chromosome segregation. The immune system, responsible for our body's defense, is based on structure
          recognition, on differentiation of self from non-self; this can only be possible through specialized
          cells that can bind and identify what is foreign to the body. Such recognition processes occurs via
          protein-protein interactions on the surface of the immune system's cells, where binding affinity can
          determine if an immune response will or will not be initiated, and also where non-appropriated protein
          interactions or recognition can cause auto-immune diseases. Biochemical reactions of cell breathing,
          oxygen and carbonic gas transport, food absorption, energy usage, energy storage, heat or cold
          physiological reactions, or any life process one can figure out, is basically carried out by a protein,
          or a protein complex. All processes taking place in a living organism have proteins acting somewhere,
          in a precise way, developed under the pressures of natural selection.<br /><br /> These are only some examples of
          protein function. A remarkable fact is that all tasks they can perform are based on a common principle,
          the twenty amino acids that can form a protein. That is the reason why studying proteins, their
          composition, structure, dynamics and function, is so important. We must understand how these molecules
          fold, how they assemble into complexes, how they function if we wish to answer questions such as why we
          have cancer, why we grow old, why we get sick, how can we find cures for many diseases, why life as we
          know it has evolved in this way and on this planet and not anywhere else, at least for the moment.
          All proteins functions are dependent on their structure, which, in turn, depends on physical and chemical
          parameters. This is other important fact on studying these molecules; classical biological, physical,
          chemical, mathematical and informatics sciences have been working together in a new area known as
          bioinformatics to allow a new level of knowledge about life organization.
        </p>
      </div>

      <div className='para3'>
        <p>
          <h2>3. Explosion of Biological Sequence and Structure Data</h2>
          Proteins have traditionally being studied individually. A protein of interest had its coding sequence identified
          and cloned in a proper expression vector. Hence, provided that cloning, expression and purification were successful,
          enough quantities of pure proteins could be employed in biochemical experiments or used to prepare solutions for NMR
          spectroscopy or to grow crystals for structure determination by X-ray crystallography. With the sequencing technology
          advances in the early 80's, the paradigm shifted from studying single proteins to whole set of proteins of an organism.
          From the second half of the 90's we can observe an exponential growth of the biological sequence and structure data,
          mainly due to the Genome Projects underway in different countries around the world, both on public and private industries.
          As of April 2007, there were 1952 genome projects, of which 343 are of published complete genomes, 993 and 588 are of
          ongoing prokaryotic and eukaryotic genomes, respectively, and 28 of metagenomes.
          Number of sequences available in the GenBank as of December 15, 2005. The biological data explosion in mid 90's can be
          easily seen with the exponential growth from 1995. These data area stored in databases or data banks whose number
          increases every year. According to Galperin there are 858 databases, 139 more than the previous year, available to
          the public. The amount of data produced urged the necessity for fast and reliable ways of accessing, retrieving,
          researching and understanding these data. Bioinformatics tools are used to perform such tasks in all biological
          databases, of which GenBank at NCBI and the RCSB/PDB are the most representative for sequences and structures,
          respectively.
          <br /><br />

          <h3>3.1 The GenBank® Database</h3>
          GenBank, possibly the most widely known biological primary database, contains publicly available DNA sequences for more than
          205,000 different species, obtained largely through submissions from individual laboratories and batch submissions from
          large-scale sequencing projects. Together with the EMBL Data Library in Europe and the DNA Data Bank of Japan, they make the
          three most important sequence databases with daily exchange of data, designed to provide and encourage access within the
          scientific community to the most up to date and comprehensive DNA sequence information, ensuring worldwide coverage.
          As of December 15, 2005 there are 52,016,762 sequences in GenBank®. A BLAST search on February 8, 2006 revealed that out
          of the number above 3,284,262 sequences are non-redundant (nr) coding sequences (CDS), excluding environmental samples. The nr
          sequences are updated regularly; hence its value can change from one week to another.
          <h3>3.2 The RCSB/PDB Database</h3>
          The Research Collaboratory for Structural Bioinformatics (RCSB) Protein Data Bank (PDB) provides an information web resource to
          biological macromolecular structures. It includes tools and resources for understanding the relationship between sequence,
          structure and function of biological macromolecules. As of February 7, 2006 there were 35,026 structures in the RCSB/PDB, of
          which 33,429 are proteins, including those making up complexes with nucleic acids.
          Growth of the total number of structures in the RCSB/PDB data base (Kouranov et al., 2006). The exponential growth follows the
          same pattern of Fig 1.
          As in the GenBank nr sequences, if we use a 90% sequence identity cutoff to eliminate redundancy in the protein structure data
          bank we end up with 12,611 clusters or distinct sets of structures. If we now assume this number represents the different types of
          known protein folds and compare it to the different types
          of known protein sequences, from the nr database of GenBank®, we conclude that only 0.38% of the available protein sequences
          have known folds. Using 1028, the current number of folds determined by SCOP [As Folds Defined By SCOP], the number
          of protein sequences with known folds, 0,03%, is considerably smaller. This is in part due to the faster rate with which protein
          sequences can be determined (from CDS) as compared to the determination of novel protein 3D structures. <br /><br />[Comment: Also, many
          protein sequences have similar 3D folds, and many of these sequences have little sequence similarity to other sequences with the
          same 3D fold. This is one main reason why the number of SCOP folds is much less than that predicted by simple sequence similarity.]
          Clearly, computational methods that are complementary to experimental methods for the determination of protein structures are necessary,
          and these can be provided by structural bioinformatics efforts.
          According to the Oxford English Dictionary, Structural Bioinformatics is conceptualizing biology in terms of molecules, in the
          sense of physical chemistry and applying informatics techniques, derived from disciplines such as mathematics, computer science
          and statistics, to understand, organize and explore the structural information associated to these molecules on a large scale.
          There are several computational methods for protein structure determination, including homology modeling, fold
          recognition via threading, and ab initio methods. The huge increase in the amount of sequence and structure data of
          proteins together with advances in experimental and computational, bioinformatics methods, are improving our knowledge about
          the relationship between protein sequence, structure, dynamics and function. This knowledge, in turn, is being used to
          understand how proteins interact with other molecules such as small molecules or ligands that can become a drug candidate.
          In the following sections the hierarchy of protein structure and its application to drug design in tropical disease will be
          described. The last section is an exercise that will enable the reader or student to apply several bioinformatics tools
          starting from a partial DNA sequence or protein accession number and yielding a model of its structure and function.
        </p>
      </div>

      <div className='para4'>
        <p>
          <h2>4. Basic Principles of Protein Structure</h2>
          When an all atom model of a protein structure is seen for the first time (be it a figure, a three-dimensional model or a computer graphics representation) it may appear a daunting task to decipher any underlying pattern within it. After all, such structures typically contain thousands if not tens- or hundreds-of-thousands of atoms. For this reason, it is often considered convenient to simplify the problem by using a hierarchical description of protein structure in which successive layers of the hierarchy describe increasingly more complex levels of organization. Typically four levels are used and referred to as the primary, secondary, tertiary and quaternary structure of a protein. <br /><br />It is often useful to include two additional intervening levels between the secondary and tertiary structures, which are referred to as super secondary structures and domains. Many excellent textbooks exist on the subject which should be consulted for more detailed information (1, 29–31). Here, we will attempt only to give an outline in order to emphasize the importance of the study of the three-dimensional structure of proteins for the drug design process which will be described towards the end of this chapter.

          <h3>4.1 Primary structure</h3>
          The primary structure of a protein originally referred to its complete covalent structure but is more frequently interpreted as being the sequence of amino acids of each polypeptide chain of which the protein is composed. These are often one and the same thing but disulphide bonds and other rarer types of covalent bond formed between amino acid side chains are not directly encoded by the sequence itself.

          A polypeptide chain is a unidimensional heteropolymer composed of amino acid residues. There are basically only twenty naturally occurring amino acids which are directly encoded by the corresponding gene, although in exceptional cases stop codons can be used for the incorporation of two additional amino acids (selenocysteine and pyrrolysine). All of these amino acids are α-amino acids which possess the generic structure given in Figure 3a. Common to all such amino acids is the amino group, carboxylic acid group and hydrogen bound to the central carbon atom (the α carbon). Only the R group (also known as the side chain) differs from one amino acid to another and it varies in terms of size, polarity, hydrophobicity, charge, shape, volume etc. With the twenty different amino acids available, nature is able to produce the wide diversity of functions which proteins perform in living organisms. <br /><br />

          <h3>4.2 Secondary structure</h3>
          Not all combinations of ϕ and ψ are stereochemically possible, since many (such as 0o/0o for example) lead to steric hindrance. In fact, as shown originally by Ramachandran, only about one third of ϕ/ψ space is stereochemically accessible to amino acid residues in a real polypeptide.

          If the ϕ and ψ angles are repeated systematically for all residues within a stretch of polypeptide, the result will inevitably be a helix. An infinite number of types of helix are theoretically possible, depending on the combination of ϕ and ψ, and they may be conveniently characterized by two parameters, n and d, corresponding respectively to the number of residues per helical turn and the shift parallel to the helical axis per residue. There are convenient mathematical relationships which relate ϕ and ψ to n and d.

          However, of all the theoretically possible helices, only a limited number occur with any frequency in protein structures. <br /><br /> Those which are most important in the case of globular proteins correspond to the α-helix (ϕ ≈ -63o, ψ ≈ -42o, n = +3.6, d = 1.5Å) and the β-strand (ϕ ≈ -120o and ψ ≈ +135o, n = -2.3, d = 3.3Å). These are the most important types of secondary structure and correspond to small stretches of consecutive residues. The negative n value in the case of the β-strand indicates that it is a left-handed helix, whereas the α-helix is right-handed. The fact that the n parameter is close to 2 for β-strands (the minimum value theoretically possible) means that strands are in fact very stretched out helices with a narrow main chain diameter. Consequently the side chains emerge alternately on opposite sides of the strand, giving rise to a zig-zag or pleated appearance.

          The α-helix is particularly abundant in both globular and some fibrous proteins due to its inherent stability. This arises as a consequence of several factors including the presence of consecutive hydrogen bonds between the carbonyl of residue i and the NH of residue i+4, the radius of the helix which is compatible with Van de Waals contacts across the helical axis and the possibility of forming ion pairs (salt bridges) between oppositely charged residues separated by 3 or 4 residues along the sequence. The hydrogen bonds are particularly strong due to the ideal separation between donor (nitrogen) and acceptor (oxygen) atoms as well as due to their linearity and dipolar alignment.
          <h3>4.3 Tertiary structure</h3>
          In order to form globular structures, the individual elements of secondary structure of a polypeptide must pack against one another in order to form a stable, compact and biologically active tertiary structure. The ways in which secondary structures most commonly pack has been widely studied (43–45). The most simple models which aim to explain experimental observations are based on the interdigitation of side chains. The final result of the folding process is the full three-dimensional structure of the polypeptide. Clearly, this depends on the amino acid sequence and therefore on the atomic details of the structure. However, for soluble proteins this will almost inevitably result in the generation of a hydrophobic core in which apolar residues tend to cluster their side chains within the protein's interior, leaving hydrophilic residues exposed to solvent.
          This is often referred to as the fold of the protein. Many classifications of protein folds exist and two of the most widely used are SCOP and CATH, both of which use a hierarchical approach.
          <h3>4.4 Quaternary structure</h3>
          Some proteins (a minority) are composed only of a single polypeptide chain. The remainder are homo- or hetero-oligomers or macromolecular assemblies or polymers. In a recent evaluation of the proteins encoded by the E. coli genome, only about 20% were expected to be monomeric. Dimers were the most common, representing nearly 40% of all proteins, followed by tetramers (21%). When two subunits (polypeptide chains) interact to form an interface, two possibilities exist; the interface may be either isologous or heterologous. In the first case, the association leads to the formation of a symmetric dimer possessing a two-fold (diad) axis, in which if a region A on the first subunit interacts with a region B on the second, then region A of the second will necessarily interact with region B on the first. In the case of heterologous interactions this is not the case. They may be either symmetric, leading to ring-like structures possessing symmetry axes of higher order (&gt;2) or asymmetric. The resulting structures are generally approximately spherical and are used as storage molecules (such as ferritin for example) or as viral capsids. Furthermore, translational symmetry can be added to the rotation axes to produce helical symmetry as seen in microtubles, tobacco mosaic virus and other filamentous structure. <br></br>

          <h3>4.5 A final comment on protein structure</h3>
          The reason for interest in the full three-dimensional structure of a protein is generally to understand its biological activity or to interfere with it, as for example in the case of drug design (see below). In both cases a merely topological description is clearly insufficient because biological activity depends on atomic detail and often apparently subtle modifications to a structure can dramatically affect its activity. Here we do not have space for full descriptions of even a limited number of protein families. However, in the following section it should become evident that the knowledge of a high resolution atomic structure of a target protein is an essential pre-requisite for structure based drug design.
        </p>
      </div>
    </div>
  );
};


export default Home;

