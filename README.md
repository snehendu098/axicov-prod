# Axicov - AI Agent Platform

![Axicov Logo](public/logo.png)

## Overview

Axicov is a cutting-edge platform that allows users to create and interact with customizable AI agents on the Educhain blockchain. These agents are capable of various tasks through integrated tools, including blockchain operations, educational resources, and web search capabilities.

## Features

- **Custom AI Agents**: Create and manage AI agents with personalized instructions and tools
- **Blockchain Integration**: Interact with the Educhain blockchain, including token management, transfers, and deployments
- **Educational Tools**: Access job search, book recommendations, and quiz generation
- **Secure Communication**: Chat interface with persistent conversation history
- **Wallet Connection**: Web3 wallet integration for blockchain interactions
- **Modern UI**: Sleek, responsive dark-themed interface with animated components

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Blockchain**: Web3.js, Thirdweb SDK
- **AI**: LangChain, Google's Gemini 1.5 Pro
- **Database**: MongoDB
- **APIs**: RapidAPI integrations (LinkedIn job search, book recommendations)

## Project Structure

```
src/
├── app/ - Next.js application routes and API endpoints
├── components/ - Reusable React components
├── constants/ - Application constants and configurations
├── helpers/ - Utility helper functions
├── interfaces/ - TypeScript interfaces
├── lib/ - Core library code and utilities
├── models/ - MongoDB database models
└── utils/ - Utility functions and tools
```

## Key Directories

### App Routes

- `/` - Homepage with agent listings
- `/create` - Create new AI agents
- `/agent/[id]` - Agent details page
- `/agent/[id]/chat` - Chat interface for interacting with agents

### API Endpoints

- `/api/agents/all` - Get all agents for a wallet address
- `/api/agents/[id]` - Get specific agent details
- `/api/agents/create` - Create a new agent
- `/api/chats/[id]` - Get chat history and post new messages

### Core Components

- `agent/` - Components for agent details, security, and tools
- `core/` - Core UI components like grid background, logo, and avatar
- `create/` - Components for agent creation
- `home/` - Main homepage components
- `providers/` - Context providers for app-wide state

## Agent Tools

Axicov agents have access to various tools:

1. **Blockchain Tools**:

   - Balance checking
   - Token information retrieval
   - Token transfers
   - Token creation and deployment

2. **Educational Tools**:

   - Job search via LinkedIn API
   - Book recommendations
   - Quiz generation on various topics

3. **Web Search**:
   - Access to web search functionality via Serper API

## Getting Started

### Prerequisites

- Node.js (v16.x or newer)
- MongoDB instance
- Thirdweb account and API keys
- RapidAPI key for LinkedIn and book recommendation services
- Google API key for Gemini 1.5 Pro

### Environment Variables

Create a `.env.local` file with the following variables:

```
MONGO_URI=your_mongodb_connection_string
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
NEXT_PUBLIC_RAPID_API_KEY=your_rapidapi_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_SEARCH=your_serper_api_key
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/snehendu098/axicov-prod.git
cd axicov
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Agent Creation Flow

1. Connect your web3 wallet
2. Navigate to the Create Agent page
3. Define agent details (name, description, instructions)
4. Select tools for your agent
5. Deploy your agent (requires a small EDU transaction)
6. Start chatting with your agent

## Agent Security

Each agent is secured with:

- Unique wallet keypair for blockchain operations
- Ownership validated via user's wallet address
- Encrypted storage of sensitive information

## License

[MIT License](LICENSE)

## Contact

For support or inquiries, please contact [support@axicov.com](mailto:support@axicov.com)
