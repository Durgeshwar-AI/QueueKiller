# User model
### 1.1 Contents of the user model:
- name
- email
- password
- age?
- image?
- location?
- created at
- updated at
### 1.2 User bookings data model:
- id
- userId
- companyId
- departmentId
- date of booking
- date of appointment
- time of appointment
- qr code

# Company model
### 1.1 Contents of the company model:
- id
- name
- key
- password
- created at
### 1.2 Departments model:
- id
- companyId
- name
- type
### 1.3 Schedules model:
- id
- departmentId
- date
- startTime
- endTime
### 1.4 Already booked schedules model:
- id
- userId
- schedulesId
- startTime
- endTime
- qr code for verification