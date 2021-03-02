# TrafficFlow

Leverage Traffic Control Management via Reward based Reporting System

<hr>

## Server API Endpoints

1. `/user` : User specific requests
2. `/report` : Individual Report for Data Agregation and Statistics
3. `/res` : For Multimedia Objects (GET requests only)

### 1. `/user`

- `/user/:id/info` (GET): Get current user's data blob
- `/user/new` (POST): Create New User
- `/user/:id/report` (POST): Lodge new report (multipart/form-data)
- `/user/:id/report` (GET): Get user's report's metadata Blob (no media)

### 2. `/report`

- `/report/:id` (GET): Get Report data blob (no Media)

### 3. `/res`

- `/report/:id` (GET): Get Media Stream

<hr>

## JSON Format

### **GET** /user/:id/info

{

    uuid: UserID,
    username: (*optional*, *default:Guest*),
    phone: Number,
    reports: Array(ReportIDs),
    rewards: Number,
    email: (*optional*)

}

### **POST** /user/new

{
    
    uuid: Firebase UUID
    username: String (*optional*, *default:Guest*),
    phone: Number,
    email: String (*optional*)

}

returns new user JSON

### **POST** /user/:id/report

{

    category: String,
    geoLocation: [Number, Number],
    proofs: Array(Files)
    description: String (*optional*)

}

returns new report JSON

### **GET** /user/:id/report

{

    reportedBy: UserID,
    category: String,
    geoLocation: [Number, Number],
    proofs: Array(resource_name),
    desciption: String

}

### **GET** /report/:id

{

    reportedBy: UserID,
    category: String,
    geoLocation: [Number, Number],
    proofs: Array(resource_name),
    desciption: String

}

:id is report ID

### **GET** /res/:name

dataStream (in Binary)

:name is resourceName (image, audio, video), best for async fetch
