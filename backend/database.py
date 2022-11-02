import psycopg2 as db
from datetime import datetime
from typing import Optional
import os
import dotenv

from bodyModels import RatingDTO

dotenv.load_dotenv(dotenv.find_dotenv())


class Config:
    def __init__(self):
        self.config = {
            "postgres": {
                "user": os.getenv("USERPOSTGREE"),
                "password": os.getenv("PASSWORDPOSTGREE"),
                "host": "127.0.0.1",
                "port": "5432",
                "database": "IC-BRKGA-UFOP"
            }
        }


class Connection(Config):
    def __init__(self):
        Config.__init__(self)
        try:
            self.conn = db.connect(**self.config["postgres"])
            self.cur = self.conn.cursor()
        except Exception as e:
            print("Error na conexão com banco de dados.", e)
            exit(1)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.commit()
        self.connection.close()

    @property
    def connection(self):
        return self.conn

    @property
    def cursor(self):
        return self.cur

    def commit(self):
        self.connection.commit()

    def fetchall(self):
        return self.cursor.fetchall()

    def execute(self, sql, paramns: Optional[tuple] = None):
        if paramns is None:
            return

        self.cursor.execute(sql, paramns)

    def query(self, sql, paramns=None):
        self.cursor.execute(sql, paramns or ())
        return self.fetchall()


class RequestsDB(Connection):
    def __init__(self):
        Connection.__init__(self)

    def insertRating(self, rating: RatingDTO, *args):
        try:
            sql = f"INSERT INTO rating VALUES('{rating.email}', '{rating.name}', '{rating.ratingOne}', '{rating.ratingTwo}', '{rating.ratingThree}', '{rating.ratingFour}', '{rating.ratingDate}', '{rating.ratingText}', 'False')"

            self.execute(sql, sql)
            self.commit()
        except Exception as e:
            print("Erro ao inserir", e)

    def updateRating(self, email, verified, *args):

        try:
            sql = f"UPDATE rating SET Verified = %s WHERE Email=%s"

            self.execute(sql, (verified, email))

            self.commit()
        except Exception as e:
            print("Erro ao atualizar", e)

    def login(self, email, password, *args):

        sql = f"SELECT * FROM admin WHERE Email = %s AND Password = %s"
        res = self.query(sql, (email, password))
        self.commit()

        if (len(res) != 1):
            return False
        else:
            return True

    def getAllRating(self, *args):
        sql = f"SELECT * FROM rating ORDER BY name, email"

        res = self.query(sql)
        self.commit()

        res_json = []

        for i in range(len(res)):

            res_json.append({
                "email": str(res[i][0]),
                "name": str(res[i][1]),
                "ratingOne": float(res[i][2]),
                "ratingTwo": float(res[i][3]),
                "ratingThree": float(res[i][4]),
                "ratingFour": float(res[i][5]),
                "ratingDate": str(res[i][6]),
                "ratingText": str(res[i][7]),
                "verified": bool(res[i][8])
            })

        return res_json

    def getAllRatingVerified(self, *args):

        sql = f"SELECT name, ratingOne, ratingTwo, ratingThree, ratingFour, ratingDate, ratingText FROM rating WHERE Verified=true"

        res = self.query(sql)
        self.commit()

        res_json = []

        for i in range(len(res)):

            res_json.append({
                "name": str(res[i][0]),
                "ratingOne": float(res[i][1]),
                "ratingTwo": float(res[i][2]),
                "ratingThree": float(res[i][3]),
                "ratingFour": float(res[i][4]),
                "ratingDate": str(res[i][5]),
                "ratingText": str(res[i][6]),
            })

        return res_json

    def deleteRating(self, email, *args):

        # sql = f"DELETE FROM rating WHERE Email = %s"
        sql = f"DELETE FROM rating WHERE Email = '{email}'"
        # sql2 = f"INSERT INTO rating(email, name) values('{rating.email}', '{rating.name}')"

        self.execute(sql, email)

        self.commit()

    def getAllRatingInfo(self, *args):

        sql = f"select COUNT (*), (SELECT COUNT (*) from rating WHERE verified = True), (SELECT COUNT (*) from rating WHERE verified = False), (SELECT AVG(ratingOne + ratingTwo + ratingThree + ratingFour) FROM rating) FROM rating"
        res = self.query(sql)
        self.commit()

        res_json = {
            "totalRating": res[0][0],
            "numberRatingVerified": res[0][1],
            "numberRatingNotVerified": res[0][2],
            "averageRating": res[0][3] / 4}

        print(res_json)

        return res_json
