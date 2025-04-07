default:
    @just --list

# Create a new repository from this template
create-repo *args:
    @chmod +x scripts/create-template-repo.sh
    @scripts/create-template-repo.sh {{args}}

# Run unit tests
test:
    npm run test:unit

# Run unit tests in watch mode
test-watch:
    npm run test:unit -- --watch

# Run end-to-end tests with Playwright
test-e2e:
    npm run playwright

# Run all tests (unit and e2e)
test-all:
    npm run test:unit && npm run playwright
