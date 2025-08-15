# Must create a docker file for front and back end
# pip freeze > requirements.txt = create req.txt file
# touch Dockerfile = create docker file
# fill in the docker file with all necessary info
# docker build -t simple_ai_project . = build the docker image
# docker run -d -p 8080:8080 --env-file ../.env simple_ai_project #!important you are in the root of front or backedn - the side you want to create the image for!!!!
    # image = read only tmeplate of project, used for sharing, immutable
    # container = running instance of image, mutable, needs an image, can e saved as new image
# docker images = ensure image was created in terminal
#  docker run -d -p 8080:8080 --env-file ../.env simple_ai_project
    # -d = detached mode
    # -p = port
    # --env-file ../.env = loads env variables
    # runs the image 

# Get a base image
FROM python:3.9.18-alpine3.18

# Create a working directory inside the image
WORKDIR /app

# get all necessary depencies from the requirements file
# to get all requirements pip freeze > requirement.txt, to see all dependencies pip list
COPY requirements.txt .

# install all depencies in the image 
RUN pip install -r requirements.txt 

# copy the flask application into the image
COPY . . 

# expose a port
EXPOSE 8000

# Setting ENV variables
#! UNSURE ABOUT THIS LINE
ENV FLASK_APP=__init__.py 
# !DONT UNDERSTAND THIS LINE 
# all the zeros represent the local host
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8000
ENV DATABASE_URL=sqlite:///dev.db

# run the application
CMD ["flask", "run"]