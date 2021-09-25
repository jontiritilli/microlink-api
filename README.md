# MicroLink API
Url Shortener API

## Instructions
1. Clone this repository
1. `cd microlink-api`
1. `mv ./.env.example ./.env`
1. Add Mongo Db Url
1. `yarn install`
1. `yarn dev`

## Basic Usage
### Shorten
Route: `/url/shorten`

Returns a JSON obect with a redirect url

#### Input Example
```json
	{ 
		longUrl: <fully qualified url> 
	}
```
 
#### Output Example
```json 
	{
		"_id": "614f4265b9b0a531040e5b2b",
		"urlCode": "yoat04kXd",
		"shortUrl": "https://localhost:9000/v1/yoat04kXd",
		"longUrl": "https://www.amazon.com/gp/product/B07PVG7N4K/ref=ppx_yo_dt_b_asin_image_o00_s00?ie=UTF8&psc=1",
		"date": "1632584293780",
		"__v": 0
	}
```

### Redirect
Route: `/url/redirect/:urlCode`

Redirects you to the full url