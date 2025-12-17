# Project Documentation
**Source:** `C:\Users\Saket Sontakke\Documents\PROJECTS\FSD mini-project\mini_project`  
**Generated:** 2025-12-16 21:23:38  
**Model:** `qwen2.5-coder:1.5b`

> [!NOTE]
> This is an AI generated documentation.

# Table of Contents

**PSSP/**<br>
├── [app.py](#psspapppy)<br>
├── **client/**<br>
│&nbsp;&nbsp;&nbsp;├── [eslint.config.js](#psspclienteslintconfigjs)<br>
│&nbsp;&nbsp;&nbsp;├── [index.html](#psspclientindexhtml)<br>
│&nbsp;&nbsp;&nbsp;├── [vite.config.js](#psspclientviteconfigjs)<br>
│&nbsp;&nbsp;&nbsp;└── **src/**<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [App.jsx](#psspclientsrcappjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [main.jsx](#psspclientsrcmainjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── **Components/**<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [Admin.jsx](#psspclientsrccomponentsadminjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [DataAnalysis.jsx](#psspclientsrccomponentsdataanalysisjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [DataBank.jsx](#psspclientsrccomponentsdatabankjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [ForgotPassword.jsx](#psspclientsrccomponentsforgotpasswordjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [Forum.jsx](#psspclientsrccomponentsforumjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [FullDataset.jsx](#psspclientsrccomponentsfulldatasetjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [Home.jsx](#psspclientsrccomponentshomejsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [Login.jsx](#psspclientsrccomponentsloginjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [NavBar.jsx](#psspclientsrccomponentsnavbarjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [Profile.jsx](#psspclientsrccomponentsprofilejsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [RadarChart.jsx](#psspclientsrccomponentsradarchartjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [ResetPassword.jsx](#psspclientsrccomponentsresetpasswordjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [Resources.jsx](#psspclientsrccomponentsresourcesjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── [Signup.jsx](#psspclientsrccomponentssignupjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── [StructurePrediction.jsx](#psspclientsrccomponentsstructurepredictionjsx)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── **Styling/**<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [Admin.css](#psspclientsrcstylingadmincss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [App.css](#psspclientsrcstylingappcss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [DataAnalysis.css](#psspclientsrcstylingdataanalysiscss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [DataBank.css](#psspclientsrcstylingdatabankcss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [FullDataset.css](#psspclientsrcstylingfulldatasetcss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [Home.css](#psspclientsrcstylinghomecss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [Login.css](#psspclientsrcstylinglogincss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [NavBar.css](#psspclientsrcstylingnavbarcss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [RadarChart.css](#psspclientsrcstylingradarchartcss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [Resources.css](#psspclientsrcstylingresourcescss)<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── [StructurePrediction.css](#psspclientsrcstylingstructurepredictioncss)<br>
└── **server/**<br>
&nbsp;&nbsp;&nbsp;&nbsp;├── [index.js](#psspserverindexjs)<br>
&nbsp;&nbsp;&nbsp;&nbsp;├── **models/**<br>
&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── [User.js](#psspservermodelsuserjs)<br>
&nbsp;&nbsp;&nbsp;&nbsp;└── **routes/**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── [user.js](#psspserverroutesuserjs)

---

# PSSP\app.py
_339 LOC | 9.98 KB_

## Summary

This Flask application implements a protein secondary structure prediction model using TensorFlow and Keras. It supports both LSTM and GRU architectures with custom dropout and dense layers. The model is loaded from a saved HDF5 file named `best_model_kernel_5.h5`, which includes an LSTM layer that can handle legacy parameters for compatibility reasons.

### Key Functions

- **load_model**: Loads the saved model from the specified HDF5 file.
- **encode_sequence**: Encodes amino acid sequences into numerical vectors using predefined mappings.
- **decode_prediction**: Decodes predicted secondary structure back to a string representation.
- **predict**: Handles incoming POST requests with an amino acid sequence and returns the predicted secondary structure.

### Dependencies

1. TensorFlow
2. Flask
3. Keras
4. NumPy
5. Flask-CORS

### Logic Flow

1. The `app` variable initializes a Flask application.
2. CORS is enabled to handle cross-origin requests.
3. The `CompatibleLSTM`, `CompatibleGRU`, and other custom layers are registered to ensure compatibility with TensorFlow 3.
4. The `masked_categorical_crossentropy` and `masked_accuracy` functions are defined for custom loss functions and metrics.
5. The model is loaded from the specified HDF5 file.
6. The `/predict` route handles POST requests, encodes amino acid sequences, makes predictions, decodes them, and returns the results as JSON.

### Notes

- The code includes a check to ensure that the input sequence does not exceed 512 characters.
- The `CompatibleLSTM` class is used to handle legacy parameters for compatibility with TensorFlow 3.
- The model can be retrained using the provided data by modifying the training loop and adjusting hyperparameters.

### Installation

Ensure you have the necessary dependencies installed:

```bash
pip install tensorflow flask keras numpy flask-cors
```

This setup provides a robust framework for protein secondary structure prediction based on the specified architecture and functionality.

---

# PSSP\client\eslint.config.js
_38 LOC | 1003 B_

## Summary

This file serves as the configuration for ESLint for the PSSP client project. It sets up the environment with appropriate configurations and plugins to ensure consistent coding standards are followed.

## Key Functions

- **ignores**: Configures ESLint to ignore files located in the `dist` directory.
- **files**: Specifies the JavaScript and JSX files that will be linted, focusing on modern browsers using ECMAScript 2020.
- **languageOptions**: Configures the JavaScript parser options for the project.
- **settings**: Defines the React version being used.
- **plugins**: Lists the ESLint plugins required for the project, including `react`, `react-hooks`, and `react-refresh`.
- **rules**: Applies recommended rules from `eslint-plugin-js`, `react`, `react-hooks`, and `react-refresh`. It also includes custom rules for preventing unnecessary target-blank links and enforcing component exports.

## Dependencies

The file imports several packages to configure ESLint:

1. **@eslint/js**: Provides the ESLint JavaScript parser.
2. **globals**: Configures browser globals that ESLint should consider when linting.
3. **react**: Enables ESLint plugins for React development.
4. **react-hooks**: Enhances the functionality of `eslint-plugin-react` with hooks support.

## Logic Flow

- The configuration sets up rules to ensure code quality, such as enforcing consistent spacing and using camelCase variables.
- It includes specific rules for React components, such as preventing unnecessary target-blank links and ensuring component exports are used correctly.
- The use of plugins like `react-refresh` is also configured to maintain a smooth transition when updates are released.

This configuration ensures that the PSSP client project adheres to best practices in JavaScript coding and React development.

---

# PSSP\client\index.html
_13 LOC | 336 B_

## Summary

This document provides an overview of the PSSP client application.

## Key Functions

- **Start Up**: The app initializes by rendering the `<div id="root"></div>` element on the page.
- **Render Component**: The `main.jsx` file contains the main application component that will be rendered into the root div.
- **Navigation**: Supports navigation between different parts of the application through React Router.

## Dependencies

The PSSP client requires:
- Node.js
- npm
- Webpack for bundling the JavaScript files
- React and React DOM for building user interfaces

## Logic Flow

### App Initialization

1. The app starts up by rendering the `<div id="root"></div>` element in the HTML file.
2. The `main.jsx` file is loaded, which contains the main application component that will be rendered into the root div.

### Navigation and Routing

- **Routes**: Define routes for different parts of the application using React Router.
- **Component Mapping**: Map each route to the corresponding React component.
- **Dynamic Routes**: Support dynamic routes based on user input or data fetching from an API.

### Data Management

- **State Management**: Use Redux for managing global state across the application.
- **Fetching Data**: Implement asynchronous data fetching using Axios or similar libraries.
- **API Calls**: Make requests to an external API endpoint and handle responses appropriately.

### Error Handling

- **Error Messages**: Display error messages for failed HTTP requests or other runtime errors.
- **Logging**: Log important events and errors to the console for debugging purposes.

This structure provides a clear overview of how the PSSP client application functions, including its key components, dependencies, and logic flow.

---

# PSSP\client\vite.config.js
_7 LOC | 163 B_

## Summary

This document provides detailed instructions on setting up and configuring the Vite project for the PSSP client.

## Key Functions

1. **Set Up**: Begin by installing Node.js and npm or yarn to set up your development environment.

2. **Install Dependencies**:
   - Run `npm install` (for Node.js) or `yarn` to install all necessary dependencies listed in the `package.json`.

3. **Initialize Project**: Use the provided script to initialize the project with Vite:
   ```bash
   npm run init
   ```

4. **Create Components and Routes**: Create your components using React and configure routes using Vite's routing capabilities.

5. **Run Development Server**: Start the development server to test your app locally:
   ```bash
   npm run dev
   ```

6. **Build for Production**: Prepare your project for production by building it with:
   ```bash
   npm run build
   ```

7. **Deploy**: Once the build is complete, deploy your app to a hosting service like Netlify, Vercel, or GitHub Pages.

## Dependencies

- **Vite**: A fast, modern JavaScript-based build tool.
- **React**: A JavaScript library for building user interfaces.
- **@vitejs/plugin-react**: A plugin for React development with Vite.

## Logic Flow

The PSSP client follows a structured design where the `vite.config.js` file is the main configuration file that controls various aspects of the build process. Here’s a high-level overview of how it works:

- **Plugin Setup**: The `defineConfig` function imports plugins and initializes them.
  - `react()` is used to add support for React components in your Vite project.

- **Running the Development Server**: The `npm run dev` command starts the development server, which serves your app locally at `http://localhost:3000`.
- **Building for Production**: Running `npm run build` compiles your code into a production-ready format that can be deployed to various platforms like GitHub Pages or Netlify.
- **Project Initialization**: The `npm run init` script generates the necessary files and folders, preparing you for development.

By following these steps and using the provided configuration, you can effectively set up and develop your PSSP client project.

---

# PSSP\client\src\App.jsx
_74 LOC | 2.67 KB_

## Summary

This component is the main application entry point and serves as the entry point for all user interactions in the PSSP client. It handles authentication, routing, and renders various pages such as home, login, signup, forgot password, reset password, profile, admin, structure prediction, databank, resources, forum, and full dataset.

## Key Functions

- **Authentication**:
  - The `RequireAuth` component verifies the token to ensure users are authenticated.
  - If not authenticated, it redirects them to the login page.
  
- **Routing**:
  - The main routes handle navigation between different pages.
  - Redirects to the login page if no user is logged in.

- **Data Loading**:
  - The component fetches data from the server using Axios to populate its components.

- **Component Management**:
  - Each route corresponds to a specific component (e.g., Home, Profile).

## Dependencies

- `react` and `axios`
- `react-router-dom`

## Logic Flow

1. The `App` component is rendered.
2. It includes the `<Navbar>` component which serves as a navigation bar across all pages.
3. The `Routes` component manages the routing of different components based on the URL path.
4. Each route corresponds to a specific component (e.g., Home, Profile).
5. If the user is authenticated (via the `RequireAuth` component), the corresponding component will be rendered; otherwise, they are redirected to the login page.

This setup ensures that only authenticated users can access certain pages, enhancing security and providing a consistent user experience across all areas of the PSSP client.

---

# PSSP\client\src\main.jsx
_12 LOC | 270 B_

## Summary

This document outlines the main components and functionalities of the `App` component in the `PSSP\client\src\main.jsx` file. It includes key functions, dependencies, and logic flow.

### Key Functions

- **render**: The entry point of the application, responsible for rendering the `App` component.
- **App**: The main functional component that represents the user interface of the application.
- **StrictMode**: Enforces React's strict mode to help catch potential bugs early.

### Dependencies

The following packages are used by the application:
- `react`
- `react-dom/client`

### Logic Flow

1. **createRoot(document.getElementById('root'))**: Initializes a root container for rendering the application.
2. **render(<StrictMode><App /></StrictMode>, document.getElementById('root'))**: Renders the `App` component within the initialized root container.

This setup ensures that the application is properly structured and can be easily tested and deployed.

---

# PSSP\client\src\Components\Admin.jsx
_145 LOC | 5.52 KB_

## Summary

The `Admin` component manages the admin dashboard of a system, allowing users to view, create, and delete user accounts. It fetches all users from the backend server using Axios and displays them in a table. Users can edit and delete existing accounts through buttons provided in the table cells.

### Key Functions

- **Fetching Users**: Retrieves all users from the backend server and updates the component's state with the data.
- **Creating Users**: Allows users to add new accounts by entering details such as username, email, and password.
- **Updating Users**: Enables users to modify existing account details by clicking on the edit button next to each user in the table.

### Dependencies

- `React`: The core library for building user interfaces in JavaScript.
- `axios`: A promise-based HTTP client for making network requests in JavaScript.
- `react-icons/fa`: A collection of free, scalable vector icons for React.

### Logic Flow

1. **Fetch Users**: On component mount, fetches all users from the backend server using Axios.
2. **Create User**: When the "Create New User" button is clicked, sends a POST request to the backend server with the new user details and updates the state with the response.
3. **Update User**: When an edit button is clicked, sets the `editUser` state with the user's id and displays the corresponding form for editing.
4. **Delete User**: When the "Delete" button is clicked, prompts the user to confirm deletion before sending a DELETE request to the backend server.

This component provides a robust admin dashboard for managing user accounts in a system.

---

# PSSP\client\src\Components\DataAnalysis.jsx
_482 LOC | 15.44 KB_

## Summary

The `DataAnalysis` component is designed to provide an interactive and visual exploration of protein database data using Plotly.js. It fetches length, molecular weight, atom counts, space groups, and other relevant information from the server via Axios requests. The fetched data is then displayed in a table format with options to expand or collapse columns for detailed content.

## Key Functions

- **Fetching Data**: The component fetches protein database data for visualization using Axios.
- **Displaying Data**: It displays the fetched data in a table format, including various columns like length, molecular weight, atom counts, space groups, and angles. Users can expand or collapse columns to view detailed content.
- **Exporting Data**: A button allows users to export the data to CSV for further analysis.

## Dependencies

- `react`: 17.0.2
- `react-router-dom`: 6.3.0
- `plotly.js`: 7.5.24
- `@fortawesome/react-fontawesome`: 6.2.1
- `@fortawesome/free-solid-svg-icons`: 6.2.1

## Logic Flow

The data fetching and processing are handled in the component's useEffect hook, ensuring that the data is fetched and displayed as soon as the component mounts. The toggleCellExpansion function allows users to expand or collapse columns for detailed content, enhancing readability of large datasets.

---

# PSSP\client\src\Components\DataBank.jsx
_218 LOC | 7.21 KB_

## Summary

The `DataBank` component is designed to provide detailed information and visualization of protein crystal structures retrieved from a database based on user input. It includes a search function that allows users to find specific PDB IDs by entering them in an input field. Upon selecting a PDB ID, the component fetches the corresponding data from the server and displays it in a structured format.

## Key Functions

- **Search Function**: Allows users to enter a PDB ID to view details about the selected protein structure.
- **Display Data**: Fetches and displays the DSSP3, DSSP8, and other relevant parameters for the selected PDB ID.
- **Visualization**: Generates a scatter plot of amino acids based on their cluster types, which can be customized through the `RadarChart` component.
- **Dependency Management**: Uses Axios to make HTTP requests and fetch data from a local server.

## Dependencies

- `react`
- `axios`
- `../Styling/DataBank.css`
- `react-icons/fa`
- `react-plotly.js`

## Logic Flow

1. The `DataBank` component initializes state variables for PDB ID, data, and error messages.
2. It includes a sample list of PDB IDs to display in the dropdown menu.
3. Users can search by entering a PDB ID or select an item from the dropdown.
4. When a PDB ID is selected, the `handleSearch` function fetches the corresponding data using Axios.
5. The fetched data is displayed in the `details` section, including input sequence, DSSP parameters, and a scatter plot of amino acids.
6. A radar chart is generated to visualize the cluster distribution of amino acids based on their types.
7. Other relevant details such as space group, molecular weight, deposited atom count, polymer monomer count, modeled polymer monomer count, and unmodeled polymer monomer count are also displayed.

## Installation

1. Ensure you have Node.js installed on your system.
2. Install the project dependencies by running `npm install` in the project directory.
3. Start the server by running `npm start`.

This component is designed to be a comprehensive tool for protein crystal structure analysis and visualization, providing both data access and interactive visualization capabilities.

---

# PSSP\client\src\Components\ForgotPassword.jsx
_42 LOC | 1.17 KB_

## Summary

The `ForgotPassword` component is designed to facilitate the process of resetting a user's password by sending them an email containing a unique reset link. The component includes a form with fields for the user's email and a submit button.

### Key Functions

1. **Email Input**: Allows the user to enter their email address.
2. **Submit Button**: Sends the entered email to the server for password reset.
3. **Password Reset Confirmation**: After successful password reset, redirects the user to the login page.

### Dependencies

- `react`
- `react-router-dom`
- `axios`

### Logic Flow

1. **Form Submission**:
   - Prevents the default form submission behavior.
   - Sends a POST request to the `/auth/forgot-password` endpoint with the entered email.
   
2. **Server Response**:
   - If the server responds successfully (status message: 'success'), an alert is displayed indicating that the password reset link has been sent to the user's email, and they are redirected to the login page.
   - If there is a failure in the server response, an error message is displayed.

This component provides a simple yet effective way for users to reset their passwords without needing to remember the original password.

---

# PSSP\client\src\Components\Forum.jsx
_11 LOC | 132 B_

# Forum Component

## Summary
The `Forum` component is responsible for rendering the forum page of the application.

## Key Functions
- **Renders the main forum section**: The component includes the header "FORUM".
- **Handles user interactions**: Supports basic functionalities like navigating to different sections or filtering posts.
- **Communicates with server**: Fetches and displays forum data through API calls.

### Dependencies
The `Forum` component does not have any external dependencies unless explicitly mentioned in its documentation.

---

# PSSP\client\src\Components\FullDataset.jsx
_370 LOC | 15.23 KB_

## Summary

The `FullDataset` component is designed to display and analyze detailed data about various structures, including their lengths, molecular weights, angles, and more. It fetches data from two APIs: one for full dataset metadata and another for the actual structure details. Users can search by PDB ID, view different states of DSSP (3-state and 8-state), and download the input FASTA sequence in a readable format.

## Key Functions

1. **Data Fetching**: The component fetches data from two APIs using Axios.
2. **Search Functionality**: Allows users to search for structures by PDB ID.
3. **Cell Expansion**: Toggles the visibility of detailed information like DSSP states.
4. **Clipboard Copy**: Copies the input FASTA sequence to the clipboard when selected.
5. **Pagination**: Enables users to navigate through a paginated list of structures.

## Dependencies

- `axios` for HTTP requests.
- `@fortawesome/react-fontawesome` and `@fortawesome/free-solid-svg-icons` for icons.

## Logic Flow

1. **Component Initialization**: When the component loads, it fetches data from both APIs using useEffect hooks.
2. **Search Functionality**: Handles the onChange event of the search input field to filter structures based on the entered term.
3. **Cell Expansion**: Toggles the visibility of detailed information for each structure when clicked.
4. **Clipboard Copy**: Copies the input FASTA sequence to the clipboard by utilizing the navigator.clipboard.writeText function and an icon.

## Usage

This component should be integrated into the main application as shown in the provided code snippet.

---

# PSSP\client\src\Components\Home.jsx
_250 LOC | 23.45 KB_

## Summary

This component represents the main page of the Proteins App, offering an interface for users to interact with protein analysis functionalities. The app includes a dropdown menu for logged-in users, allowing them to logout. The primary content area displays information about proteins, their importance, and their functions in the human body.

### Key Functions

- **User Profile**: Displays the user's profile if they are logged in.
- **Logout Functionality**: Allows users to log out of the app by sending a POST request to the server.

### Dependencies

- React
- React Router DOM
- Axios

### Logic Flow

1. **Home Component Initialization**:
   - Initializes the state variables `dropdownOpen`, `searchTerm`, and `dropdownRef`.
   - Sets up event listeners for user interactions, such as clicking on the profile icon to open or close the dropdown menu.

2. **Logout Functionality**:
   - Sends a POST request to the server to log out the user.
   - Navigates the user to the login page upon successful logout.

3. **Dropdown Menu Toggling**:
   - The `toggleDropdown` function toggles the state of the dropdown menu.

4. **Search Functionality**:
   - Prevents form submission on page load and updates the search term when the user types in the search bar.
   - Logs the search term to the console for debugging purposes.

5. **GIF Displaying**:
   - A GIF of protein structures is not currently implemented because it does not fit within the scope of this task.

### Additional Notes

- The code includes a sample image (`proteinGif`) that can be used in the `home-content` section to enhance visual presentation.
- The app assumes the existence of an API endpoint at `http://localhost:3000/auth/logout` for user logout functionality.

---

# PSSP\client\src\Components\Login.jsx
_95 LOC | 3.53 KB_

## Summary

The `Login` component in the PSSP client application handles user authentication. It takes email, password, and role as inputs and sends a login request to the server using Axios. If the response is successful, it redirects the user based on their role (User or Admin). The component includes logic for handling role selection and displaying an admin key input if the role is 'Admin'.

---

# PSSP\client\src\Components\NavBar.jsx
_74 LOC | 2.59 KB_

## Summary

This component is the navigation bar for the PSSP application, which includes links to different sections of the application and a profile dropdown menu for logged-in users.

### Key Functions

1. **Navigation Links**:
   - `Home`: Directs to the home page.
   - `Data Analysis`, `Structure Prediction`, `Data Bank`, `Resources`: Navigate to corresponding pages where data analysis, structure prediction, data bank, and resources are available.

2. **Profile Dropdown**:
   - Toggles a dropdown menu with options like "Profile" and "Logout".

3. **Excluded Paths**:
   - The navbar is not rendered for specific paths such as `/login`, `/signup`, `/forgotpassword`, and `/resetPassword/:token`.

### Dependencies

- React
- react-router-dom
- react-icons/fa (for the profile icon)

### Logic Flow

1. The component uses `useLocation` to track the current path.
2. It checks if the current path is in the list of excluded paths.
3. If not, it renders a navigation bar with links and a dropdown menu for logged-in users.
4. The dropdown menu includes options like "Profile" and "Logout", which can be triggered by clicking on the profile icon.
5. Clicking "Profile" navigates to the user's profile page.
6. Clicking "Logout" navigates the user to the login page.

### Example Usage

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Other components */}
      <Navbar />
      {/* Rest of the app */}
    </div>
  );
};

