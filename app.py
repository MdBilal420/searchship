from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from typing import List, Dict
import json
from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field

from dotenv import load_dotenv,find_dotenv
import requests

class Scholarship(BaseModel):
    name: str = Field(description="The name of the scholarship")
    description: str = Field(description="The description of the scholarship")
    application_link: str = Field(description="The link to the application for the scholarship")
    application_deadline: str = Field(description="The deadline to apply for the scholarship")

class ExtractSchema(BaseModel):
    scholarships: List[Scholarship] = Field(description="Array of scholarship names found on the page")


    
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


load_dotenv(find_dotenv())

@app.get("/")
def greet_json():
    return {"Hello": "World!"}

@app.get("/search")
async def search_and_extract(query: str) -> Dict:
    # Serper API configuration
    
    serper_api_key = os.getenv("SERPER_API_KEY","")
    if not serper_api_key:
        raise HTTPException(status_code=500, detail="SERPER_API_KEY environment variable is not set")
    
    # Firecrawl API configuration
    firecrawl_api_key = os.getenv("FIRECRAWL_API_KEY","")
    if not firecrawl_api_key:
        raise HTTPException(status_code=500, detail="FIRECRAWL_API_KEY environment variable is not set")
    

    serper_url = "https://google.serper.dev/search"
    
    app = FirecrawlApp(api_key=firecrawl_api_key)


    payload = json.dumps({  # Convert dict to JSON string
        "q": query,
        "gl": "in"
    })

    headers = {
        "X-API-KEY": serper_api_key,
        "Content-Type": "application/json"
    }

    response = requests.post(  # Use post() directly instead of request()
        url=serper_url,
        headers=headers,
        data=payload
    )
    
    if response.status_code != 200:
        print(f"Error: {response.status_code}, {response.text}")
        return []

    try:
        res = response.json()
        urls = [it.get('link') for it in res.get('organic', [])]
        # Extract data from each URL using Firecrawl
        if len(urls) == 0:
            raise HTTPException(status_code=404, detail="No URLs found in search results")

        print("urls",urls)
        data = app.extract(urls, {
            'prompt': 'Extract the name , description and application link, application deadline of the scholarships from the page.',
            'schema': ExtractSchema.model_json_schema(),
        })        
        return {
            "query": query,
            "results": data
        }


    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return []