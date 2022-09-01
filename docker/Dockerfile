FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "hello-world.js" ]


# docker build -t itayp/example1:1.0.11 .
# docker push itayp/example1:1.0.11
# kubectl get services -n ingress-nginx
#   kubectl apply -f .
#   kubectl describe ingress example1 -n qa
#   kubectl describe service example1 -n qa
#   kubectl describe deployment example1 -n qa
 