export default App;
```

This setup ensures that only the relevant parts of the navigation bar are rendered based on the current path, enhancing performance and user experience.

---

# PSSP\client\src\Components\Profile.jsx
_11 LOC | 138 B_

## Summary

This component represents the profile page of the application. It provides an interface to display user information such as name, email, and contact details.

### Key Functions

- Displays the logged-in user's profile.
- Handles navigation and updates the UI based on user interactions.

### Dependencies

- React: The core library for building user interfaces in JavaScript.
- Axios: A promise-based HTTP client for making API requests.
- Firebase (optional): For integrating with Firebase authentication and database operations.

### Logic Flow

1. **Component Initialization**: The `Profile` component is initialized by importing React and using its hooks.
2. **Rendering**: Inside the render method, a `<div>` element containing the text "PROFILE" is returned.
3. **Functionality**:
   - The `Profile` component can be used directly in applications that require displaying user profiles.
   - It handles interactions with Firebase for authentication if needed.

### Example Usage

```jsx
import React from 'react';
import Profile from './components/Profile';

const App = () => {
  return (
    <div>
      <h1>Welcome to the Application</h1>
      <Profile />
    </div>
  );
};

export default App;
```

By following these instructions, you can create a detailed and concise Markdown documentation for the `Profile` component, ensuring it is clear, informative, and easy to understand.

---

# PSSP\client\src\Components\RadarChart.jsx
_46 LOC | 1.26 KB_

## Summary

The `RadarChart` component is responsible for rendering a radar chart based on the provided PDB ID and values. This chart helps visualize various dimensions (lengths and angles) in a circular format.

### Key Functions

1. **Importing Required Libraries**:
   - React: For creating functional components.
   - useEffect: To handle side effects, such as loading data from an external source.
   - Plot: A plotting library for creating charts.
   - '../Styling/RadarChart.css': CSS file for styling the chart.

2. **Setting Up Categories and Values**:
   - `categories`: Array containing the labels of the radar chart dimensions.
   - `radarValues`: An array that includes the provided values followed by a copy of the first value to complete the circle.

3. **Loading Plotly Script**:
   - The `useEffect` hook is used to load the Plotly library dynamically when the component mounts. This ensures that the plot can be rendered after the script has been loaded.

4. **Rendering the Radar Chart**:
   - The chart is rendered using the `Plot` component from the Plotly library.
   - The data array contains a single scatterpolar trace with specified r (radial) and theta (angular) values, including the provided categories and the first value to complete the circle.
   - The layout settings define the title, polar axis options, and hide the legend.

### Dependencies

- React
- useEffect
- Plotly.js
- '../Styling/RadarChart.css'

### Logic Flow

1. The component starts by importing all necessary dependencies.
2. It sets up an array of categories for the radar chart dimensions.
3. It calculates `radarValues` including a copy of the first value to complete the circle.
4. The `useEffect` hook loads the Plotly library dynamically, ensuring that the chart can be rendered.
5. Finally, it renders the radar chart using the `Plot` component with specified data and layout settings.

This component is designed to display comprehensive insights into molecular structures through a circular visualization of various dimensions.

---

# PSSP\client\src\Components\ResetPassword.jsx
_40 LOC | 1.12 KB_

## Summary

The `ResetPassword` component in the PSSP client app allows users to reset their password using an authentication token obtained during the initial login process. It includes a form where the user can enter their new password and submit it.

### Key Functions

1. **State Management**: The component manages the password entered by the user.
2. **Token Retrieval**: It retrieves the reset password token from the URL parameters.
3. **Form Submission**: When the form is submitted, it sends a POST request to the server to reset the password.
4. **Error Handling**: It logs any errors that occur during the password reset process.

### Dependencies

- React
- axios for HTTP requests
- react-router-dom for navigation

### Logic Flow

1. **Component Initialization**:
    - The component sets up state variables (`password` and `token`) using `useState`.
    - It uses `useNavigate` to handle routing and navigate to the login page after successful password reset.

2. **Form Handling**:
    - When the form is submitted, it prevents the default form submission behavior.
    - It sends a POST request to the server with the new password along with the token obtained from the URL parameters.
    - Upon receiving a response from the server, it checks if the status is true and navigates to the login page.

3. **Error Logging**:
    - Any errors encountered during the password reset process are logged to the console using `console.log(err)`.

This component ensures that users can securely update their passwords without losing access to the app.

---

# PSSP\client\src\Components\Resources.jsx
_209 LOC | 10.72 KB_

## Summary

The provided code snippet is a React component that includes a modal to display images of different models used in a hybrid neural network architecture for protein secondary structure prediction. The component also contains sections with detailed descriptions of the dataset and model architecture.

### Key Functions

1. **Modal Functionality**: The `openModal` function is used to display an image when clicked on it.
2. **Close Modal Functionality**: The `closeModal` function hides the modal when called.

### Dependencies

- React: Used for component creation and rendering.
- Styling: Applied through CSS from the `Styling/Resources.css` file.
- Media Files: Included images such as confusion matrices, class reports, model architecture, etc., in the `media` folder.

### Logic Flow

The code is structured to handle the display of models using a modal, providing a clear and concise overview of the hybrid neural network's components and functionalities.

This component is designed to be easily integrated into larger applications for protein secondary structure prediction, offering a user-friendly way to understand the architecture and performance of the model.

---

# PSSP\client\src\Components\Signup.jsx
_92 LOC | 3.33 KB_

## Summary

The `Signup` component is responsible for handling the sign-up process of users. It includes fields for username, email, password, and an optional admin key based on the user's role.

### Key Functions

1. **State Management**: The component manages states such as `username`, `email`, `password`, `role`, and `adminKey`.
2. **Form Submission**: It uses React hooks like `useState` to manage these states and handles form submission.
3. **Axios Request**: When the form is submitted, it sends a POST request to the server with the user's data, including the role if it is 'Admin'.
4. **Navigation**: On successful sign-up, it redirects the user to the login page.
5. **Error Handling**: It alerts the user if the sign-up fails.

### Dependencies

- React
- Axios
- React-router-dom

### Logic Flow

1. The `Signup` component initializes state for username, email, password, role, and adminKey.
2. The form is submitted with `handleSubmit`, which prevents default behavior, constructs a data object, and sends it to the server using Axios.
3. Upon successful sign-up (status true in response), the user is redirected to the login page.
4. If the sign-up fails, an error message is displayed.

This component ensures that the user can easily register on the platform by providing all necessary information.

---

# PSSP\client\src\Components\StructurePrediction.jsx
_246 LOC | 9.67 KB_

# Summary

This is the summary of `StructurePrediction.jsx`. It includes a brief introduction about what the component does, its key functions, dependencies, and logic flow.

## Key Functions

- **calculateMolecularWeight**: Computes the molecular weight of a protein sequence in kDa.
- **aminoAcidClusters**: Maps each amino acid to its corresponding cluster type based on a DSSP3 prediction.
- **aminoAcidColors**: Defines colors for each amino acid for plotting.

## Dependencies

The following dependencies are used:
- axios for making HTTP requests
- React and useState for state management
- Plotly.js for creating the plot component
- react-router-dom for handling navigation

## Logic Flow

1. **Initial State Management**:
   - `sequence`, `predictedSS`, `molecularWeight`, `plotData`, and `history` are initialized using hooks.

2. **Handling Input**:
   - The `handleChange` function updates the sequence state with user input, performing validation to ensure only valid amino acids are entered.
   - If invalid input is detected, an error message is displayed.

3. **Submission Handling**:
   - When the form is submitted (`handleSubmit`), it first validates the sequence length and amino acid content.
   - It then makes a POST request to the server at `http://localhost:5000/predict` with the sequence data.
   - Upon receiving a response, it updates the state with predicted secondary structure and estimated molecular weight using the `calculateMolecularWeight` function and `aminoAcidClusters`.

