# React Take-Home Challenge: Task Manager App

## Overview

This exercise is designed to assess your proficiency with React, TypeScript and Tailwind CSS. In this project, you'll work on a simple Task Manager application that allows users to add, view, and manage tasks. Your goal is to review the existing codebase, identify issues, and implement fixes and enhancements.

Your work will be evaluated on:

- **Bug Fixes:** Correcting the identified issues.
- **Code Quality:** Clean, modular, and well-typed code.
- **UI/UX:** Consistent and responsive styling using Tailwind CSS.
- **Optional Enhancements:** Going the extra mile with additional features like local storage or tests.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v20 or above)
- **pnpm (v9)**

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone git@github.com:halcyonmobile/react-take-home-exercise.git
   pushd react-take-home-exercise
   ```

2. **Install dependencies:**

   ```bash
   pnpm i
   ```

3. **Start the development server:**

   ```bash
   pnpm dev
   ```

4. **View the app:**

   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal) to see the application in action.

## Exercise Details

### Application Functionality

The Task Manager app includes the following core features:

- **Adding Tasks:** Users can create new tasks.
- **Listing Tasks:** A list view displays all tasks.
- **Marking Tasks as Completed:** Users can mark tasks as done.
- **Deleting Tasks:** Remove tasks from the list.
- **Filtering Tasks:** Filter tasks by status (All, Completed, Pending).

### Issues to Addressed

While reviewing the project, I have identified and resolved the following issues:

1. **Task Filter Bug:**

   - The filter functionality is now working as expected. Changing the filter updates the task list correctly.

2. **Task Deletion Issue:**

   - Deleting a task immediately updates the UI. A confirmation dialog has been added as well.

3. **Styling Inconsistencies:**

   - UI elements are using Tailwind CSS classes consistently. Layout, spacing, and colors have been updated to align with the provided design guidelines.

4. **TypeScript Warnings/Errors:**

   - Type definitions have been added. All TypeScript warnings have been addressed to ensure robust type safety.

5. **Code Refactoring:**
   - The code structure has been refactored using a monorepo to improve readability and maintainability.

### Optional Enhancements

If time permits, consider implementing one or more of the following:

- **Persistence:**
  - Implemented functionality to save and retrieve tasks from a remote API using Supabse, ensuring that the task list persists across page reloads.
- **Improved UI/UX:**
  - Enhanced the user interface with additional styling improvements improve user experience, like a sticky form. So while the user scrolls down, he/she can still see the add form. This is specially usefeull on mobile.
  - Implemented a confirmation dialog when deleting a task.
  - A mobile first, responsive design has been implemented to improve user experience on mobile 
- **Improved UI/UX:**
  - The app has been depoyed to Vercel. You can access it on this link: https://react-simple-task-manager.vercel.app/
  - A CI/CD pipeline has been created to automatically deploy/release the app when changes were made. (minor issues have to be address later)
- **Unit Testing:**
  - Unit tests for key components have been added using Vitest

## Submission Instructions

- **Repository:** Fork the repository for your changes.
- **Pull Request:** Once completed, submit one or more pull requests to showcase your changes.
- **Documentation:** Include a brief explanation of your changes, any assumptions made, and instructions on how to test your improvements.

## Evaluation Criteria

Your submission will be evaluated based on:

- Correctness and completeness of bug fixes.
- Overall code quality and maintainability.
- Effective use of React hooks, TypeScript, and Tailwind CSS.
- The clarity and efficiency of your solution.
- Bonus points for optional enhancements and well-written tests.

## Additional Notes

- **Functionality:** Ensure your solution runs without errors.
- **Clean Code:** Focus on writing clean, well-documented, and modular code.
- **Clarifications:** If you have any questions or need further clarifications during the exercise, feel free to reach out.

Good luck, and we look forward to reviewing your submission!
