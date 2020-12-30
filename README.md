# TrafficFlow

Leverage Traffic Control Management via Reward based Reporting System

<hr>

## Server API Endpoints

1. `/user` : User specific requests
2. `/report` : Individual Report for Data Agregation and Statistics
3. `/res` : For Multimedia Objects (GET requests only)

### `1. /user`

- `/user/:id/info` (GET): Get current user's data blob
- `/user/new` (POST): Create New User
- `/user/:id/report` (POST): Lodge new report (multipart/form-data)
- `/user/:id/report` (GET): Get user's report's metadata Blob (no media)

### `2. /report` (Under dev)

- `/report/:id` (GET): Get Report data blob (with media)

### `3. /res` (Under dev)

- `/report/:id` (GET): Get Media Stream

<hr>

## JSON Format