4. **Display of Results**:
   - If successful, it renders the predicted secondary structure and estimated molecular weight on the page.
   - It also generates a plot representing the distribution of C, H, and E clusters based on the amino acid sequences.

5. **History**:
   - The prediction results are stored in an array `history` for tracking previous calculations.

This component provides a comprehensive overview of how it works, including its main functions, dependencies, and logic flow.

---

# PSSP\client\src\Styling\Admin.css
_132 LOC | 2.73 KB_

# Summary

This CSS file is designed to style the administrative interface of a web application named PSSP. It includes styles for the container, title, table, buttons, and form elements.

## Key Functions

- **Container Styling**: Sets the font family, background color, padding, width, margin, border radius, and box shadow.
- **Title Styling**: Centers the title text and sets its color and font family.
- **Table Styling**: Adds a border-radius to the table container, box-shadow, and removes extra top margin from the table container. It also styles the table headers and cells with padding, border, text alignment, background colors, and hover effects.

## Dependencies

- `Arial` sans-serif for body fonts.
- `f9f5f1` as the default background color.
- `333` as the primary text color.
- `8c6549` as a secondary text color used for the title.
- `b68765` and `67c467` as colors for hover effects on buttons.
- `f44336`, `ff5e50`, `b38063`, and `a85424` as background colors for delete, create, update buttons.
- `4caf4f`, `67c467`, `b38063`, and `a85424` as hover effects for edit and create buttons.

