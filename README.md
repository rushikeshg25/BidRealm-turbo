# BidRealm

BidRealm is a real-time auction platform built with modern web technologies.

## Architecture Overview
<img width="871" alt="BidRealm Arch" src="https://github.com/user-attachments/assets/58554537-48f1-453a-a895-9fa07cb2c72a">


System consists of the following components:

1. **Next Client**: The front-end application built with Next.js.
2. **Express WS Server**: A WebSocket server handling real-time communication.
3. **Postgres DB**: The primary database for storing user data, auctions, and bids.
4. **Message Queue**: A Redis-based queue for handling email notifications.
5. **Email Notification Worker**: A service responsible for sending email notifications.

## Key Features

- Real-time bidding using WebSockets
- Auction and bid creation
- Email notifications for auction events (winning, outbid, auction end)
- User authentication and session management

## Technologies Used

- Next.js for the client-side application
- Express.js for the WebSocket server
- PostgreSQL and PrismaORM for data persistence
- Redis for message queue to process Emails
- WebSockets(ws) for real-time communication
- Lucia for Auth
- UploadThing for Image Upload
- NodeMailer for Emails
- Turborepo
- Toast Notifications(react-hot-toast), Tailwind, zod, zustand, shadcn-ui

## Getting Started

Follow these steps to set up Bid Realm for local development:

1. Clone the repository:
```git clone https://github.com/rushikeshg25/BidRealm-turbo.git```
```cd BidRealm-turbo```
2. Install dependencies:
```yarn```
3. Set up environment variables:
- Copy the `.env.example` file in the `packages/db` directory and all app directories to `.env`.
- Fill in the necessary environment variables in each `.env` file.

4. Set up the database:
```yarn prisma migrate dev```
```yarn prisma generate```

5. Start the development server:
```yarn run dev```
The application should now be running on `http://localhost:3000` 

## Contributing

We welcome contributions to Bid Realm!.Please follow the getting started guide to get started. Please leave a Star ⭐

