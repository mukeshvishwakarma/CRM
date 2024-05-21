from django.db import models

class Ticket(models.Model):
    PLATFORM_CHOICES = [
        ('zomato', 'Zomato'),
        ('swiggy', 'Swiggy'),
        ('google', 'Google'),
    ]

    BRANCH_CHOICES = [
        ('ANDHERI', 'ANDHERI'),
        ('MALAD', 'MALAD'),
        ('BORIVALI', 'BORIVALI'),
    ]

    STATUS_CHOICES = [
        ('open', 'Open'),
        ('on hold', 'On Hold'),
        ('closed', 'Closed'),
        ('unassigned', 'Unassigned')
    ]

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False)
    name = models.CharField(max_length=255, null=False,default='Name')
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES, null=False, default='zomato')  # Example default value
    restaurant_branch = models.CharField(max_length=20, choices=BRANCH_CHOICES, null=False,default='Andheri')
    description = models.TextField(null=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'ticket'


class Comment(models.Model):
    ticket = models.ForeignKey(Ticket, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'comment'
