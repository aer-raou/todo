# Modern Todo Application

A feature-rich, fully responsive todo application built with Next.js, TypeScript, and modern React technologies.


## Features

### Task Management
- Create, read, update, and delete todos
- Mark tasks as complete or incomplete
- Batch operations (delete completed, mark all as complete/incomplete)

### Data Organization
- Search functionality to find specific tasks
- Sort tasks by title or completion status

### User Experience
- Fully responsive design (mobile, tablet, desktop)
- Dark/light mode toggle with system preference detection
- Clean, minimalist UI with smooth transitions

## Tech Stack

### Core Technologies
- **Next.js** - React framework for server-rendered applications
- **TypeScript** - Static type-checking
- **Tailwind CSS** - Utility-first CSS framework for responsive design

### State Management
- **Redux** - Global application state management
- **React Query** - Server state management and API caching

### Form Management
- **React Hook Form** - Efficient form management
- **Zod** - TypeScript-first schema validation

### Testing
- **Jest** - JavaScript testing framework

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aer-raou/todo.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
todo_app/
├── src/
│   ├── app/
│   │   ├── components/        # UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── store/             # Redux store configuration
│   │   ├── utils/             # Utility functions and API
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx           # Main page component
│   │   └── providers.tsx      # Context providers
├── public/                    # Static assets
├── tests/                     # Test files
├── next.config.ts             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Testing

This project prioritizes testing with Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate test coverage report
npm test -- --coverage
```

### Testing Strategy

- **Unit Tests**: Test individual components and utilities
- **Integration Tests**: Test interactions between components
- **Snapshot Tests**: Ensure UI components render consistently
- **API Mocking**: Mock API calls for reliable testing

## Development Guidelines

### Commit Message Convention

This project follows the Conventional Commits specification:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example: `feat: add dark mode toggle`

### Code Style

- ESLint and Prettier are configured for consistent code style
- Run linting: `npm run lint`
- Format code: `npm run format`

## Deployment

The application can be deployed to Vercel with zero configuration:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Redux Documentation](https://redux.js.org/)

---