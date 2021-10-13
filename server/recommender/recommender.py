import pandas as pd
import numpy as np
import sys
import pickle
import os


def get_most_similar(df, input_index, lookup, cosim_array):
    # use pandas for easier handling
    df_cosim = pd.DataFrame(cosim_array, columns=['cosim'])
    # sort cosine similarity values by ascending order
    df_cosim.sort_values(by='cosim', ascending=False, inplace=True)
    # remove reference recipe from the result
    df_cosim = df_cosim[df_cosim.index != input_index]
    # link rid from previous df
    res = df_cosim.join(df['rid'], how='inner')
    # get recipe title from lookup dictionary
    res['title'] = res['rid'].apply(lambda x: lookup[x])

    return res


def get_recommended(input_rid):
    # load all pickle files
    with open(os.getcwd() + '/recommender/similarity_matrix.pickle', 'rb') as f:
        cosim_matrix = pickle.load(f)

    with open(os.getcwd() + '/recommender/dataframe.pickle', 'rb') as f:
        df = pickle.load(f)

    with open(os.getcwd() + '/recommender/lookup.pickle', 'rb') as f:
        lookup = pickle.load(f)

    # find the most similar recipes
    try:
        input_index = df[df['rid'] == input_rid].index[0]
        cosim_array = cosim_matrix[input_index]
        df = get_most_similar(df, input_index, lookup, cosim_array)
    except:
        df = None

    return df


if __name__ == '__main__':
    input_rid = int(sys.argv[1])
    rid = []
    df = get_recommended(input_rid)

    # check for non-existent recipes or ingredients
    if df is None:
        print(rid)
    # print top 5 recipes to recommend
    else:
        for i in range(0, 5):
            # don't include recipes with no similarity
            similarity = int(df.reset_index().iloc[i].cosim*100)
            if similarity > 0:
                rid.append(df.reset_index().iloc[i].rid)
                # print(f"Recommendation {i+1}: {df.reset_index().iloc[i].title} (rid: {df.reset_index().iloc[i].rid}) with {int(df.reset_index().iloc[i].cosim*100)}% similarity.")
        print(rid)
