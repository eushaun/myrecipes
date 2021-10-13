from db import query
import nltk
from nltk.stem.snowball import SnowballStemmer
from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import pickle
import os

# convert each word back to its stem
def stem_words(string):
    snowBallStemmer = SnowballStemmer("english")
    wordList = nltk.word_tokenize(string)
    stemWords = [snowBallStemmer.stem(word) for word in wordList]
    res = ' '.join(stemWords)

    return res

# clean each word by converting to lower case, removing whitespaces, convert to stem words
def clean(res):
    ingredients = ''
    for r in res:
        ingredients += r
        ingredients += ' '

    ingredients = ingredients.lower()
    ingredients = ingredients.strip()
    ingredients = stem_words(ingredients)

    return ingredients

def process(res):
    # convert query results into dictionary with key = rid and value = ingredient name
    d = defaultdict(list)
    # dictionary with key = rid and value = title
    lookup = {}

    for ingredient, title, rid in res:
        d[rid].append(ingredient)
        if rid not in lookup:
            lookup[rid] = title

    for rid, ingredients in d.items():
        d[rid] = clean(ingredients)

    return d, lookup

# convert queried result into a dataframe
def to_dataframe(res):
    df = pd.DataFrame(res, index=['ingredients']).T
    df.reset_index(drop=False, inplace=True)
    df.columns=['rid', 'ingredients']

    return df

# computes a pairwise cosine similarity matrix between all the recipes
def compute_similarity(df):
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df.ingredients)

    return cosine_similarity(tfidf_matrix, tfidf_matrix)


if __name__ == '__main__':

    # get all ingredients fom database
    res = query("SELECT i.name, r.title, r.rid FROM ingredients AS i, quantities AS q, recipes AS r WHERE q.rid = r.rid AND i.iid = q.iid")
    # print(res)

    # convert to pandas dataframe
    d, lookup = process(res)
    df = to_dataframe(d)
    # print(df)

    # compute cosine similarity between all recipes
    cosim_matrix = compute_similarity(df)

    # save cosine matrix in a pickle file
    with open(os.getcwd() + '/recommender/similarity_matrix.pickle', 'wb') as f:
        pickle.dump(cosim_matrix, f)

    # save dataframe in a pickle file
    with open(os.getcwd() + '/recommender/dataframe.pickle', 'wb') as f:
        pickle.dump(df, f)

    # save lookup table
    with open(os.getcwd() + '/recommender/lookup.pickle', 'wb') as f:
        pickle.dump(lookup, f)
