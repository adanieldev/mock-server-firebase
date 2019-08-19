# Mock Server Firebase

> Endpoints:
```
POST /api/v1/oauth2/authorize
GET /api/v1/evaluations/:id
GET /api/v1/evaluations
POST /api/v1/evaluations/:id/answers
GET /api/v1/notifications
```

## Installation

```typescript
npm install -g firebase-tools
```

## Authentication

```typescript
firebase login
```

## Deploy

```typescript
firebase deploy --only functions
```
