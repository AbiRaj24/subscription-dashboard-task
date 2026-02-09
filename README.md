
#Sunscription Dashboard

A full-stack subscription management dashboard where users can browse plans, subscribe, and manage their active subscriptions. Includes an admin view for monitoring all subscriptions.


Developer Information:

 Name: Abinaya G
 Email: abinayagovindarajan10@gmail.com
 github: https://github.com/AbiRaj24/subscription-dashboard-task.git


#tech stacks:

##Frontend:
- React (Vite)
- Tailwind CSS
- React Router
- Redux(state management)
- Axios

##Backend
- Node.js
- Express.js
- PostgreSQL
- Knex.js
- JWT Authentication
- Joi validation

---

#Features

- User authentication (JWT)
- Browse subscription plans
- Subscribe / cancel subscription
- User dashboard
- Admin subscription dashboard
- Protected routes
- Dark / light mode

---

##project structures##


#folder

--subscription-dashboard-task/
       client/ # React frontend
       server/ # Node.js backend


##backend Setup:

--cd server
--npm install
--cp .env.example .env
  
   ""Update ".env" with your database credentials.Run migrations and seed data"".

--npx knex migrate:latest
--npm run seed

   ""start backend server"

--npm run dev
  
  "http://localhost:5000"

##frontend

--cd client
--npm install
--cp .env.example .env
--npm run dev

 "http://localhost:5173"


 ##notes

- PostgreSQL must be running locally.
- Admin role can be assigned by updating the user role directly in the database.



