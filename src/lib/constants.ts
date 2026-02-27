// ============================================
// Site-wide Constants
// ============================================

export const SITE_CONFIG = {
  name: "UnMask AI",
  tagline: "Detect Audio Deepfakes with AI Precision",
  description:
    "Advanced AI-powered audio deepfake detection platform. Upload your audio and instantly know if it's real or AI-generated.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://unmask.ai",
  email: "contact@unmask.ai",
} as const;

export const WHATSAPP_CONFIG = {
  number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+1234567890",
  botUrl: process.env.NEXT_PUBLIC_WHATSAPP_BOT_URL || "https://wa.me/1234567890",
  message: "Hi UnMask AI! I want to verify an audio file.",
} as const;

export const AUDIO_CONFIG = {
  maxFileSizeMB: Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB) || 50,
  allowedFormats: (
    process.env.NEXT_PUBLIC_ALLOWED_AUDIO_FORMATS || ".wav,.mp3,.flac,.ogg,.m4a,.aac"
  ).split(","),
  allowedMimeTypes: [
    "audio/wav",
    "audio/mpeg",
    "audio/mp3",
    "audio/flac",
    "audio/ogg",
    "audio/mp4",
    "audio/aac",
    "audio/x-wav",
    "audio/x-m4a",
  ],
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "API", href: "#api" },
  { label: "WhatsApp", href: "#whatsapp" },
] as const;

export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    description: "Get started with basic deepfake detection",
    features: [
      "5 audio analyses per month",
      "Max 2 min audio length",
      "Basic confidence score",
      "Web interface access",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    period: "month",
    description: "For professionals who need reliable detection",
    features: [
      "500 audio analyses per month",
      "Max 30 min audio length",
      "Detailed analysis report",
      "REST API access",
      "WhatsApp bot access",
      "Priority support",
      "Batch processing",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    period: "month",
    description: "For organizations with advanced needs",
    features: [
      "Unlimited audio analyses",
      "No audio length limit",
      "Full forensic report",
      "REST API + WebSocket",
      "WhatsApp bot (dedicated)",
      "Custom model fine-tuning",
      "24/7 dedicated support",
      "SLA guarantee",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
] as const;

export const FEATURES = [
  {
    title: "Real-time Detection",
    description:
      "Upload audio and get instant AI-powered analysis with confidence scores in seconds.",
    icon: "Zap",
  },
  {
    title: "High Accuracy",
    description:
      "Our model achieves 98.7% accuracy on benchmark datasets, continuously improving with new data.",
    icon: "Target",
  },
  {
    title: "REST API",
    description:
      "Integrate deepfake detection directly into your applications with our simple, well-documented API.",
    icon: "Code2",
  },
  {
    title: "WhatsApp Bot",
    description:
      "Send audio messages to our WhatsApp bot and get instant real/fake verdicts on the go.",
    icon: "MessageCircle",
  },
  {
    title: "Batch Processing",
    description:
      "Analyze multiple audio files simultaneously with our batch processing pipeline.",
    icon: "Layers",
  },
  {
    title: "Privacy First",
    description:
      "Your audio files are encrypted, analyzed, and deleted. We never store or share your data.",
    icon: "Shield",
  },
] as const;

export const ACCURACY_STATS = [
  { label: "Detection Accuracy", value: "98.7%", description: "On benchmark datasets" },
  { label: "Processing Speed", value: "<2s", description: "Average analysis time" },
  { label: "Audio Formats", value: "6+", description: "Supported file types" },
  { label: "Uptime", value: "99.9%", description: "Service availability" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Upload Audio",
    description: "Upload your audio file through our web interface, API, or WhatsApp bot.",
  },
  {
    step: 2,
    title: "AI Analysis",
    description:
      "Our deep learning model analyzes spectral patterns, temporal features, and acoustic signatures.",
  },
  {
    step: 3,
    title: "Get Results",
    description:
      "Receive a detailed verdict with confidence score, analysis breakdown, and forensic report.",
  },
] as const;

export const API_CODE_EXAMPLES = {
  curl: `curl -X POST "${process.env.NEXT_PUBLIC_API_URL || "https://api.unmask.ai/v1"}/analyze" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "audio_file=@sample.wav"`,

  python: `import requests

response = requests.post(
    "https://api.unmask.ai/v1/analyze",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    files={"audio_file": open("sample.wav", "rb")}
)

result = response.json()
print(f"Fake: {result['is_fake']} ({result['confidence']}%)")`,

  javascript: `const formData = new FormData();
formData.append("audio_file", audioFile);

const response = await fetch("https://api.unmask.ai/v1/analyze", {
  method: "POST",
  headers: { "Authorization": "Bearer YOUR_API_KEY" },
  body: formData,
});

const result = await response.json();
console.log(\`Fake: \${result.is_fake} (\${result.confidence}%)\`);`,
} as const;