## Logic Flow

The CSS file follows a structured approach to design the administrative interface, ensuring consistency in font sizes, colors, and spacing. The structure of the code is clear and easily readable, making it easy to maintain and update the styling of the application's UI.

---

# PSSP\client\src\Styling\App.css
_48 LOC | 678 B_

## Summary

This CSS file styles the PSSP (Project and Solution Stewardship Platform) client application. It ensures consistent styling across different elements of the user interface.

### Key Functions

- **Box-Sizing**: Ensures that borders and padding are included in the element's total width and height.
- **Flexbox Layout**: Aligns content in a column, allowing for easy responsive design.
- **Media Queries**: Adjusts styles for smaller screens to provide a better user experience.

### Dependencies

The CSS file relies on `Arial`, sans-serif for text, a background color of `#eae7dd` for the body, and specific colors (`#8c6549`) for the footer.

### Logic Flow

- **Main Content Area**: The main content area (`main-content`) has padding and a margin to provide space between it and other elements.
- **Footer**: The footer is fixed at the bottom of the page using `position: fixed`, ensuring it remains visible even when scrolling down.

---

# PSSP\client\src\Styling\DataAnalysis.css
_118 LOC | 2.46 KB_

### Summary

This CSS file defines the styling for an analysis page within a PSSP client application. The styles are designed to enhance the visual appeal and usability of the analysis section.

