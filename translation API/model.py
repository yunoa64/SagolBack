from transformers import pipeline
from flask import Flask, request, jsonify

app = Flask(__name__)
pipe = pipeline("text2text-generation", model="QuoQA-NLP/KE-T5-En2Ko-Base")

#Flask test용 코드
@app.route('/', methods=['GET'])
def index():
    return request.args.get('test') + "a"

@app.route('/translate', methods=['GET'])
def translate():
    return pipe(request.args.get('text'), max_length=1000)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port="9090")