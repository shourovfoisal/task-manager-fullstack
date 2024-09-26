**To run the project**  
In the root directory containing `compose.yaml`:

1. Place a .env file in the `backend` folder with the following configuration
   ```
     JWT_SECRET=my_secret
     PORT=4000
     DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskmanager
     DATABASE_URL_WITH_SCHEMA=${DATABASE_URL}?schema=public
   ```
2. Run `docker compose build`
3. Then run `docker compose up -d`
4. Finally when the backend container is up, run `docker exec -it backend npx prisma migrate dev --name init` to sync the database.

**To create a user and login**  
When the project is up and running:

1. Open the frontend app at localhost:3000
2. From the top navigation, click on `SignUp` and create a user.
3. You will be redirected to the `SignIn` page upon successful user creation.
4. Login with the username and password you used while signing up.

**To use the app**  
After logging in:

1. You will see the `Dashboard` screen containing the list of tasks.
2. Click on the `Task Details` menu in the top navigation.
3. Create a new task from the `Task Details` screen.
4. You will be redirected to the `Dashboard` screen upon successful task creation.
5. You will find some filters in the `Settings` screen. You can save filter configuration from this screen. The filter configuration will be applied to the list of tasks in the `Dashboard` screen.
