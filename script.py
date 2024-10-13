import json
import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv('/public/.env')

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Load data from JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

def generate_bio_score(bio):
    try:
        response = client.chat.completions.create(
            model="gpt-4-0125-preview",  # Using GPT-4 Turbo preview as GPT-4-mini is not available
            messages=[
                {"role": "system", "content": "You are an AI that rates bios on a scale of 1-10 based on how interesting and engaging they are."},
                {"role": "user", "content": f"Rate the following bio on a scale of 1-10:\n\n{bio}\n\nProvide only the numeric score as your response."}
            ],
            max_tokens=1
        )
        score = int(response.choices[0].message.content.strip())
        return max(1, min(score, 10))  # Ensure score is between 1 and 10
    except Exception as e:
        print(f"Error generating score for bio: {e}")
        return 5  # Default score if there's an error

# Process each person's bio and add a score
for person in data:
    if 'bio' in person:
        person['score'] = generate_bio_score(person['bio'])
    else:
        person['score'] = 5  # Default score if no bio is available

# Save updated data back to JSON file
with open('data.json', 'w') as file:
    json.dump(data, file, indent=2)

print("Bio scores have been generated and added to data.json")

