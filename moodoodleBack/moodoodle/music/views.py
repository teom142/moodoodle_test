# music view.py
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .serializers import MusicSerializer, MusicMooodSerializer
from .models import Music_Mood, Music
from diary_mood.models import Diary_Mood
from sklearn.metrics.pairwise import cosine_similarity


class MusicCreateView(CreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = MusicSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MusicMoodView(CreateAPIView):
    serializer_class = MusicMooodSerializer

    # def get_object(self):
    #     music_id = self.kwargs.get('music_id')
    #     return get_object_or_404(Music_Mood, music_id=music_id)

    def get(self, request, *args, **kwargs):
        diary_id = self.kwargs.get('diary_id')
        diary_mood = Diary_Mood.objects.filter(diary_id=diary_id).values_list()
        musics = Music.objects.values()
        diary = []
        for i in diary_mood:
            diary.append(i[2:9])
        music_mood = Music_Mood.objects.values_list()
        ret =[]
        for i in music_mood:
            ret.append(i[2:])
        sim = cosine_similarity(diary, ret)
        sim_idx = []
        for i in range(len(sim[0])):
            sim_idx.append([sim[0][i], i+1, musics[i]])
        sim_idx = sorted(sim_idx, key=lambda x:x[0], reverse=True)
        return Response({
            # "diary mood" : diary,
            # "mood data" : ret,
            # "musics" : musics[2],
            "recomand music" : sim_idx[:10]
        }, status=status.HTTP_200_OK)