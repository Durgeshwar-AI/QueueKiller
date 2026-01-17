# User model

### 1.1 Contents of the user model:

- id
- name
- email
- password
- dateOfBirth?
- image?
- location?
- createdAt
- updatedAt

# Company model

### 2.1 Contents of the company model:

- id
- name
- key
- password
- logo?
- createdAt
- updatedAt

### 2.2 Departments model:

- id
- companyId
- name
- type
- cost
- createdAt

# Schedules

### 3.1 Schedules model:

- id
- departmentId
- date
- startTime
- endTime

### 3.2 Bookings model (Renamed from "Already booked schedules"):

- id
- userId
- scheduleId
- qrCodeToken
- status (upcoming/completed/missed)
- createdAt

# Admin

### Admin model

- id
- name
- email
- password
