---
title: My First Blog Post
date: 2023-03-08
author: John Doe
tags:
  - technology
  - programming
---

You might have stumbled upon a browser game called [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/). It's a game full of cookies and your goal is to get as many cookies as possible. You can literally get Infinite cookies and in this blog I'll show you how.

> **DISCLAIMER** this method I show here works only on computers. If you use an android device you need to download an app called [F12](https://play.google.com/store/apps/details?id=com.asfmapps.f12 "Link to the app")

# Accessing the javascript console
To access the javascript console you need to right click and press "Inspect" or press Ctrl + Shift + I (F12)

![Opened javascript console](/static/images/CookieConsole.png "Opened console")

Now that you are in the console you can start writing some commands.

# Unlocking any achievement by name

You can get literally **any** achievement by just typing this simple command into the console:
```javascript
Game.Win('The achievements name')
```
If you don't know what is the name of the achievement you are looking for. You can get the whole list of the achievements with this command:
```javascript
Game.Achievements
```
![All the achievements printed in the console](/static/images/CookieAchievements.png "All of the achievements printed out")

# Unlocking every achievement
It would be boring to type out every achievements name one by one. With the method I showed before. So I created a command that can do that:
```javascript
for (var i in Game.Achievements){
    Game.Win(Game.Achievements[i].name)
}
```
This command will essentially go through all of the achievements and unlock them.

# Getting infinite cookies
Yeah you read that right. You can get infinite cookies!! It's personally my favorite command, because I can buy anything with it. And the command is pretty simple:
```javascript
Game.cookies = Infinity
```

That is everything for hacking cookie clicker. If you want to see some hacks for a different browser game, write it into the comments and I might do a blog about it.
