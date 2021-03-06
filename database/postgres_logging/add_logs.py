import pandas as pd
import psycopg2
import psycopg2 as pg
import sys
from psycopg2 import OperationalError, errorcodes, errors
import subprocess

def show_psycopg2_exception(err):
    # get details about the exception
    err_type, err_obj, traceback = sys.exc_info()
    # get the line number when exception occured
    line_n = traceback.tb_lineno
    # print the connect() error
    print("\npsycopg2 ERROR:", err, "on line number:", line_n)
    print("psycopg2 traceback:", traceback, "-- type:", err_type)
    # psycopg2 extensions.Diagnostics object attribute
    print("\nextensions.Diagnostics:", err.diag)
    # print the pgcode and pgerror exceptions
    print("pgerror:", err.pgerror)
    print("pgcode:", err.pgcode, "\n")


def execute_many(conn, datafrm, table):
    # Creating a list of tupples from the dataframe values
    tpls = [tuple(x) for x in datafrm.to_numpy()]

    # dataframe columns with Comma-separated
    cols = ','.join(list(datafrm.columns))

    # SQL query to execute
    #sql = "add_logs_data(%s, %s)" % (cols[0],cols[1])

    sql = "INSERT INTO %s(%s) VALUES(%%s,%%s)" % (table, cols)
    print(sql)
    cursor = conn.cursor()
    try:
        cursor.executemany(sql, tpls)
        conn.commit()
        print("Data inserted using execute_many() successfully...")
    except (Exception, psycopg2.DatabaseError) as err:
        # pass exception to function
        show_psycopg2_exception(err)
        cursor.close()


connection = pg.connect("host=group3-1-i.comp.nus.edu.sg dbname=logs "
                        "port= 5435 user=postgres password=mysecretpassword")
connection.autocommit = True

if connection != None:

    try:
        cursor = connection.cursor();
        headers = ["log_time", "activity"]
        cursor.execute("DROP TABLE IF EXISTS logs_data;")

        table = '''CREATE TABLE IF NOT EXISTS 
                logs_data (
                  log_time varchar, 
                  activity varchar
                )'''
        function = ''' CREATE OR REPLACE PROCEDURE add_logs_data(log_time varchar, activity varchar)
                AS $$
                  BEGIN
                    INSERT INTO logs_data VALUES (log_time, activity);
                  END;
                $$ LANGUAGE plpgsql;'''
        cursor.execute(table);

        command= pd.read_table("load_logs.data", sep=';',
                                   names=headers)
        print(len(command))
        # Run the execute_many method
        execute_many(connection, command, 'logs_data')

        # Closing the cursor & connection
        cursor.close()
        connection.close()
    except OperationalError as err:
        # pass exception to function
        show_psycopg2_exception(err)
        # set the connection to 'None' in case of error
        conn = None

