from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_experimental.agents import create_pandas_dataframe_agent
import pandas as pd
from langchain.prompts import PromptTemplate
from .models import Book_Mapping

system_template="""
You are a kind recommender for book and your goal is to recommend book.
Recommend books based on the user’s {emo}.
you can use df = pd.read_csv("./book.csv") for dataframe.
Find one book to unconditionally recommend and provide it to the user.
If you find multiple books, recommend them at random among the books you found.
Even if you find data in a DataFrame, navigate to the end to find more appropriate data.
Even if you find a book, read the title and description of the book to see if it is an appropriate recommendation, and if it is inappropriate, recommend another book.

- Final Step
Use what you retrieved.
When you recommend book, you should answer based on this {recommend_format} structure.

Remember that your goal is to recommend book!

***ANSWER IN KOREAN!!***"""

recommend_format = """
TITLE_NM|AUTHR_NM|IMAGE_URL|short recommend reason
***ANSWER IN KOREAN!!***
"""

def recommend_book(emo, diary_id):
    df = pd.read_csv("./book.csv")
    agent = create_pandas_dataframe_agent(
        ChatGoogleGenerativeAI(model="gemini-pro"),  # 모델 정의
        df,  # 데이터프레임
        verbose=False,  # 추론과정 출력
        allow_dangerous_code=True,
        return_intermiate_steps=False,
        agent_executor_kwargs={"handle_parsing_errors": True}
    )
    prompt = PromptTemplate(template=system_template, input_variables=["emo", "recommend_format"])

    chain = (
            prompt |
            agent
    )
    result = chain.invoke({"emo": emo, "recommend_format": recommend_format})
    result = result['output'].split('|')
    if len(result) == 4:
        Book_Mapping.objects.create_book(diary_id=diary_id,
                                         title=result[0],
                                         author=result[1],
                                         cover=result[2],
                                         description=result[3])
        return result
    return None

# print(recommend_book('sad'))