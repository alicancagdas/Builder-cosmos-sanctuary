import axios from "axios";

const OLLAMA_BASE_URL = process.env.OLLAMA_API_URL || "http://localhost:11434";

export interface OllamaMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
  context?: number[];
}

export interface OllamaChatRequest {
  model: string;
  messages: OllamaMessage[];
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
  };
}

class OllamaService {
  private baseURL: string;

  constructor() {
    this.baseURL = OLLAMA_BASE_URL;
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`);
      return response.status === 200;
    } catch (error) {
      console.error("Ollama health check failed:", error);
      return false;
    }
  }

  async getModels(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`);
      return response.data.models?.map((model: any) => model.name) || [];
    } catch (error) {
      console.error("Failed to get models:", error);
      return [];
    }
  }

  async generateResponse(
    prompt: string,
    model: string = "llama3",
  ): Promise<string> {
    try {
      const response = await axios.post(`${this.baseURL}/api/generate`, {
        model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      });

      return response.data.response || "Üzgünüm, yanıt oluşturulamadı.";
    } catch (error) {
      console.error("Failed to generate response:", error);
      return "AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.";
    }
  }

  async chatCompletion(
    messages: OllamaMessage[],
    model: string = "llama3",
  ): Promise<string> {
    try {
      const response = await axios.post(`${this.baseURL}/api/chat`, {
        model,
        messages,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      });

      return response.data.message?.content || "Üzgünüm, yanıt oluşturulamadı.";
    } catch (error) {
      console.error("Failed to complete chat:", error);
      return "AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.";
    }
  }

  async generateCodeExplanation(code: string): Promise<string> {
    const prompt = `
Aşağıdaki C/C++ kodunu analiz et ve Türkçe olarak açıkla:

\`\`\`cpp
${code}
\`\`\`

Lütfen şunları açıkla:
1. Kodun ne yaptığı
2. Kullanılan ana kavramlar
3. Varsa potansiyel sorunlar
4. İyileştirme önerileri

Açıklaman başlangıç seviyesindeki bir öğrenci için anlaşılır olsun.
`;

    return this.generateResponse(prompt);
  }

  async generateCodeSuggestion(userQuery: string): Promise<string> {
    const prompt = `
Sen bir C/C++ programlama eğitmenisin. Aşağıdaki soruya Türkçe olarak cevap ver:

"${userQuery}"

Lütfen:
1. Açık ve anlaşılır bir açıklama yap
2. Gerekirse kod örnekleri ver
3. Başlangıç seviyesindeki öğrenciler için uygun dil kullan
4. Pratik öneriler sun

Kod örnekleri için C++ kullan ve açıklamalarını Türkçe yap.
`;

    return this.generateResponse(prompt);
  }

  async debugCode(code: string, error: string): Promise<string> {
    const prompt = `
Bir C/C++ kod hatası ayıklama uzmanı olarak, aşağıdaki kodu ve hata mesajını analiz et:

KOD:
\`\`\`cpp
${code}
\`\`\`

HATA MESAJI:
${error}

Lütfen Türkçe olarak:
1. Hatanın nedenini açıkla
2. Nasıl düzeltileceğini göster
3. Düzeltilmiş kod örneği ver
4. Gelecekte benzer hataları önleme ipuçları sun

Açıklaman başlangıç seviyesindeki bir programcı için anlaşılır olsun.
`;

    return this.generateResponse(prompt);
  }
}

export const ollamaService = new OllamaService();
export default ollamaService;
