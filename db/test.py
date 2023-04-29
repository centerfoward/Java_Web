from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.test

r_txt = open('inputFile.txt', 'r')
l_num = 1
line = r_txt.readline()

while line:
    core = line.split()

    if len(core) != 0 and core[0] != 'task1':
        print(core)
        post = {
             "core #{0}".format(l_num):[core[1], core[2], core[3], core[4], core[5]]
        }
        #doc = {'core': core[0], 'task1' : core[1], 'task2':core[2],'task3':core[3],'task4':core[4],'task5':core[5]}
        db.users.insert_one(post)
    line = r_txt.readline()
    l_num += 1
    #print(line)
r_txt.close()
