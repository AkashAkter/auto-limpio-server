# AutoLimpio Server

## Introduction

Welcome to the AutoLimpio Server repository! This guide will walk you through the steps required to set up and run the backend of the AutoLimpio project on your local machine.

## Getting Started

Follow these instructions to get the server up and running locally.

### Prerequisites

Ensure that you have the following software installed on your machine:

- Git: Version control system
- Node.js: Version 20.9.0 (recommended)
- npm: Node package manager (comes with Node.js)

### Cloning the Repository

Start by cloning the repository with the following command:

```
git clone https://github.com/AkashAkter/auto-limpio-server.git

```

### Installing Dependencies

Install all the necessary dependencies by running the following command in the terminal: `npm install`

```
npm install

```

### Setting Up Environment Variables

Create a .env file in the root directory of the project and add your MongoDB credentials:

```
DATABASE_URL = your_mongo_db_connection_string
NODE_ENV="development"
JWT_ACCESS_SECRET=secret key for jwt token
JWT_REFRESH_SECRET=secret key for jwt token
SALT_ROUND= 12
CN_Cloud_name=Clodinary cloud name
CN_Api_key=Clodinary api key
CN_Api_secret=Clodinary api secret
CN_Folder=Clodinary folder name
MAILPASS=gmail id app password
MAIL=email address
SIGNATURE_KEY=dbb74894e82415a2f7ff0ec3a97e4183
STORE_ID=aamarpaytest
PAYMENT_URL= https://sandbox.aamarpay.com/jsonpost.php
```

### Running the Project

Once you have set up the environment variables, you can run the project locally.

```
npm run start:dev

```

### Accessing the Project

```
http://localhost:5000

```
