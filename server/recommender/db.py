from configparser import ConfigParser
import psycopg2
import os

def config(filename=os.getcwd() + '/recommender/config.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db

def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    # read connection parameters
    params = config()

    # connect to the PostgreSQL server
    # print('Connecting to the PostgreSQL database...')
    conn = psycopg2.connect(**params)

    return conn

def query(query):
    conn = connect()

    # create cursor
    cur = conn.cursor()

    # query database
    cur.execute(query)

    # return results
    res = cur.fetchall()

    cur.close()

    close(conn)
    return res

def close(conn):
    if conn:
        conn.close()
        # print('Database connection closed.')