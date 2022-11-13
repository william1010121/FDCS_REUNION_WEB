import sys

def ReadFile(filepth) :
    with open(filepth, encoding='utf-8')  as file :
        data = file.read();
    return data;

def WriteFile(filepth, data, method='w') :
    with open(filepth, mode=method,encoding='utf-8') as file :
        file.write(data);


if __name__ == '__main__' :
    data = ReadFile('story_origin/art1.txt');
    data = data.split();
    for i in range(len(data)) :
        data[i] = data[i].strip();
    ans = '';
    for i in data :
        ans += i + '\n';
    print( ans );
    WriteFile('story_trans/art1.txt', ans);