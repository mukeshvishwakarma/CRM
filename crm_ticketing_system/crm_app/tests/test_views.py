# tickets/tests/test_views.py

import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from crm_app.models import Ticket, Comment
from django.contrib.auth.models import User

@pytest.fixture
def user():
    return User.objects.create_user(username='testuser', password='testpass')

@pytest.fixture
def api_client(user):
    client = APIClient()
    client.force_authenticate(user=user)
    return client

@pytest.fixture
def ticket():
    return Ticket.objects.create(
        title='Test Ticket',
        name='Test Name',
        platform='zomato',
        restaurant_branch='ANDHERI',
        description='Test description',
        status='open'
    )

def test_create_ticket(api_client):
    url = reverse('ticket-list')
    data = {
        'title': 'New Ticket',
        'name': 'New Name',
        'platform': 'swiggy',
        'restaurant_branch': 'MALAD',
        'description': 'New description',
        'status': 'open'
    }
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert Ticket.objects.count() == 1
    assert Ticket.objects.get().title == 'New Ticket'

def test_add_comment(api_client, ticket):
    url = reverse('ticket-add-comment', args=[ticket.id])
    data = {
        'comment': 'This is a test comment'
    }
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert Comment.objects.count() == 1
    assert Comment.objects.get().comment == 'This is a test comment'

def test_cannot_comment_on_closed_ticket(api_client, ticket):
    ticket.status = 'closed'
    ticket.save()
    url = reverse('ticket-add-comment', args=[ticket.id])
    data = {
        'comment': 'Cannot comment on closed ticket'
    }
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert Comment.objects.count() == 0

def test_create_comment(api_client, ticket):
    url = reverse('comment-list')
    data = {
        'ticket': ticket.id,
        'comment': 'This is a test comment'
    }
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert Comment.objects.count() == 1
    assert Comment.objects.get().comment == 'This is a test comment'

def test_create_comment_with_error(api_client):
    url = reverse('comment-list')
    data = {
        'comment': 'This comment will fail'
    }
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
