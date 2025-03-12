# Dashboard with Microfrontends and Microservices

## Overview

This project is a web dashboard built with **React**, **Vue**, **Node.js**, **Golang**, and **Webpack**. The application uses a **microfrontend** architecture and **microservices** to collect and display data from multiple sources, including a **Weather API**. The dashboard aggregates data from various external applications and services to provide a dynamic, scalable interface.

## Technologies Used

- **React**: Used for building dynamic UI components in the dashboard.
- **Vue**: Integrated as a microfrontend for specific parts of the UI.
- **Node.js**: Handles backend logic and microservices for API interactions.
- **Golang**: Powers some microservices, offering high-performance and scalability for specific backend tasks.
- **Webpack**: Bundles the frontend code for optimized delivery.

## Business Purpose

The dashboard serves as a central hub for displaying data from multiple external applications and APIs. Key features include:

- **Microfrontends**: Independent, modular parts of the frontend (React and Vue) that can be developed, deployed, and maintained separately.
- **Microservices**: Backend services built in Node.js and Golang that communicate with external data sources, including the **Weather API** for real-time weather data.
- The application is designed to be scalable and maintainable, allowing for easy integration with new data sources as needed.

## Features

- **Real-time weather data**: Integrated with a Weather API to show current weather information based on location.
- **Modular frontend**: Different parts of the dashboard are built using React and Vue, following the microfrontend architecture.
- **Data aggregation**: The backend (Node.js and Golang) fetches data from various external sources and combines it for display in the dashboard.

## Getting Started

### Prerequisites

- pnpm
- Docker

### Setup Instructions

WIP
