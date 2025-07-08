# FitGenie: Personalized Fitness and Diet Planner

This repository contains the source code for FitGenie, a web application that provides personalized diet and workout plans.

## Project Structure

*   `/frontend`: React frontend application.
*   `/backend`: FastAPI backend service.
*   `/ml_service`: Python service for machine learning models.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Docker and Docker Compose

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/FitGenie.git
    ```
2.  Create `.env` files for the `backend` and `frontend` services by copying the provided `.env.example` files.
    ```sh
    cp backend/.env.example backend/.env
    cp frontend/.env.example frontend/.env
    ```
3.  Build and run the application using Docker Compose.
    ```sh
    docker-compose up --build
    ```

The application will be available at `http://localhost:3000`.

## Usage

*   Sign up for a new account.
*   Log in to your account.
*   Navigate to the Diet Plan, Workout Plan, or Calorie Tracker pages to get personalized recommendations.
*   Update your profile information on the Profile page.

## Running Tests

To run the tests for the backend and frontend, run the following commands:

*   **Backend:**
    ```sh
    docker-compose exec backend pytest
    ```
*   **Frontend:**
    ```sh
    docker-compose exec frontend npm test
    ```

## API Endpoints

The backend API is available at `http://localhost:8000`. The following endpoints are available:

*   `POST /auth/signup`: Create a new user.
*   `POST /auth/login`: Log in a user.
*   `GET /diet/plan`: Get a personalized diet plan.
*   `GET /workout/plan`: Get a personalized workout plan.
*   `POST /tracker/track`: Track a new activity.
*   `GET /users/me`: Get the current user's profile.
*   `PUT /users/me`: Update the current user's profile.

The ML service is available at `http://localhost:8001`. The following endpoints are available:

*   `POST /predict/diet`: Predict a diet plan.
*   `POST /predict/workout`: Predict a workout plan.
*   `POST /predict/calories`: Predict calorie burn.