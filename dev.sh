aws configure
(Get-ECRLoginCommand).Password | docker login --username AWS --password-stdin 043309325857.dkr.ecr.us-east-1.amazonaws.com
docker build -t book_service .
docker tag book_service:latest 043309325857.dkr.ecr.us-east-1.amazonaws.com/book_service:latest
docker push 043309325857.dkr.ecr.us-east-1.amazonaws.com/book_service:latest