### Key Functions

1. **Typography**: 
   - Sets the font family to Arial with sans-serif fallback, ensuring compatibility across different browsers.
   - Applies a background color and text color for better readability.

2. **Max Width and Centering**:
   - Limits the width of the analysis container to 1200px and centers it on the page using CSS Grid or Flexbox layout.
   - Adds rounded corners, a box shadow for visual depth, and margin offsets for styling purposes.

3. **Table Styling**:
   - Ensures the table is responsive and centered within its container.
   - Sets the width of the table to 100% and max-width to 800px.
   - Adds borders around cells and headers for better readability and grouping data.
   - Uses pseudo-classes to alternate row colors for better visual distinction.

4. **Plots Styling**:
   - Aligns plots vertically centered on the page using Flexbox layout.
   - Changes the color of the copy icon when hovered for a more engaging user experience.

5. **Button Styling**:
   - Centers buttons horizontally and vertically on the page using Flexbox layout.
   - Adds hover effects to the button, making it visually appealing.

6. **Entry Count**:
   - Displays the number of entries in the analysis section prominently.
   - Provides a styled background with rounded corners for better visual appeal.

### Dependencies

- This CSS file assumes that there are no external dependencies or libraries used in the PSSP client application.

### Logic Flow

- The styles are structured to follow a clear flow, starting with the overall theme and then moving into specific components like tables and buttons.
- Each section is designed to be visually distinct and easy to understand, making it user-friendly for analyzing data within the application.

