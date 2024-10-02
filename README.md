# Expert AI Panel

This is a [Next.js](https://nextjs.org) project that creates an AI-powered expert panel discussion generator. It allows users to create and manage personas, generate responses on various topics, and save/load panel configurations.

## Features

- Create and manage expert personas
- Generate AI-powered responses for multiple personas on a given topic
- Support for OpenAI and Anthropic AI providers
- Save and load panel configurations
- Download generated responses in various formats (Markdown, JSON, Plain Text)
- Responsive design with a dark theme

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

Before using the application, you need to set up your API credentials:

1. Open the application in your browser
2. Click the settings icon in the top right corner
3. Enter your API key for either OpenAI or Anthropic
4. Select your preferred AI provider
5. Save the settings

## Usage

1. Create expert personas using the "Add Expert" form
2. Enter a topic for discussion in the input field
3. Click "Generate Responses" to get AI-generated responses for each persona
4. View the responses in the list below
5. Optionally, download the responses in your preferred format

You can also save and load panel configurations using the controls in the top right corner.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Tailwind CSS](https://tailwindcss.com/docs) - a utility-first CSS framework.
- [shadcn/ui](https://ui.shadcn.com/) - re-usable components built with Radix UI and Tailwind CSS.
- [OpenAI API](https://platform.openai.com/docs/api-reference) - documentation for the OpenAI API.
- [Anthropic API](https://www.anthropic.com/product) - information about Anthropic's AI models.
