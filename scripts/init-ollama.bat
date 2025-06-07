@echo off
echo 🤖 Initializing Ollama with Llama3 model...

echo ⏳ Waiting for Ollama service to start...
:wait_loop
curl -f http://localhost:11434/api/tags >nul 2>&1
if %errorlevel% neq 0 (
    echo    Ollama not ready yet, waiting 5 seconds...
    timeout /t 5 /nobreak >nul
    goto wait_loop
)

echo ✅ Ollama service is ready!

echo 📥 Downloading Llama3 model (this may take a while)...
docker exec codementor-ollama-dev ollama pull llama3

echo 🧪 Testing Llama3 model...
curl -X POST http://localhost:11434/api/generate ^
  -H "Content-Type: application/json" ^
  -d "{\"model\": \"llama3\", \"prompt\": \"Hello! Say hi in Turkish.\", \"stream\": false}"

echo 🎉 Ollama is ready to use!