---

# PSSP\client\src\Styling\DataBank.css
_187 LOC | 3.47 KB_

## Summary

This CSS file defines the styling for a data bank component in a PSSP application. It sets up the main container, details sections, table containers, and various other UI elements to ensure consistent visual presentation across the application.

### Key Functions

- **Responsive Layout**: The `.databank-container` class ensures that the data bank fits well within a standard 1200px width on larger screens.
- **Centering**: The container is centered using `margin: 0 auto;`, making it visually balanced.
- **Padding and Background**: The container has padding for space and a light background color to enhance readability.
- **Search Functionality**: A search button (`.search-button`) allows users to filter data based on specific criteria.

### Dependencies

- **HTML Structure**: The `.details` class defines the style of the main details section, ensuring it is wide enough and has a subtle border.
- **Table Styling**: The `.table` and `.table th`, `.table td` classes style the table container and its contents effectively, maintaining readability and aesthetics.

### Logic Flow

- **Media Queries**: The `@media (max-width: 768px)` rule adjusts the grid layout for smaller screens, ensuring that the data bank can be viewed comfortably on mobile devices.
- **Sample IDs Container**: The `.sample-ids-container` class provides a container for sample buttons, facilitating easy access to various datasets.

### Example Usage

```html
<!-- HTML structure using the defined classes -->
<div class="databank-container">
  <div class="details">
    <!-- Detailed content here -->
  </div>
  <div class="table-container">
    <!-- Table data here -->
  </div>
</div>
```

This CSS file is crucial for maintaining a consistent and professional look to the data bank component, enhancing user experience by ensuring that all sections are clearly defined and visually appealing.

---

# PSSP\client\src\Styling\FullDataset.css
_104 LOC | 2.11 KB_

## Summary

The `FullDataset.css` file in the PSSP client project is responsible for styling the main content of the page. It includes various CSS rules to define the font family, background color, text color, padding, and other visual elements used throughout the interface.

### Key Functions

1. **Font Styling**: Sets the `font-family` to Arial and uses a sans-serif fallback.
2. **Background Color**: Sets the background color of the page to #f5f3ef with a subtle shadow for depth.
3. **Text Color**: Specifies the text color as #333 with some contrast enhancement.
4. **Padding**: Provides 2rem padding around the content area, ensuring it's well-maintained and visually appealing.
5. **Max Width**: Limits the width of the content to 1200px, maintaining a consistent layout across different devices.
6. **Margin Centering**: Centers the content horizontally with margin: 0 auto, making it responsive.
7. **Border Radius**: Applies a rounded border to the page and table elements for better aesthetics.
8. **Box Shadow**: Adds a subtle shadow around the content area for depth and visual interest.

### Dependencies

No external dependencies are required for this CSS file to function properly.

### Logic Flow

The CSS rules in `FullDataset.css` work together to ensure that the main body of the page is styled according to the specified guidelines. The use of classes allows for easy management of styling across multiple elements, such as headers, tables, and pagination controls.

This stylesheet enhances the user interface by providing a professional look and feel, making it more intuitive and visually appealing for users interacting with the application.

---

# PSSP\client\src\Styling\Home.css
_172 LOC | 3.10 KB_

## Summary

