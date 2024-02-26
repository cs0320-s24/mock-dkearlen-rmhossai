> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

# Design Choices

# Errors/Bugs

# Tests

# How to

# Outline

Main Components:
1.) App Component

- Top-level component that renders other components
- Handles app-level state like authentication
  2.) CommandPrompt Component
- Renders the input box for entering commands
- Handles submitting commands
  3.) History Component
- Renders scrollable display of command history
- Receives new entries from CommandPrompt

Data Components:
4.) CSVData Class

- Encapsulates CSV data loading/parsing
- Exposes data for search queries
  5.) MockedCSVData Class
- Implements CSVData interface
- Loads mocked CSV data from mockedJson.ts

Command Components:
6.) Defines common command properties, e.g. name, handler functions

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
