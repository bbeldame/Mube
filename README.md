# Mube
![cube](http://hdwallpaperdaily.com/wp-content/uploads/2014/07/space-cube-wallpaper-1920x1080.jpg)
## Description

- Mube is an app that allows two people to connect with websockets, showing a simple cube as an interface. 
- When two people connect they can use their phone's accelerometer to make the cube of the other person rotate.

## How to install
 
- move to /server directory
- `npm install`
- then move to /react-web directory
- `npm install` 

## How to start app

- first start server :
- move to /server directory and use 
- `npm run dev`
- then start web app :
- move to /react-web directory
- `npm start`

## How to use

- While on the same Wi-Fi network, you will need to modify socketIO IP with your local IP in /react-web/APP.js. 
- example :
- `// Creating the socket-client instance will automatically connect to the server.`
- `this.socket = SocketIOClient('http://127.0.0.1:3000');`
- To connect two clients simply tap or click the cube the same number of times, you'll know you're connected if both cubes are the same color.


————————————
## Developer(s)

- [bbeldame](https://github.com/bbeldame) : Basile Beldame
- [Drakncel](https://github.com/Drakncel) : Florian Pigis
- [Kier4n](https://github.com/Kier4n) : Kieran Boggs

## Implemented features

- WebsocketIO connection
- Phone accelerometer exchange
- Three.js

## Planned features

- Better rotation fluidity
- Better cube design with three.js
- General UI changes
- Connection status visual



————————————
