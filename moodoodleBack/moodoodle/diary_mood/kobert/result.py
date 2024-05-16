import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm.notebook import tqdm
from .BERTSentenceTransform import BERTSentenceTransform
# from .BERTClassfier import BERTClassifier
from kobert_tokenizer import KoBERTTokenizer
from transformers import BertModel

# kobert 공식 git에 있는 get_kobert_model 선언
def get_kobert_model(model_path, vocab_file, ctx="cpu"):
    bertmodel = BertModel.from_pretrained(model_path)
    device = torch.device(ctx)
    bertmodel.to(device)
    bertmodel.eval()
    vocab_b_obj = nlp.vocab.BERTVocab.from_sentencepiece(vocab_file, padding_token='[PAD]')
    return bertmodel, vocab_b_obj

class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size = 768,
                 num_classes = 7, #7가지 분류
                 dr_rate = None,
                 params = None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size , num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p = dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device),return_dict = False)
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)


class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, vocab, max_len,
                 pad, pair):
        transform = BERTSentenceTransform(bert_tokenizer, max_seq_length=max_len,vocab=vocab, pad=pad, pair=pair)
        #transform = nlp.data.BERTSentenceTransform(
        #    tokenizer, max_seq_length=max_len, pad=pad, pair=pair)
        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i], ))

    def __len__(self):
        return (len(self.labels))



def predict(predict_sentence): # input = 감정분류하고자 하는 sentence
    # 하이퍼 파라미터 설정
    max_len = 100
    batch_size = 64
    device = "cuda" if torch.cuda.is_available() else "cpu"

    tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')

    bertmodel, vocab = get_kobert_model('skt/kobert-base-v1',tokenizer.vocab_file)
    model = BERTClassifier(bertmodel,  dr_rate = 0.5).to(device)
    model.load_state_dict(torch.load("E:\폴더\개발\kobert_django\kobert_test\moodoodle\diary_mood\kobert\model.pt", map_location=device))
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tokenizer, vocab, max_len, True, False) # 토큰화한 문장
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size = batch_size, num_workers = 5) # torch 형식 변환

    #model.eval()
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(tqdm(test_dataloader)):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length = valid_length
        label = label.long().to(device)

        out = model(token_ids, valid_length, segment_ids)


        result = []
        # mood = ['공포', '놀람', '분노', '슬픔', '중립', '행복', '혐오']
        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()
            logits_MinMax = (logits - logits.min(axis=0)) / (logits.max(axis=0) - logits.min(axis=0))
            logits_ratio = logits_MinMax / logits_MinMax.sum()
            result.append(logits_ratio.tolist())
        # for i in test_eval:
        #   for j in zip(i, mood):
        #     result.append(j)
    return result[0]