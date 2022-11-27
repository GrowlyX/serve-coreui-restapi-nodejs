# Node.JS serve React content and API routes
Serve production-ready React content and API routes within the same Node.JS application.

## Requirements
- MongoDB server running on `27017`

## Getting Started
1. Run `npm build` in your React project.
2. Copy `./build` folder to your application root directory.
3. Configure the `config.json` file. 
    - File is auto-generated on initial startup.
    - Example can be found in the `config.example.json` file.
4. Launch the application by running `node index.js`. Ensure JS files are in root directory.
