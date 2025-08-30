#### Multi-LLM Response

I built this application as a hands-on learning project to explore the world of Generative AI. The goal was to create a unified platform to directly interact with and compare the outputs of various large language models (LLMs) side by side.

This project was a deep dive into full-stack development and Gen AI, providing valuable insights into how these powerful models work in a real-world application.



## API Reference

#### API Post Request for Gemini

```http
  POST /api/chat
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GEMINI_API_KEY` | `string` | **Required**. Your API key |

#### API Post Request for Openrouter

```http
  POST /api/openrouter
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`OPENROUTER_API_KEY`

`GEMINI_API_KEY`


## Tech Stack

Tech Stack:-
Frontend: React.js, Tailwind CSS

Backend: Node.js, Express

APIs: Google Gemini API, OpenRouter API


## Features

- Multi-Model Chat: Interact with multiple LLMs, including Gemini, LLaMA, Mistral, and Qwen, from a single, streamlined interface.

- Side-by-Side Comparison: Evaluate model responses in real-time to observe their unique strengths and weaknesses.

- Unified Interface: A clean, minimal UI built with React and Tailwind CSS that consolidates outputs from different APIs.
