# Lendesk Authentication API Project

## Description

Lendesk Authentication Project is a fast and secure API for internal services to create and authenticate users.

## Goal

Provide a RESTful API for internal services to create users and authenticate them using a username + password. The API must be fast, secure, and pass a basic security audit (password complexity, safe hashing, non-leaky errors, etc.).

## Approach

Development was guided by a test-driven checklist (see TDD.md), starting with integration tests to ensure API correctness and security requirements were met before implementation details.


## Project Structure

- **src/**: Main source code
- **src/db**: Redis as database
- **package.json**: Project metadata and dependencies.
- **.env.example**: Sample environment variables file.
- **.gitignore**: Specifies files to be ignored by Git.
- **docker-compose.yml**: Configuration for Docker services.



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.