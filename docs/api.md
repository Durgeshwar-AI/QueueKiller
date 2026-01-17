# Admin routes
### Auth
- POST /api/admin/login -> To let the admin login
- POST /api/admin/logout -> To let the admin logout

### Company
- POST /api/admin/company/register -> Register a new company
- POST /api/admin/department/register -> Register a new department
- GET /api/admin/company -> To get all companies
- GET /api/admin/company/:id -> To get all information of a company with all its departments
- GET /api/admin/department -> To get all departments

# User routes
### Auth
- POST /api/user/register -> Register a new user
- POST /api/user/login -> Login user
- POST /api/user/logout -> Logout user

### Profile
- GET /api/user -> To let the user see his profile
- PUT /api/user -> Update the profile

### Bookings
- POST /api/user/book -> To let user book a slot
- GET /api/user/bookings -> To let users see all there bookings
- GET /api/user/qr/:bookingID -> To let user see the qr of a booked slot

### Schedules
- GET /api/user/:departmentsId/schedules?date=YYYY-MM-DD -> To find all the schedules for a given department on a given date

### Payments
- POST /api/user/payment -> To pay the booking amount

# Company
### Auth
- POST /api/company/auth/login -> Company dashboard login.

### Departments
- GET /api/company/departments -> Get all the departments information in the organization
- GET /api/company/departments/:departmentId -> Get the information of a particular department
- PUT /api/company/departments -> Update the information of a department including cost of booking

### Schedules
- GET /api/company/schedules/:departmentId?date=YYYY-MM-DD -> To get all the schedules for a day
- POST /api/company/schedules -> Add new bookable schedules to the list
- PUT /api/company/schedules -> Update a bookable schedule
- DELETE /api/company/schedules/:schedulesId -> Delete an empty schedule

### Bookings
- POST /api/company/bookings/verify -> Endpoint to scan the User's QR code and mark the booking as "Completed/Attended".