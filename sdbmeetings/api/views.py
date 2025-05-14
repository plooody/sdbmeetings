from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Department, Employee, Appointment
from .serializer import DepartmentSerializer, EmployeeSerializer, AppointmentSerializer

# Create your views here.
@api_view(['GET'])
def get_employees(request):
    employees = Employee.objects.all()
    serializedData = EmployeeSerializer(employees, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_employees(request):
    data = request.data
    serializer = EmployeeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
@api_view(['GET'])
def get_departments(request):
    departments = Department.objects.all()
    serializedData = DepartmentSerializer(departments, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_department(request):
    data = request.data
    serializer = DepartmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
@api_view(['GET'])
def get_appointments(request):
    appointments = Appointment.objects.all()
    serializedData = AppointmentSerializer(appointments, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_appointment(request):
    data = request.data
    serializer = AppointmentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','GET','DELETE'])
def department_detail(request,pk):
    try:
        department = Department.objects.get(pk=pk)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DepartmentSerializer(department) 
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = DepartmentSerializer(department,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def department_employee(request,pk):
    try:
        Department.objects.get(pk=pk)
        employees = Employee.objects.filter(department__id=pk)
        serializedData = EmployeeSerializer(employees, many=True).data
        return Response(serializedData)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
 
@api_view(['PUT','GET','DELETE'])
def employee_detail(request,pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee) 
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EmployeeSerializer(employee,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT','GET','DELETE'])
def appointment_detail(request,pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AppointmentSerializer(appointment) 
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AppointmentSerializer(appointment,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)