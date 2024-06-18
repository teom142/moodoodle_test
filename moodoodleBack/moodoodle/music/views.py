# music view.py
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import MusicSerializer, MusicMoodSerializer, MusicMappingSerializer
from .models import Music_Mood, Music, Music_Mapping
from diary.models import Diary
from diary_mood.models import Diary_Mood
from user.models import users, Survey
from sklearn.metrics.pairwise import cosine_similarity
import random as r
from diary_mood.kobert.result import predict

def random_music(lis):
    num = r.randint(0, len(lis) - 1)
    return num

class MusicCreateView(CreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = MusicSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MusicListView(ListAPIView):
    serializer_class = MusicSerializer
    
    def get_queryset(self):
        return Music.objects.all()

    def get(self, request, *args, **kwargs):
        musics = self.get_queryset()
        serializer = self.serializer_class(musics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MusicMoodCreateView(CreateAPIView):
    serializer_class = MusicSerializer

    def create(self, request, *args, **kwargs):
        mood_data = predict(request.data.get('l'))
        music_id = request.data.get('id')
        mood = Music_Mood.objects.create(music_id = Music.objects.get(music_id=music_id),
                                              fear=mood_data[0],
                                              surprised=mood_data[1],
                                              anger=mood_data[2],
                                              sad=mood_data[3],
                                              normal=mood_data[4],
                                              happy=mood_data[5],
                                              aversion=mood_data[6])
        return Response({
            "music_mood_id" : mood.music_mood_id
        })

class MusicMoodView(CreateAPIView):
    serializer_class = MusicMoodSerializer

    # def get_object(self):
    #     music_id = self.kwargs.get('music_id')
    #     return get_object_or_404(Music_Mood, music_id=music_id)

    def get(self, request, *args, **kwargs):
        diary_id = kwargs.get('diary_id')
        id = kwargs.get('id')

        user = users.objects.get(id=id)
        diary_mood = Diary_Mood.objects.get(diary_id=diary_id)
        mood_colors = {
            "DBD3FB" : "negative",
            "FEF4A0" : "negative",
            "FF9191" : "negative",
            "B5D3FF" : "negative",
            "B3F4B2" : "positive",
            "FBCFE0" : "positive",
            "FECFAD" : "negative"
        }

        musics = []
        if diary_mood.color in mood_colors:
            surveys = Survey.objects.filter(user_id=user.user_id, question=mood_colors[diary_mood.color])
            for survey in surveys:
                musics.extend(Music.objects.filter(genre=survey.answer))

        if not musics:
            return Response({
                'success': False,
                'status_code': status.HTTP_404_NOT_FOUND,
                'message': "추천할 음악을 찾을 수 없습니다."
            }, status=status.HTTP_404_NOT_FOUND)

        diary_mood_values = list(Diary_Mood.objects.filter(diary_id=diary_id).values_list())
        diary = [mood[2:9] for mood in diary_mood_values]
        #music_mood_values = list(Music_Mood.objects.values_list())
        music_mood_values = []
        for i in musics:
            music_mood_values.append(list(Music_Mood.objects.filter(music_id=i.music_id).values_list()))
        ret = [mood[0][2:] for mood in music_mood_values]

        sim = cosine_similarity(diary, ret)
        sim_music = []
        for i in range(min(len(sim[0]), len(musics))):
            music_data = MusicSerializer(musics[i]).data
            if(sim[0][i] > 0.8):
                sim_music.append({
                    "similarity": sim[0][i],
                    "music": music_data
                })
        sim_music = sorted(sim_music, key=lambda x: x["similarity"], reverse=True)

        return Response({
            "success" : True,
            "status_code" : 200,
            "message" : "요청에 성공하였습니다.",
            "diary_id" : diary_id,
            "recomand_music" : sim_music[random_music(sim_music)]
        }, status=status.HTTP_200_OK)

class MusicMappingView(CreateAPIView):
    serializer_class = MusicSerializer

    def get(self, request, *args, **kwargs):
        diary_id = self.kwargs.get('diary_id')
        id = self.kwargs.get('id')
        
        diary = Diary.objects.get(diary_id=diary_id)
        music = MusicMoodView().get(self, request, diary_id=diary_id, id=id)
        recommended_music = music.data.get('recomand_music', {})

        try:
            mapping_instance = Music_Mapping.objects.get(diary_id=diary)
            music_id = mapping_instance.music_id
            similarity = mapping_instance.similarity
            serializer = self.serializer_class(music_id)
            
            return Response({
                'success': True,
                'status_code': status.HTTP_201_CREATED,
                'message': "요청에 성공하였습니다.",
                'diary_id' : diary_id,
                'recomand_music' : {
                    'similarity': similarity,
                    'music': serializer.data
                    }
            }, status=status.HTTP_201_CREATED)
        except Music_Mapping.DoesNotExist:
            mapping_instance = Music_Mapping.objects.create(diary_id=diary)
            music_id = recommended_music['music']['music_id']
            similarity = recommended_music['similarity']

            if music_id is not None:
                music_instance = Music.objects.get(music_id=music_id)
                mapping_instance.similarity = similarity
                mapping_instance.music_id = music_instance
                mapping_instance.save()

            return Response({
                'success': True,
                'status_code': status.HTTP_201_CREATED,
                'message': "요청에 성공하였습니다.",
                'diary_id' : diary_id,
                'recomand_music' : recommended_music
            }, status=status.HTTP_201_CREATED)