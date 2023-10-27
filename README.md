# SabolBack

repository에 있는 내용들은 백엔드를 구성하는 소스코드이고, 실행은 docker를 통해 하시면 됩니다.

실행법
1) 백엔드 폴더 하나를 지정한다. ex) SagolBack

2) 지정한 폴더의 하위 폴더로 data/db를 생성한다. (지정한 폴더의 하위 폴더로 data가, data의 하위 폴더로 db가) ex) SagolBack/data/db

3) repository에 있는 compose.yaml 폴더를 지정한 백엔드 폴더에 넣는다. ex) SagolBack/compose.yaml

4-1) (linux 기준) sudo docker-compose up 명령어를 입력해 실행한다. 실행 주소: http://172.16.162.72:3002/

4-2) (windows 기준) docker compose up 명령어를 입력해 실행한다. 실행 주소: http://localhost:3002/

Docker hub 주소: https://hub.docker.com/r/yunoa64/sagolback