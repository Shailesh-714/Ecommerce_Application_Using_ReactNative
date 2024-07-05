import pandas as pd
import json
import random
import ast

# Load the dataset
file_path = './impulseDataset.xlsx'
dataset = pd.read_excel(file_path)

# Function to get the first image URL from the image column
def get_image_urls(image_str):
    urls = json.loads(image_str.replace("'", '"'))
    return urls

# Function to convert the category string to an array
def convert_category_string_to_array(category_string):
    # Safely evaluate the string as a Python literal
    category_list = ast.literal_eval(category_string)
    # Replace >> with commas and split into a list
    category_array = [category.strip() for category in category_list[0].split('>>')]
    return category_array

# Function to generate product data
def generate_product_data(dataset):
    product_data = []

    for index, row in dataset.iterrows():
        # Generate a subtitle with a slight variation from the title
        subtitle_variations = [
            f"Premium quality {row['product_name']}",
            f"Best-in-class {row['product_name']}",
            f"Exclusive {row['product_name']}",
            f"Top-rated {row['product_name']}",
            f"Affordable {row['product_name']}",
        ]
        subtitle = random.choice(subtitle_variations)

        # Convert category string to array
        category_array = convert_category_string_to_array(row["product_category_tree"])

        product = {
            "id": str(index + 6),
            "title": row["product_name"],
            "subtitle": subtitle,
            "oldPrice": row["retail_price"],
            "price": row["discounted_price"],
            "rating": round(random.uniform(3.0, 5.0), 2),
            "reviews": random.randint(10, 5000),
            "image": {
                "uri": get_image_urls(row["image"])[0]
            },
            "carouselImages": [{"uri": url} for url in get_image_urls(row["image"])],
            "description": row["description"],  # Truncate description for brevity
            "category": category_array,
            "wishlisted": False,
            "addedtocart": False,
            "count": 0,
        }
        product_data.append(product)

    return product_data

# Generate product data
product_data = generate_product_data(dataset)

# Save product data to a JSON file
output_file = './products.json'
with open(output_file, 'w') as f:
    json.dump(product_data, f, indent=2)

output_file
