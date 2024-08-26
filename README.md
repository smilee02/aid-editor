# AID - AI-Driven Editor

AID is a web component developed in [Lit](https://lit.dev/) that helps make writing and editing easier using artificial intelligence. With AID, you can quickly generate new content and improve existing text.

## Features

- Real-time AI content generation and rewriting
- Cross-platform compatibility
- Write Articles, Expand Content, Shorten Content

## Requirements

- **OpenAI API Key**: The AI features of A.I.D require an OpenAI API key for ChatGPT. Please make sure you have a valid API key to use the AI functionalities.

## Setting OpenAI Environment Variable

To use the AID (AI-Driven Editor) web component, you'll need to set the `OPENAI_API_KEY` environment variable. This key is required for the AI-driven functionalities. Below are the instructions for setting this variable on Linux, Windows, and macOS.

### Linux / macOS

1. **Open Terminal:**

2. **Set the Environment Variable:**

   ```bash
   export OPENAI_API_KEY=your-api-key-here
   ```

3. **Persist the Variable Across Sessions:**

- To make the variable available in every terminal session, add the export command to your shell configuration file:

  - For bash, add it to ~/.bashrc or ~/.bash_profile:

    ```bash
    echo 'export OPENAI_API_KEY=your-api-key-here' >> ~/.bashrc
    source ~/.bashrc
    ```

  - For zsh, add it to ~/.zshrc:

    ```bash
    echo 'export OPENAI_API_KEY=your-api-key-here' >> ~/.zshrc
    source ~/.zshrc
    ```

4. **Verify the Variable:**

   Check that the environment variable is set by running:

   ```bash
   echo $OPENAI_API_KEY
   ```

### Windows

1.  **Open Command Prompt or PowerShell:**

2.  **Set the Environment Variable Temporarily:**

    - For Command Prompt:

      ```cmd
      set OPENAI_API_KEY=your-api-key-here
      ```

    - For PowerShell:

      ```powershell
      $env:OPENAI_API_KEY="your-api-key-here"
      ```

3.  **Persist the Variable Across Sessions:**

    - To make the environment variable permanent, use the following commands:

      - For Command Prompt:

        ```cmd
        setx OPENAI_API_KEY "your-api-key-here"
        ```

      - For Powershell:

        ```powershell
        [System.Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "your-api-key-here", "User")
        ```

      After setting this, you may need to restart your Command Prompt or PowerShell session for the changes to take effect.

    <br>

4.  **Verify the Variable:**
    Check that the environment variable is set by running:

    - Command Prompt

    ```cmd
    echo %OPENAI_API_KEY%
    ```

    - PowerShell:

    ```powershell
    echo $env:OPENAI_API_KEY
    ```

## Run Locally

Clone the project

```bash
git clone https://github.com/smilee02/aid-editor.git
```

Go to the project directory

```bash
cd aid-editor
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run build
```

Add to your HTML file

```
<script type="module" src="./dist/aid-editor.min.js"></script>
```

And to use the component

```
<aid-editor></aid-editor>
```

HTML file

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>A.I.D - AI-Driven Editor Demo</title>
    <script type="module" src="./dist/aid-editor.min.js"></script>
  </head>
  <body>
    <aid-editor></aid-editor>
  </body>
</html>
```

<br>

**Note**

You can try the existent index.html

At the moment make sure you are running chrome using _--disable-web-security_

## Running Tests

To run tests, run the following command

```bash
npm run test
```

## Authors

- [@Smilee](https://www.github.com/smilee02)

## Support

For support, open an issue on the GitHub repository.

## Tech Stack

Lit, HTML, CSS

## TODO

- Documentation
- Testing different Editors
- Redo README
- Redo Tests
