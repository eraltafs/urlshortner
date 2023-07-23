# URL Shortner

### deloyed link
- frontend
    https://url-tiny.netlify.app/
- backend
    https://url-6huw.onrender.com



### Description
You can Short your url, you can add custom length and you can add desired alias or name to url 

<h2 align="center">Backend<h2>

## for local run

## Installation

1. Clone the repository:

   ```git clone https://github.com/eraltafs/urlshortner```

   
## Pre - requisites
Before running the application, make sure you have the following installed:

* Node.js
* MongoDB

### chage the directory
```cd .\server\```


## Install the dependencies:
```npm install```


## set the environment
- create .env file in server and make two variables 
    - mongoURL = "<your_mongo_DB_url>"
    - PORT = <Your_Port_Number>
    
## Start the server:

     npm start

The server will start running on the specified port.

## API Endpoint

 ## To get base API

    * method : GET
    * Endpoint : /

   
    * Response:
      data: { msg: "Base Api" }

 ## To short URL

    method: "POST",
    * Endpoint : /shortUrl

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: <Original_URL>,
      length: <length>,
      alias: <custom_alias>,
    }),
   
    * Response:
      data: { short_url: shortenUrl }
  
   ## To redirect URL

    method: "GET",
    * Endpoint : /:randomstring
   
    * Response:
      redirected if shorturl find

## change api index.js in client
- let api = "https://<your_api>.com";

<h2 align="center">Frontend<h2>

## Tech Stacks

<h4 align="center">Frontend</h4>
<div display:"flex" align="center">
<img src="https://camo.githubusercontent.com/d63d473e728e20a286d22bb2226a7bf45a2b9ac6c72c59c0e61e9730bfe4168c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465">
<img src="https://camo.githubusercontent.com/3a0f693cfa032ea4404e8e02d485599bd0d192282b921026e89d271aaa3d7565/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f435353332d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465">
<img src="https://camo.githubusercontent.com/93c855ae825c1757f3426f05a05f4949d3b786c5b22d0edb53143a9e8f8499f6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d3332333333303f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d463744463145">
</div>
<h4 align="center ">Backend</h4>
<div display:"flex" align="center">
<img src="https://camo.githubusercontent.com/a1eae878fdd3d1c1b687992ca74e5cac85f4b68e60a6efaa7bc8dc9883b71229/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3333393933333f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f6465646f746a73266c6f676f436f6c6f723d7768697465">
<img src="https://camo.githubusercontent.com/7f73136d92799b19be179d1ed87b461120c35ed917c7d5ab59a7606209da7bd3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732e6a732d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d7768697465">
<img src="https://camo.githubusercontent.com/72e92f69f36703548704a9eeda2a9889c2756b5e08f01a9aec6e658c148d014e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d3445413934423f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465">
</div>

<br/>
<br/>

## Features



## Project Highlights

<img width="90%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/43698833/255382728-e4c1c853-a22c-480e-8b73-acc249d1e36e.png" />

<img width="90%" src="https://github-production-user-asset-6210df.s3.amazonaws.com/43698833/255382793-47fb3457-55e6-4276-b2cc-00e5ed4b4218.png" />

