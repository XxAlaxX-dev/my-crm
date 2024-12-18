# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


crm-mern/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   ├── dotenv.config.js   # Environment variable configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── userController.js  # User-related logic
│   │   ├── contactController.js # Contacts management
│   │   ├── taskController.js  # Tasks handling
│   │   ├── noteController.js  # Notes management
│   ├── middleware/
│   │   ├── authMiddleware.js  # Authentication middleware
│   │   ├── errorMiddleware.js # Error handling middleware
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Contact.js         # Contact model
│   │   ├── Task.js            # Task model
│   │   ├── Note.js            # Note model
│   │   ├── Meeting.js         # Meeting model
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── userRoutes.js      # User routes
│   │   ├── contactRoutes.js   # Contact routes
│   │   ├── taskRoutes.js      # Task routes
│   │   ├── noteRoutes.js      # Note routes
│   ├── utils/
│   │   ├── tokenUtils.js      # Token generation and validation
│   │   ├── emailUtils.js      # Email-related utilities
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point for the backend
│   ├── package.json
│
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images, icons, etc.
│   │   ├── components/
│   │   │   ├── Auth/          # Login, Register forms
│   │   │   ├── Dashboard/     # Main dashboard components
│   │   │   ├── Contacts/      # Contact components
│   │   │   ├── Tasks/         # Task components
│   │   │   ├── Notes/         # Note components
│   │   ├── contexts/          # React context for state management
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Contacts.js
│   │   │   ├── Tasks.js
│   │   │   ├── Notes.js
│   │   ├── redux/
│   │   │   ├── actions/       # Redux action creators
│   │   │   ├── reducers/      # Redux reducers
│   │   │   ├── store.js       # Redux store
│   │   ├── services/          # API services
│   │   │   ├── authService.js # Authentication services
│   │   │   ├── contactService.js # Contacts services
│   │   │   ├── taskService.js # Tasks services
│   │   ├── utils/             # Helper functions
│   │   ├── App.js             # Main React app
│   │   ├── main.jsx           # React entry point
│   ├── .env                   # Environment variables
│   ├── tailwind.config.js     # TailwindCSS configuration
│   ├── vite.config.js         # Vite configuration
│   ├── package.json
│
├── README.md
