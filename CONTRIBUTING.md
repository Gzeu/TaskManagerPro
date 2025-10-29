# Contributing to Task Manager Pro

Thank you for considering contributing to Task Manager Pro! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the [Issues](https://github.com/yourusername/task-manager-pro/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Device/OS information

### Suggesting Features

1. Check if the feature has already been suggested
2. Create a new issue with the label "enhancement"
3. Provide:
   - Clear description of the feature
   - Use cases
   - Why this feature would be useful
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a new branch from `develop`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes:
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed
   - Ensure all tests pass: `npm test`
   - Run linter: `npm run lint`
   - Run type checker: `npm run typecheck`
4. Commit your changes:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/)
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a Pull Request to the `develop` branch

### Commit Message Guidelines

We follow Conventional Commits specification:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat: add dark mode toggle
fix: resolve crash on task deletion
docs: update README with installation steps
test: add unit tests for task service
```

## Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use functional components with hooks

## Testing

- Write unit tests for utilities and services
- Write component tests for UI components
- Aim for >80% code coverage
- Run tests before submitting PR

## Code Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be included in the next release

## Questions?

Feel free to ask questions by:
- Opening an issue
- Joining our Discord community
- Emailing support@taskmanagerpro.com

Thank you for contributing! 🎉
