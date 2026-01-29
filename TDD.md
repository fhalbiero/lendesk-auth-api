# TDD / Implementation Checklist

This document tracks the development of the Authentication API using a test-driven approach.
Each task should be completed by:
1. Writing a failing test
2. Implementing the minimum code to pass
3. Refactoring if needed

---

## Phase 0 – Project Setup

[X] Initialize Node.js project  
[X] Install Fastify and core dependencies  
[X] Install testing stack (Vitest + Supertest)  
[X] Configure TypeScript  
[X] Create base folder structure  
[X] Add README.md  
[X] Add TDD.md  

---

## Phase 1 – Server Bootstrap

[X] Create Fastify app instance (`app.ts`)  
[X] Create server entry point (`server.ts`)  
[X] Load environment variables  
[ ] Register global plugins (helmet, sensible, rate-limit)  
[ ] Configure JSON error handler  
[ ] Add health check endpoint (`GET /health`)  

---

## Phase 2 – Redis Integration

[X] Create Redis client wrapper  
[X] Configure Redis connection via env vars  
[X] Ensure Redis connection closes on shutdown  
[X] Add helper for test database isolation (FLUSHDB)  

---

## Phase 3 – User Creation (`POST /v1/users`)

### Integration tests
[X] Create user successfully  
[X] Normalize username (trim + lowercase)  
[X] Prevent duplicate usernames (case-insensitive)  
[ ] Reject missing username  
[ ] Reject missing password  
[ ] Reject weak password  

### Implementation 
[ ] Implement password hashing (argon2id)  
[ ] Store user in Redis  
[ ] Enforce uniqueness using atomic Redis operation  
[ ] Return sanitized response (no password hash)  

---

## Phase 4 – Authentication (`POST /v1/auth`)

### Integration tests
[ ] Authenticate successfully with correct credentials  
[ ] Reject authentication with wrong password  
[ ] Reject authentication with unknown username  
[ ] Ensure identical error response for all auth failures  

### Implementation
[ ] Implement password verification  
[ ] Implement constant-time behavior for unknown users  
[ ] Add rate limiting to auth endpoint   

---

## Phase 5 – Error Handling

[ ] Standardize error response format  
[ ] Ensure all errors return JSON  
[ ] Hide internal errors in production  
[ ] Map domain errors to HTTP status codes  

---

## Phase 6 – Documentation & Polish

[ ] Add OpenAPI / Swagger documentation  
[ ] Write README.md explaining architecture decisions  
[ ] Document security trade-offs and future improvements  
[ ] Add Docker Compose (app + redis)  
[ ] Final code cleanup and refactor  

---

## Phase 7 – Final Review

[ ] Run full test suite  
[ ] Verify all checklist items completed  
[ ] Final sanity check for security and clarity  

