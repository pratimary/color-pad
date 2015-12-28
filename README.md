# color-pad
The goal is to create a simple collaborative drawing app using <canvas> that allows users in the same room to draw together. The requirements are:

Whenever a user draws on their own canvas, all other users in the room should be updated in real-time with their changes.
Each user in the room should be assigned a unique color, to distinguish what they draw from everyone else.
Users are considered in the same room when they make a websocket connection to the same URL
