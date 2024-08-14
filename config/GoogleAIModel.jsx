
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

  export  const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "reference to :\n{\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n}\n\nGenerate Template for editor in JSON format for grocery TODO List.\n "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"time\": 1678887856028,\n  \"blocks\": [\n    {\n      \"id\": \"groceries-header\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Grocery List\",\n        \"level\": 1\n      }\n    },\n    {\n      \"id\": \"groceries-list\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": [\n          \"Milk\",\n          \"Eggs\",\n          \"Bread\",\n          \"Cheese\",\n          \"Tomatoes\",\n          \"Onions\"\n        ]\n      }\n    },\n    {\n      \"id\": \"add-item-header\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Add Items\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"add-item-input\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Type your grocery item and press Enter to add:\"\n      }\n    },\n    {\n      \"id\": \"add-item-field\",\n      \"type\": \"simple\",\n      \"data\": {\n        \"placeholder\": \"Enter item\",\n        \"text\": \"\"\n      }\n    }\n  ],\n  \"version\": \"2.8.1\"\n}\n```\n\n**Explanation:**\n\n* **\"time\"**:  This field represents the timestamp when the data was generated. It's not crucial for the editor functionality.\n* **\"blocks\"**: This is the main part that holds the structure of the grocery list.\n    * **\"groceries-header\"**:  A simple level-1 header to label the grocery list.\n    * **\"groceries-list\"**:  An unordered list (\"style\": \"unordered\") to display the grocery items. This list is initially filled with example items.\n    * **\"add-item-header\"**: A level-2 header to introduce the item adding section.\n    * **\"add-item-input\"**: A paragraph block to provide instructions for adding items.\n    * **\"add-item-field\"**: A \"simple\" block with a placeholder (\"Enter item\"). This block will be used to input new grocery items. \n\n**Important Considerations for Implementation:**\n\n1. **Dynamic Item Addition:** You'll need to write JavaScript code to handle the user input from the \"add-item-field\" block. When the user presses Enter, your code should:\n    * Fetch the input text from the \"add-item-field\".\n    * Add the new item to the \"items\" array within the \"groceries-list\" block.\n    * Update the Editor.js instance with the modified data.\n\n2. **Saving/Loading Data:** You'll need a way to store the grocery list data (the content of the \"blocks\" array) and retrieve it when the user revisits the editor. This could involve using a database, local storage, or a backend API.\n\n3. **Item Removal:** You might want to add functionality for removing items from the list. This could involve adding a \"delete\" button or similar control next to each list item.\n\n4. **Plugin for Simple Block:** The \"simple\" block type is not a standard Editor.js block type. You might need to create a custom plugin for this, or find an existing plugin that provides a similar functionality.\n\nThis JSON structure provides a starting point for building a basic grocery list editor using Editor.js. You'll need to add the necessary code to handle user interactions, data storage, and other features. \n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
