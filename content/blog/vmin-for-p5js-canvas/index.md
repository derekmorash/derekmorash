---
title: "VMIN for p5js canvas"
description: "A CSS VMIN like function for sizing canvas elements."
date: 2017-10-13
categories: ["Creative Coding"]
tags: ["p5js", "canvas"]
# draft: true
---

I use a similar layout for a lot of my creative codepens and p5js sketches, as you can see in this [collection](https://codepen.io/collection/DLRWGY/). It's just a plain white screen with a canvas floating in the center. It's a tiny bit of CSS (and could probably be even less):

```CSS
html, body {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	margin: 0;
}

canvas {
	box-shadow: 0 0 3em -1em rgba(0, 0, 0, 0.6);
}
```

The canvas gets set to be a square the size of 80% of the viewports smallest width, this way it always fits inside the screen. If the canvas was a div or any other kind of HTML element we could just set it's width and height css properties to be `80vmin` and call it a day, but that's not how canvas works.

[Simple Little Use Case for vmin](https://css-tricks.com/simple-little-use-case-vmin/)

[More on CSS viewport units](https://css-tricks.com/fun-viewport-units/)

## The Problem
A canvas element needs to be given an exact size in pixels, using CSS to set the size will only stretch the canvas but not add the pixels it needs to fill the given dimensions. Canvas is a lot like an image, you might have an image that is 500x500px and with CSS you can tell it to be 1000x1000px, but that won't change the resolution of the image, it will only stretch it.

So we need to use a bit of Javascript to determine the exact number of pixels we want our canvas to be. We'll need three things; the width of the viewport, the height of the viewport, and the percentage we want to us (80%). Viewport sizes can be found relatively easily in in libraries like jquery or p5js and even in plain vanilla Javascript:

* JQUERY: `$(window).width()` or `$(window).height()`
* P5JS: `windowWidth` or `windowHeight`
* Javascript: `window.innerWidth` or `window.innerHeight`

## How to get vmin in js
The vmin equation has two simple steps:

1. Determine which viewport dimension is the smallest
2. Multiply the percentage by the smallest viewport size

The function has an argument called `viewportPercent`, this is where we'll pass `80`. We then divide that by 100 to get a decimal of the percentage we want, `0.8`. Next we set a variable called `viewportMinSize`, this is set using the `Math.min` function. Math.min takes two or more arguments and returns the smallest of the set, we'll pass it the viewport width and height. The last thing we need to do is multiply the given percentage, `viewportPercent`, by the smallest viewport unit, `viewportMinSize`, and return the value.

```JAVASCRIPT
function vmin(viewportPercent) {
	viewportPercent = viewportPercent / 100
	var viewportMinSize = Math.min(window.innerWidth, window.innerHeight);
	return viewportPercent * viewportMinSize;
}
```

Now we can call this function like this: `var canvasWidth = vmin(80)`.