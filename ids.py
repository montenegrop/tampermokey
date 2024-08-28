import re


def find_ids_in_html(file_path):
    # Regular expression to match the pattern
    pattern = r'onclick="ps_messages\.new_message\((\d+)'

    # Read the HTML file
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    # Find all matches in the file content
    ids = re.findall(pattern, content)

    return ids


# Example usage
if __name__ == "__main__":
    file_path = "html.html"  # Replace with your actual file path
    found_ids = find_ids_in_html(file_path)
    print("Found IDs:", found_ids)
