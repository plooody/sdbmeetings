from django.urls import path
from api.views import get_employees, create_employees, get_departments
from api.views import create_department, get_appointments, create_appointment
from api.views import department_detail, appointment_detail, employee_detail

urlpatterns = [
    path('employees/', get_employees, name='get_employees'),
    path('employees/<int:pk>', employee_detail, name='employee_detail'),
    path('employees/create', create_employees, name='create_employees'),
    path('departments/', get_departments, name='get_departments'),
    path('departments/<int:pk>', department_detail, name='department_detail'),
    path('departments/create', create_department, name='create_department'),
    path('appointments/', get_appointments, name='get_appointments'),
    path('appointments/<int:pk>', appointment_detail, name='appointment_detail'),
    path('appointments/create', create_appointment, name='create_appointment'),
]
