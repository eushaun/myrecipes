from db import query
from recommender import get_recommended
import sys
import pandas as pd

def get_likes(rid, likes):
    if (rid,) in likes:
        return 1
    else:
        return 0

def get_total_likes(uid, df_recipes):
    return df_recipes[df_recipes['uid'] == uid].likes.sum()

if __name__ == '__main__':
    # input user id argument
    uid = int(sys.argv[1])

    # empty feed data
    df_feed = pd.DataFrame(columns=['rid','title','date','total_likes','time'])

    # database queries
    subscribers = query(f"select s.conid from subscribers as s where subid = {uid}")
    likes = query(f"select r.rid from recipes as r, likes as l where l.uid = {uid} and l.rid = r.rid")
    comments = query(f"select r.rid from recipes as r, comments as c where c.uid = {uid} and c.rid = r.rid")
    recipes_table = query("select rid, uid, title, rdate, rtime from recipes")

    # modify recipes table
    df_recipes = pd.DataFrame(recipes_table, columns=['rid','uid','title','date','time'])
    df_recipes['likes'] = df_recipes['rid'].apply(get_likes, args=(likes,))
    df_recipes['total_likes'] = df_recipes['uid'].apply(get_total_likes, args=(df_recipes,))

    # remove own user's recipe
    df_recipes.drop(df_recipes[df_recipes.uid == uid].index, inplace=True)

    # subscribers
    if subscribers:
        recipes = []
        for contrib_id in subscribers:
            for rid, uid, _, _, _ in recipes_table:
                if uid == contrib_id[0]:
                    recipes.append(rid)

        # add to feed data
        for rid in recipes:
            data = df_recipes[df_recipes.rid == rid][['rid','title','date','total_likes','time']]
            df_feed = df_feed.append(data)

    # likes and comments
    interactions = []
    for rid in likes + comments:
        if rid[0] not in interactions:
            interactions.append(rid[0])

    # get recommended recipes based on liked and commented recipes
    if interactions:
        to_recommend = []
        for rid in interactions:
            df_recommended = get_recommended(rid)
            if df_recommended is None:
                continue
            for i in range(0, 5):
                recommend_rid = df_recommended.reset_index().iloc[i].rid
                if recommend_rid not in to_recommend:
                    to_recommend.append(recommend_rid)

        # add to feed data
        for rid in to_recommend:
            data = df_recipes[df_recipes.rid == rid][['rid','title','date','total_likes','time']]
            df_feed = df_feed.append(data)

    # remove any duplicate recipes and sort
    df_feed.drop_duplicates(inplace=True)
    df_feed.sort_values(by=['date','total_likes','time'], ascending=False, inplace=True)

    rid = []
    for i in range(len(df_feed)):
        rid.append(int(df_feed.iloc[i].rid))
    print(rid)
    # print(df_feed)