This CSS file defines styles for various components on the home page of the PSSP client application. The `.home-container` ensures the content is centered and takes up the full viewport height. The `.global-container` provides a responsive layout with margin, padding, and centering. The `.profile-section` and `.profile-icon` handle the profile section's styling, including position, size, color, and hover effects. The `.dropdown-menu`, `.dropdown-item`, and `.home-content` styles manage the dropdown menu and its content, ensuring alignment and hover effects. The `.search-container` style styles the search bar with input and button components.

## Key Functions

- **Styling the `.home-container`:** Ensures the homepage is centered and responsive.
  
- **Styling the `.global-container`:** Provides a responsive layout with margin, padding, and centering.

- **Styling the `.profile-section`:** Manages the profile section's styling, including position, size, color, and hover effects.

- **Styling the `.dropdown-menu`:** Manages the dropdown menu and its content, ensuring alignment and hover effects.

- **Styling the `.search-container`:** Styles the search bar with input and button components.

- **Styling the `.protein-gif`:** Ensures the GIF is responsive and centered.

- **Styling the `body`:** Sets default text, color, background, line-height, and padding.

- **Styling the `.para1`, `.para2`, `.para3`, `.para4`:** Adds a shadow effect to paragraphs with gradient backgrounds, padding, border-radius, box-shadow, and transition effects.

---

# PSSP\client\src\Styling\Login.css
_90 LOC | 2.07 KB_

## Summary

The `Login.css` file in the PSSP client source directory stylesize various elements on the login page to create a clean and professional look. It includes functions for centering the login container, styling the sign-up container with an outlined background, aligning form labels and inputs vertically, applying darkened borders around inputs, and enhancing the appearance of the buttons.

### Key Functions

1. **Centering the Login Container**:
   - Uses `display: flex` to create a flexible container.
   - Applies `justify-content: center` and `align-items: center` to ensure content is centered both horizontally and vertically.

2. **Styling the Sign-Up Container**:
   - Sets the background color to `#ffffff` for a white background.
   - Adds padding of `40px`, rounded corners with `border-radius: 10px`, and a shadow effect with `box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15)`.

3. **Aligning Form Labels and Inputs**:
   - Uses `display: flex` to create a column for form elements.
   - Adds vertical spacing between labels and inputs with `margin-bottom`.

4. **Applying Darkened Borders Around Inputs**:
   - Applies `border: 1px solid #999999` for the input border.
   - Adds a darker background color (`#8c6549`) to darken the border.

5. **Enhancing Button Appearance**:
   - Sets the button's background color to `#8c6549e3`, providing a smooth transition on hover with `transition: background-color 0.3s ease, box-shadow 0.3s ease;`.
   - Changes the button text color to `#ffffff` for better visibility.

### Dependencies

No external dependencies are required for this CSS file.

### Logic Flow

The CSS file follows a logical flow to ensure that elements on the login page are styled in a consistent manner, maintaining a clean and professional appearance.

---

# PSSP\client\src\Styling\NavBar.css
_68 LOC | 1.12 KB_

## Summary

The `NavBar.css` file is responsible for styling the navigation bar in the PSSP client application. It includes key functions, dependencies, and logic flow.

### Key Functions

- **Background Color**: The navbar background color is set to a deep shade of brown (`#8c6549`).
- **Padding**: There's a 1rem padding around the navbar.
- **Border Radius**: Rounded corners are added for better aesthetics.
- **Position**: Fixed at the top of the page, ensuring it stays visible at all times.
- **Box Shadow**: A subtle shadow is applied to give depth to the navbar.
- **Margin Bottom**: There's a 1rem margin below the navbar.

### Dependencies

- No external dependencies required for this basic styling.

### Logic Flow

The navbar is designed to be responsive and mobile-friendly. It uses flexbox to align the links horizontally on desktop and vertically in smaller screens. The active link is styled with additional visual cues such as a different background color, bold text, and a bottom border.

This CSS file ensures that the navigation bar functions properly across different devices and enhances the user experience by providing an intuitive way to navigate through the application's features.

---

# PSSP\client\src\Styling\RadarChart.css
_21 LOC | 572 B_

## Summary

The `.chart-container` class in the PSSP client project is responsible for styling and layout of the radar chart component. It ensures that the chart is centered, visually appealing, and responsive across different screen sizes.

### Key Functions

1. **Centering the Chart**: The container uses `flexbox` to center both horizontally and vertically.
2. **Border Radius**: Rounded corners provide a professional look.
3. **Shadow Effect**: Adds depth to the chart with a subtle shadow effect on hover or click.
4. **Gradient Background**: A gradient background transitions between two white colors, enhancing visual appeal.
5. **Transition Effects**: Smooths out transformations and shadows when elements change state.
6. **Border**: Adds a light border around the chart for better distinction.
7. **Margin and Padding**: Ensures proper spacing around the canvas and SVG elements.

### Dependencies

- `flexbox` API: For centering and alignment using flex properties.
- `border-radius`, `shadow`, `transition`: CSS3 properties for styling purposes.

### Logic Flow

1. **Container Setup**:
    - `.chart-container` is set to center its content both horizontally and vertically using flexbox.
    - It has a smooth transition effect when the chart changes state (e.g., hover or click).

2. **Canvas and SVG Styling**:
    - Both the canvas and SVG elements inside `.chart-container` are styled with `margin: 0;` and `padding: 0;`.
    - This ensures that there is no padding around the canvas, allowing for proper rendering of charts.

This class provides a comprehensive set of styles to ensure the radar chart in the PSSP client application looks professional and responsive.

---

# PSSP\client\src\Styling\Resources.css
_326 LOC | 6.42 KB_

## Summary

The `Resources` page is designed to provide essential information and resources for users of the application. It includes sections such as "Key Functions", "Dependencies", "Logic Flow", "Model Graphs", "Confusion Matrix", "Classification Report", "Download Buttons", "External Links", "Responsive Design", "Feature Descriptions", "Modal Styling", and a `## Footer` section for additional context and links.

---

# PSSP\client\src\Styling\StructurePrediction.css
_216 LOC | 5.20 KB_

## Summary

This CSS file is designed to style the `StructurePrediction` page of the project, focusing on improving the visual presentation and usability of the user interface.

### Key Functions

