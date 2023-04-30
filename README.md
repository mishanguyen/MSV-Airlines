# MSV Airlines
This is a final project for COP 4710 - Database Design. 

## Overview
Our group, including Huong Duong, Misha Nguyen, and Vu Le, decided to create an airline website called MSV Airlines. The purpose of our website is to allow users to view information about available flights and buy the ticket. We targeted to make our website user-friendly by using React. For the server side, we used Node.js and Express.js. We also used PostgreSQL to store all information in our database.

## EER Diagram
<img src="https://user-images.githubusercontent.com/95314927/235363744-799bf69b-9bb3-413d-8880-bd4c4bcd0976.png" width="700">

## Main Functionality
There are seven main features that we implemented for our website.
### Sign up for new customers and employees
All users must sign up for a free account to use our website. When a new customer or a new employee signs up successfully, their information will be transferred back to our database.

<img src="https://user-images.githubusercontent.com/95314927/235364005-7d651634-bca5-4332-9207-e1db4b2755d8.png" width="700">

### Log in for existing customers and employees
After users have their own accounts, they can use their username and password to log in to our website. If the user is a customer, the next page will automatically show options for the customer to search for their desired flights. If the user is an employee, the next page will automatically show a list of customers with an option to view their flight information.

<img width="700" alt="Screenshot 2023-04-30 at 12 16 45 PM" src="https://user-images.githubusercontent.com/95314927/235364060-0d8d80be-0708-4d94-8987-8c5d383b6983.png">

### Search for flights based on origin, destination, departure date, and return date (if round-trip is chosen)
Users will fill out the information about origin, destination, depart date, and return date (if round trip) to begin the search. In this functionality, we give the users two options round-trip and one-way.

<img width="700" alt="Screenshot 2023-04-30 at 12 18 25 PM" src="https://user-images.githubusercontent.com/95314927/235364114-2cb994cb-da94-4cb5-8509-136c6796469b.png">

### View departure and return flights
When the user clicks the search button, the information in our flights table will be fetched and displayed for the user. From there, the user can pick the best one that is the most convenient for them.

<img src="https://user-images.githubusercontent.com/95314927/235364127-c03d7187-909d-42a1-b2d7-aaaf3175365b.png" width="700">

<img src="https://user-images.githubusercontent.com/95314927/235364160-94c023c7-e7f5-4232-acdf-5b131bb86015.png" width="700">

### Create a booking
After the customer books their flights, they will be navigated to a booking confirmation page. On this page, we will display the customer ID, first name, and last name, followed by the flight information.

<img src="https://user-images.githubusercontent.com/95314927/235364241-a07c67e7-1564-4963-8e21-40a28fe4f61c.png" width="700">

### View, modify, and delete bookings
We also implemented a function for customers to see their flight information when they click on "My Flight" in the navigation bar. From here, customers can decide to modify or delete flights as needed.

<img src="https://user-images.githubusercontent.com/95314927/235364265-1b4ecf7d-4375-4dea-93e2-15e4f10ee1d7.png" width="700">

### Employee access customer information and their bookings
After an employee logs in, a list of customers with their information will be displayed. If an employee wants to assist a specific customer, they can choose and click on "View User" and the page will be automatically navigated to that customer’s flights information.

<img src="https://user-images.githubusercontent.com/95314927/235364290-e1fee9dd-cd16-43b6-979e-6ae25fe203da.png" width="700">  
