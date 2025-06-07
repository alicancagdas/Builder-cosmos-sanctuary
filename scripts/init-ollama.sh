#!/bin/bash

echo "🤖 Initializing Ollama with Llama3 model..."

# Wait for Ollama service to be ready
echo "⏳ Waiting for Ollama service to start..."
while ! curl -f http://localhost:11434/api/tags > /dev/null 2>&1; do
  echo "   Ollama not ready yet, waiting 5 seconds..."
  sleep 5
done

echo "✅ Ollama service is ready!"

# Check if llama3 model exists
if curl -s http://localhost:11434/api/tags | grep -q "llama3"; then
  echo "✅ Llama3 model already exists!"
else
  echo "📥 Downloading Llama3 model (this may take a while)..."
  docker exec codementor-ollama-dev ollama pull llama3
  echo "✅ Llama3 model downloaded successfully!"
fi

# Test the model
echo "🧪 Testing Llama3 model..."
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3",
    "prompt": "Hello! Say hi in Turkish.",
    "stream": false
  }' | jq -r '.response'

echo "🎉 Ollama is ready to use!"
