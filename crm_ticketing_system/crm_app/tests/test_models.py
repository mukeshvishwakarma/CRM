# tickets/tests/test_models.py

import pytest
from crm_app.models import Ticket, Comment

@pytest.mark.django_db
def test_ticket_creation():
    ticket = Ticket.objects.create(
        title='Test Ticket',
        name='Test Name',
        platform='zomato',
        restaurant_branch='ANDHERI',
        description='Test description',
        status='open'
    )
    assert ticket.title == 'Test Ticket'
    assert ticket.platform == 'zomato'
    assert ticket.restaurant_branch == 'ANDHERI'
    assert ticket.status == 'open'

@pytest.mark.django_db
def test_comment_creation():
    ticket = Ticket.objects.create(
        title='Test Ticket',
        name='Test Name',
        platform='zomato',
        restaurant_branch='ANDHERI',
        description='Test description',
        status='open'
    )
    comment = Comment.objects.create(
        ticket=ticket,
        comment='This is a test comment'
    )
    assert comment.ticket == ticket
    assert comment.comment == 'This is a test comment'
