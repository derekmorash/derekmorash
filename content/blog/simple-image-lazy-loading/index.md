---
title: "Simple Image Lazy Loading"
categories: ["Performance", "Animation"]
tags: ["CSS", "JS", "Lazy Load"]
date: 2017-05-17
---

Quick post to explain a simple lazy loading technique. The main idea here is to initially load a very small resolution version of the image at first to speed up initial page load, and then replace that low res image with a higher res version once everything on the page is finished loading.

One thing you need before getting started is two versions of each photo you want to lazy load. One is low res, I chose a 100x100 version, and a high res, I went with 500x500. The low res images are only 2-4kb each so they will speed up the initial page load, giving a faster perceived performance to the user. Most CMS's handle image resizing for you, for example in shopify you can request any size you want using the [asset url filter](https://help.shopify.com/themes/liquid/filters/url-filters#asset_img_url).

## Markup
This might looking confusing. There's an img element but also a background image on the anchor, what's with that? The img element is visually hidden with css, this allows us to use it for loading the high res version of the image without the user seeing it being downloaded. It's also a good idea because the image is technically content.

The background image is what the user actually sees. Using a background image also gives easier control over centre cropping with css `background-position: center;` and `background-size: cover;`.

The last thing we need is a data attribute to hold the url for the new high resolution photo we want to be loaded in place of the low res one that is originally loaded.

```HTML
<a class="card-image"
	href="/page-two"
	style="background-image: url(tiny-size.jpg);"
	data-image-full="full-size.jpg">
		<img src="tiny-size.jpg" />
</a>
```

## CSS
The css for this will depend on your design and layout but main idea here is to make the img tag invisible but still accessible, and to also position the background image on the parent anchor tag so we can actually see the image. I'm also using a blur filter, this disguises how low quality the image is initially and also creates a smooth transition when the high res photo replaces it.

```CSS
.card-image {
	display: block;
	background: #fff center center no-repeat;
	background-size: cover;
	filter: blur(3px); /* blur the lowres image */
}

.card-image > img {
	display: block;
	width: 100%;
	opacity: 0; /* visually hide the img element */
}
```

## Javascript
There are a few steps to get this working:

* wait for page to finish loading
* start loading the new high res photos
* wait for high res photos to finish loading
* switch original low res photo for the new high res photo

Start by watching for the load event on the window to execute a function `lazyLoad` when the page is finished loading, including all images that are loaded initially.

```Javascript
window.addEventListener('load', lazyLoad);
```

Then in the `lazyLoad` function we need to get all the elements we want to lazy load images in and loop over them to perform an action on them.

```Javascript
function lazyLoad() {
	var card_images = document.querySelectorAll('.card-image');
	
	card_images.forEach(function(card_image) {
		
	});
}
```

For each image we need to swap out the `src` attribute on the img tag with the URL of the high res version, this will start downloading this new version of the image but the user won't see it happening since it's hidden with CSS.

```Javascript
function lazyLoad() {
	var card_images = document.querySelectorAll('.card-image');
	
	// loop over each card image
	card_images.forEach(function(card_image) {
		// get the URL for the full size image
		var image_url = card_image.getAttribute('data-image-full');
		var content_image = card_image.querySelector('img');
		
		// change the src of the content image to load the new high res photo
		content_image.src = image_url;
	});
}
```

And finally we need to listen for the high res versions of the images to finish downloading so we can start displaying that in place of the original low res version. We'll also add a class of `is-loaded` so we can remove the blur filter.

```Javascript
function lazyLoad() {
	var card_images = document.querySelectorAll('.card-image');
	
	// loop over each card image
	card_images.forEach(function(card_image) {
		// get the URL for the full size image
		var image_url = card_image.getAttribute('data-image-full');
		var content_image = card_image.querySelector('img');
		
		// change the src of the content image to load the new high res photo
		content_image.src = image_url;
		// listen for load event when the new photo is finishes loading
		content_image.addEventListener('load', function() {
			// swap out the visible background image with the new fully downloaded photo
			card_image.style.backgroundImage = 'url(' + image_url + ')';
			// add a class to remove the blur filter to smoothly transition the image change
			card_image.className = card_image.className + ' is-loaded';
		});
		
	});
}
```

The page will now load the blurred out tiny low res image at the start and once everything on the page is done loading it will swap them out for the sharper high res versions.

## Demo

[Lazy Load Images](https://codepen.io/derekmorash/pen/NjBvdX)