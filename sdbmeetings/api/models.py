from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100)
    manager = models.OneToOneField('Employee', on_delete=models.SET_NULL, null=True, related_name='managed_department')
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    POSITION_CHOICES = (
        ('employee', 'Employee'),
        ('manager', 'Manager'),
    )
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    position = models.CharField(max_length=10, choices=POSITION_CHOICES)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='employees')
    
    def __str__(self):
        return self.name

class Appointment(models.Model):
    

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    employees = models.ManyToManyField(Employee, related_name='appointments')
        
    def __str__(self):
        return f"{self.title} - {self.start_time}"

    class Meta:
        ordering = ['start_time']