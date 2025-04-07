# React Site Base

## Project Overview

This is a basic React-based weather application.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install --with-deps`
4. Copy `.env.sample` to `.env` and configure your OpenWeatherMap API key
5. Start the development server: `npm run dev`

**NOTE**
An OpenWeather API key is required to fetch real data.
You can register for a free api-key at [OpenWeather](https://openweathermap.org)
or you can stub out the calls to the WeatherAPI to return static data for local testing.

## Testing

### End-to-End Tests (Playwright)

Before running tests, ensure you have all dependencies installed:

```bash
npm install
npx playwright install --with-deps
```

The project uses Playwright for end-to-end testing. There are several ways to run the tests:

#### Running Full E2E Tests

```bash
npm run test:e2e
```

This command:

- Kills any existing processes on the test port
- Starts a fresh dev server
- Waits for the server to be ready
- Runs all Playwright tests

#### Debugging Tests

1. First start the development server:

```bash
npm run dev
```

2. Then in a separate terminal, run:

```bash
npm run playwright:debug
```

This opens Playwright's debug interface for interactive test debugging.

#### Available Test Commands

- `npm run test:e2e` - Full E2E testing suite (recommended for CI/CD)
- `npm run playwright` - Run tests only (requires running server)
- `npm run playwright:debug` - Debug tests with UI (requires running server)

## Technical Implementation Exercises

This assessment is designed for mid-level React developers and should take approximately 30 minutes to complete. Choose ONE of the following exercises to implement.

**NOTE**
An OpenWeather API key is required to fetch real data.
You can register for a free api-key at [OpenWeather](https://openweathermap.org)
or you can stub out the calls to the WeatherAPI to return static data for local testing.

### Exercise 1: Temperature Highlights Component

- Create a simple component that shows the highest and lowest temperature cities
- Display each city with its current temperature
- Style using the existing Tailwind classes
- Handle basic error states
- Add to the Home page below the existing city list

Expected deliverables:

- Working component with basic styling
- Temperature data integration
- Basic error handling
- Clean, typed code

### Exercise 2: Weather Alert Banner

- Create a simple alert banner component
- Display a static weather alert message
- Add a close button
- Style with Tailwind
- Add to the top of the Home page

Expected deliverables:

- Functional banner component
- Close button interaction
- Basic styling
- Component integration

### Exercise 3: City Search Component

- Create a search input component for cities
- Filter the existing POPULAR_CITIES list
- Show matching results as you type
- Add the component to the Home page
- Style to match existing design

Expected deliverables:

- Working search input
- Basic filtering functionality
- Styled component
- Integration with existing city list

### Exercise 4: Weather Data Stubbing

- Create a simple stubbing system for the WeatherApiClient
- Implement mock responses for at least 3 cities
- Add an environment variable to toggle between real/stub data
- Ensure type safety for the stub data

Expected deliverables:

- Working stub implementation
- Toggle mechanism
- Typed mock data
- Example usage in one component

The stub should return data matching this interface:

```typescript
interface WeatherStub {
  city: string;
  temperature: number;
  conditions: string;
  timestamp: number;
}
```

Example usage:

```typescript
// Stub can be enabled via VITE_USE_STUB_DATA=true
const weatherData = await weatherClient.getCurrentWeather('Minneapolis');
```

## Evaluation Criteria

1. **Code Quality**

- Clean, readable, and well-organized code
- Proper error handling
- TypeScript types and interfaces
- Code reusability

1. **Testing**

- Unit tests for new functionality
- Integration tests where appropriate
- Edge case handling
- Test coverage report

1. **Technical Design / Analysis**

- Architecture decisions
- Performance considerations
- Scalability approach
- Security measures

1. **Documentation**

- Clear README updates
- API documentation
- Setup instructions
- Design decisions explanation

## Submission Guidelines

1. Create a new branch for your implementation
2. Write clear commit messages
3. Include a brief write-up explaining:
   - Which feature you chose and why
   - Your implementation approach
   - Any trade-offs you made
   - What you would do differently with more time
4. Create a pull request with your changes

## Additional Notes

- Feel free to add any necessary dependencies
- You can refactor existing code if needed
- Focus on quality over quantity
- Consider edge cases and error scenarios

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenWeatherMap API key
