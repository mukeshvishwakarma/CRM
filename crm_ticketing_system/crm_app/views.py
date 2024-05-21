from rest_framework import viewsets, generics, permissions, status
from django.contrib.auth import authenticate
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Ticket, Comment
from .serializers import TicketSerializer, CommentSerializer


class TicketViewSet(viewsets.ModelViewSet):
    
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    
    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        ticket = self.get_object()
        if ticket.status == 'closed':
            return Response({'message': 'Cannot comment on closed ticket'}, status=400)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, ticket=ticket)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def create(self, request):
        try:
            
            # Rename 'content' field to 'comment' to match serializer
            request.data['comment'] = request.data.pop('content', request.data['comment'])
            
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': 'An error occurred while creating the comment', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


