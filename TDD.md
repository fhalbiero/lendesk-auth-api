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
[X] Register global plugins (rate-limit)  
[X] Configure JSON error handler  

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
[X] Reject missing username  
[X] Reject missing password  
[X] Reject weak password  

### Implementation 
[X] Implement password hashing (argon2id)  
[X] Store user in Redis  
[X] Enforce uniqueness using atomic Redis operation  
[X] Return sanitized response (no password hash)  

---

## Phase 4 – Authentication (`POST /v1/auth`)

### Integration tests
[X] Authenticate successfully with correct credentials  
[X] Reject authentication with wrong password  
[X] Reject authentication with unknown username  
[X] Ensure identical error response for all auth failures  

### Implementation
[X] Implement password verification   
[X] Add rate limiting to auth endpoint   

---

## Phase 5 – Error Handling

[X] Standardize error response format  
[X] Ensure all errors return JSON   
[X] Map domain errors to HTTP status codes  

---

## Phase 6 – Documentation & Polish

[X] Add OpenAPI / Swagger documentation  
[X] Write README.md explaining architecture decisions  
[X] Add Docker Compose (app + redis)  
[X] Final code cleanup and refactor  

---

## Phase 7 – Final Review

[X] Run full test suite  
[X] Verify all checklist items completed  
[X] Final sanity check for security and clarity  

