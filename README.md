> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

## Team Members and Contributions

Devon Kear-Leng (dkearlen) + Robayet Hossain (rmhossai)
GitHub Repository: https://github.com/cs0320-s24/mock-dkearlen-rmhossai/

# Project Details

The Mock project serves as a frontend emulation tool, replicating the behavior of the application's frontend without the presence of a backend system. This is achieved by simulating the load, search, and view functionality using pre-defined mock data and responses. In essence, Mock acts as a stand-in for the backend processing, enabling developers to test and validate the frontend functionality in isolation. This project took about 8 hours to complete.

# Design Choices

The architectural design of the project centers around the REPL class, which forms the backbone of user interaction with the application. The REPL class orchestrates this interaction, comprising two essential components: REPLHistory and REPLInput.

REPLHistory is responsible for maintaining a record of past commands and their corresponding responses, facilitating user navigation and reference. REPLInput handles user input and initiates the processing of commands within the REPL environment.

Key design decisions include the implementation of the Command interface, which allows for extensibility by enabling the addition of new commands with minimal code modifications. Similarly, the Reply interface streamlines the management of output data, enhancing the efficiency of response handling within REPLHistory.

# Errors/Bugs

There are no bugs that we know of.

# Tests

The testing suite ensures the correctedness and reliability of the frontend functionality, covering various scenarios such as switching between modes, loading files, executing commands, and handling incorrect query shapes and states. Here are some more descriptions:

1.) Mode Switching --> ensuring that the application correctly switches between different operational modes, such as brief and verbose modes, while displaying the appropriate output.
2.) File Loading --> verifying the proper loading of data files into the application, with validation checks to confirm successful loading and error handling for failed attempts.
3.) Command Execution --> testing the execution of commands, including viewing, searching, and other operations, to validate the accuracy of responses and the integrity of application behavior.
4.) Error Handling --> evaluting the application's response to erroneous input and malformed commands, ensuring robust error detection and appropriate error messages.

# How to

Install Node.js if not already installed on your system, clone the project repository to your local machine, and navigate to the project directory in your terminal. Execute the command 'npm install' to install project dependencies. Once the installation is complete, run the command 'npm start' to start the application. Access the application using the provided URL, and interact with the frontend interface by clicking the login button and inputting commands in the designated field. Press submit to execute the commands and observe the corresponding frontend behavior.

To run the tests, navigate to the project directory, navigate to mock, and then src. Then, open a terminal and run the following command: 'npx playwright testing' to test all of the tests at once. To test only the tests within a certain class, run the following: npx playwright test (copy the filepath of the test class).

# Collaboration

We got some sample code from online resources, such as Stack Overflow. We discussed the project conceptually and walked through the playwright codegen method of creating playwright tests with fellow peers in the class, as well as in collab hours.