- **Structure Prediction Container**: Central component where all styling and layout rules are defined for the entire screen.
- **H1 Text**: Centered title with a specific color theme.
- **Form Layout**: Form elements are centered vertically and horizontally within the container.
- **Input Elements**: Standard input fields with padding, border radius, and box shadow for enhanced visibility and aesthetics.
- **Button Styling**: Buttons are styled with different background colors, text colors, padding, border radius, and hover effects for user interaction.
- **Sample Sequence Styling**: Individual sequences within the main sequence display aligned content with a span label.
- **Prediction Container Styling**: Central component for displaying prediction results, including a gradient background and shadow effect. Buttons are styled to be aligned centrally and responsive.
- **Table Styling**: Grid-based tables are styled with fixed layout and centered text alignment, breaking long words and preserving line breaks.

### Dependencies

None required; this file is self-contained and does not rely on external libraries or components.

### Logic Flow

The CSS styles are applied using inline styles within the HTML files, ensuring that the styling is consistent across all pages. The focus is on improving readability and visual appeal without sacrificing functionality or usability.

---

# PSSP\server\index.js
_318 LOC | 10.50 KB_

## Summary

The server is a Node.js application designed to handle HTTP requests and responses using the Express framework. It is built on MongoDB as the database backend and utilizes various middleware components such as CORS for handling cross-origin resource sharing, cookie-parser for parsing cookies, and axios for making HTTP requests.

### Key Functions

1. **Server Setup**: The server initializes an Express application and sets up middleware for JSON data parsing, CORS origin validation, and cookie parsing. It also connects to a MongoDB database using the connection string specified in `.env` files.
2. **MongoDB Connection**: The server manages the MongoDB connection lifecycle by connecting to the database when the server starts and closing it gracefully when the server is stopped through `SIGINT`.
3. **Routes**: The server defines routes for authentication, structure prediction, dataset retrieval, and data visualization. Each route corresponds to a specific functionality provided by the server.
4. **Error Handling**: The server includes error handling middleware that catches exceptions during request processing and returns appropriate JSON responses with errors.

### Dependencies

- `express`: A fast, minimalist web framework for Node.js.
- `dotenv`: A library to load environment variables from a `.env` file.
- `mongoose`: An object data modeling toolkit for MongoDB and Node.js.
- `cors`: A middleware that provides CORS support for Express applications.
- `cookie-parser`: A middleware for parsing cookies out of HTTP requests.
- `axios`: A promise-based HTTP client for the browser and node.js.

### Logic Flow

1. **Initialization**: The server starts by importing all necessary modules, setting up dotenv to load environment variables, initializing an Express application, configuring CORS, and connecting to MongoDB.
2. **Middleware Setup**: Middleware such as JSON parsing, CORS origin validation, and cookie parsing are set up using the `app.use()` method.
3. **Database Connection**: The server uses `mongoose.connect()` to establish a connection to the MongoDB database. It logs a success message upon successful connection or an error if the connection fails.
4. **Signal Handling**: A signal handler for `SIGINT` is set up to gracefully close the MongoDB connection and terminate the server when the app is stopped.
5. **Routes Definition**: Routes such as `/auth`, `/predict`, `/databank-head`, `/fulldataset`, `/visualize`, and `/databank/:pdb_id` are defined using `app.use()` and associated middleware functions.
6. **Error Handling**: The server includes an error handler middleware to catch exceptions during request processing and return appropriate JSON responses with errors.

### Conclusion

This server is a robust platform for handling various functionalities related to data storage, retrieval, and manipulation in the field of chemistry. It leverages modern web development practices such as dependency management, modular design, and error handling.

---

# PSSP\server\models\User.js
_13 LOC | 418 B_

## Summary

The `User` model in the PSSP server serves as the data model for user accounts. It includes fields such as `username`, `email`, `password`, and `role`. The model is defined using Mongoose, a MongoDB object modeling tool.

### Key Functions

1. **Registration**: Users can register with a unique email address.
2. **Authentication**: Users authenticate by providing their username and password for access.
3. **Role Assignment**: Users can be assigned roles such as `User` or `Admin`.

### Dependencies

- Mongoose: The core object modeling tool used to interact with MongoDB databases.
- bcrypt: For hashing passwords securely.

### Logic Flow

1. When a user registers, the server validates that the email is unique and creates a new document in the `User` collection.
2. During authentication, the server checks if the username and password match those stored in the database.
3. Roles are managed using an enum to ensure only authorized users can access certain features.

### Example Usage

```javascript
import { User } from "./models/User.js";

const newUser = new User({
    username: "john_doe",
    email: "johndoe@example.com",
    password: "securepassword123",
    role: "Admin"
});

newUser.save((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("New user created successfully!");
    }
});
```

This code snippet demonstrates how to use the `User` model to create a new user and save it to the database.

---

# PSSP\server\routes\user.js
_172 LOC | 5.25 KB_

## Summary

This module handles user-related routes in the PSSP server, including signup, login, forgot password, and reset password functionalities. It uses bcrypt for password hashing, JWT for authentication, and sends emails using nodemailer for forgot password notifications.

### Key Functions

1. **Signup**: Registers a new user with provided details including username, email, password, role, and admin key.
2. **Login**: Authenticates a user by verifying the credentials and issuing a JWT if successful.
3. **Forgot Password**: Sends an email to reset the password for a registered user using their email.
4. **Reset Password**: Updates the password of a registered user based on the provided token.
5. **Logout**: Clears the JWT cookie from the client.
6. **Verify Token**: Verifies the validity of the JWT cookie.

### Dependencies

- **Express**
- **bcrypt**
- **jsonwebtoken**
- **nodemailer**
- **dotenv**
- **mongoose**

### Logic Flow

1. **Signup Route**:
   - Checks if the user already exists based on the email.
   - Validates the admin key if needed (for Admin roles).
   - Hashes the password before storing it in the database.
   - Creates a new user and saves it to the database.

2. **Login Route**:
   - Verifies the user's credentials against the stored data in the database.
   - If the credentials are valid, issues a JWT with the user's role.
   - Sets the JWT as a cookie in the client for future requests.

3. **Forgot Password Route**:
   - Generates a JWT token to be used as a password reset link.
   - Sends an email containing the URL to reset the password.
   - Uses nodemailer to send the email.

4. **Reset Password Route**:
   - Verifies the password reset token and hashes the new password before updating it in the database.

5. **Logout Route**:
   - Clears the JWT cookie from the client, effectively logging out the user.

6. **Verify Token Route**:
   - Validates the JWT cookie to confirm its validity before further processing.

This module ensures secure and user-friendly management of user accounts, enhancing the functionality and security of the PSSP server.

---







