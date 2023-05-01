# 100 pages from api data written to mymovies collection in mongodb
import os
import requests
import pymongo

# Replace with your own values
mongo_username = os.environ['MONGO_USERNAME']
mongo_password = os.environ['MONGO_PASSWORD']
API_KEY = "3c1f65014c707ae09cc97c83343c784e"
MONGODB_URI = "mongodb+srv://"+mongo_username+":"+mongo_password+"@cluster0.aamdo0l.mongodb.net/test?retryWrites=true&w=majority"
DB_NAME = "reviews"
print(MONGODB_URI)
# Connect to MongoDB
client = pymongo.MongoClient(MONGODB_URI)
db = client[DB_NAME]

# Fetch data from API
for i in range(1, 6):
  response = requests.get(f"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key={API_KEY}&page="+str(i))
  data = response.json()["results"]
  # Insert data into MongoDB
  db.mymovies.insert_many(data)

  print("Data inserted successfully!")
