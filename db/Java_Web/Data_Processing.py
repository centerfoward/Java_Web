import os
import sys
import subprocess

File = 'inputFile.txt'

try:
    from dotenv import load_dotenv
except:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--upgrade', 'pip'])
    subprocess.check_call([sys.executable,'-m', 'pip', 'install', '--upgrade', 'python-dotenv'])
    from dotenv import load_dotenv

try:
    from pymongo import MongoClient
except:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--upgrade', 'pip'])
    subprocess.check_call([sys.executable,'-m', 'pip', 'install', '--upgrade', 'pymongo'])
    from pymongo import MongoClient
    
    
load_dotenv()

MongoDB_URL = os.environ.get('URL')
client = MongoClient(MongoDB_URL)
db = client.db
db.input.delete_many({})

def Data_Processor(number_count):
    input_data = open("inputFile.txt", 'r')
    #test_data = input_data.readline()

    read_data = (input_data.readlines())

    arr_data = []
    

    for i in range(len(read_data)):
        if read_data[i][1] != 't':
            arr_data.extend([read_data[i].split()])

    arr_data = list(filter(None, arr_data))
    
    rows = 25
    cols = 10
    list_data = [[0 for j in range(cols)] for i in range(rows)]

    for i in range(len(arr_data)):
        if len(arr_data[i]) == 6:
            number_count += 1
   
    if number_count == 50:
        for i in range(10):
            arr_plus = int(0)
            for j in range(5):
                for k in range(5):
                    list_data[arr_plus][i] = int(arr_data[(j)+(i*5)][k+1])
                    arr_plus += 1
    else:
        if os.path.isfile(File):
            os.remove(File)
        print(False)
        return False
        
    for i in range(len(list_data)):
        post = {
            "number" : i,"min": min(list_data[i]), "max": max(list_data[i]), "avg":sum(list_data[i])/10
        }
        db.input.insert_one(post)

    input_data.close()
    if os.path.isfile(File):
        os.remove(File)
    print(True)
    return True
    
if __name__ == '__main__':
    Data_Processor(0)
