> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details
Mock
Mock is a project focused on mocking the behavior of our frontend. Since we have to backend to take user input and logic it through, we have to mock its behavior using things such as dictionaries. It mocks specifically our load/search/view functionality with our mock data and our mock responses.
# Design Choices
Our main class is the REPL class. The REPL class then has two "children" our REPLHistory and our REPLInput classes. Our main design implementations that we used was an interface Command and an interface Reply. The Command interface is an interface used for every command, allowing developers to add their own commands with minimal changes to existing code. We also have the interface Reply, which is used to handle the information that could be held within a output, making it easier for REPLHistory to handle output.
# Errors/Bugs
There are no bugs that we know of.
# Tests

# How to
In order to run the program, run npm start in the terminal (Node.js must be installed) and open the link. From there, click the login button, and input commands while pressing submit to submit them to our frontend.

# Collaboration
We got some sample code from online resources, such as Stack Overflow.
