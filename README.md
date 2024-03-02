# SpiderManSecuritySystem Contract

## Overview

SpiderManSecuritySystem is a smart contract written in Solidity that mimics a security system inspired by Spider-Man's abilities. It enables Spider-Man to manage access to his home and perform special actions such as shooting webs and climbing walls.

## Features

- **Access Management**: Spider-Man can grant or revoke access to individuals and control who can enter his home.
  
- **Web Shooting**: Spider-Man can shoot webs at specific targets by invoking the `webShot` function.

- **Wall Climbing**: Spider-Man can climb walls by using the `climbWall` function.

## Prerequisites

- Solidity ^0.8.9

## Contract Details

### Constructor

The constructor initializes the contract with Spider-Man's address and sets the initial secret key.

### Functions

- **changeSecretKey**: Allows Spider-Man to change the secret key used for accessing his home.

- **giveAdminAccess**: Enables Spider-Man to grant administrative access to other addresses.

- **giveAccess**: Allows Spider-Man or an admin to grant access to specific addresses.

- **openDoor**: Allows authorized individuals to open the door to Spider-Man's home using the secret key.

- **webShot**: Allows Spider-Man to shoot webs at a specified target.

- **climbWall**: Enables Spider-Man to climb walls.

- **getContractAddress**: Returns the address of the contract.

## Usage

1. Deploy the `SpiderManSecuritySystem` contract to your preferred Ethereum network.

2. Use the provided functions to manage access and perform Spider-Man's actions.


## Project Setup Instructions

To run this project on your computer after cloning the GitHub repository, follow the steps below:

1. **Install Dependencies:**
   - Navigate to the project directory in the terminal.
   - Run the following command to install project dependencies:
     ```bash
     npm install
     ```

2. **Start Ethereum Node:**
   - Open two additional terminals in your Visual Studio Code or preferred code editor.

   - In the second terminal, start the local Ethereum node using Hardhat:
     ```bash
     npx hardhat node
     ```

3. **Deploy Smart Contract:**
   - In the third terminal, deploy the smart contract to the local Ethereum network:
     ```bash
     npx hardhat run --network localhost scripts/deploy.js
     ```

4. **Launch Front-end:**
   - Go back to the first terminal and start the front-end application:
     ```bash
     npm run dev
     ```

5. **Access the Project:**
   - The project will be accessible on your local machine, typically at [http://localhost:3000/](http://localhost:3000/).

Now, the project is successfully running on your localhost. Ensure to follow these steps in sequence for a smooth setup process.
