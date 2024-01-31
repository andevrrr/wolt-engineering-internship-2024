# Delivery Fee Calculator

This project is a React-based web application designed to calculate delivery fees based on various factors such as cart value, delivery distance, number of items, and order time. It showcases modern web development practices using React, TypeScript, and comprehensive testing strategies.

## Features

- **Dynamic Fee Calculation**: Calculates delivery fees based on cart values with precision.
- **Distance-Based Charges**: Implements additional fees for deliveries beyond a base distance.
- **Bulk Order Surcharge**: Applies surcharges for orders with a high number of items.
- **Peak Time Pricing**: Adjusts fees during designated rush hours to reflect increased demand.
- **Accessibility Focused**: Built with accessibility in mind to cater to a wider user base.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm

### Installation

1. Navigate to the project directory:
   ```bash
   cd wolt-engineering-internship-2024

2. Install the dependencies:
   ```bash
   npm install

3. Run the code:
   ```bash
   npm start

The application should now be running on http://localhost:3000.

### Usage

To use the calculator, fill in the required fields:

- **Cart Value**: Total value of the shopping cart.
- **Delivery Distance**: Distance the delivery needs to travel in meters.
- **Number of Items**: Total number of items in the cart.
- **Order Time**: Desired time of order. (Initially, the date and time are the same as in the browser)
- **Press the "Calculate Delivery Fee"** button to see the calculated fee based on the input parameters.

### Running Tests

- To execute the automated tests for this system, run:
   ```bash
   npm test

### Built With

- [React](https://reactjs.org/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - Used for static typing
- [Jest](https://jestjs.io/) - Testing Framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - For testing React components