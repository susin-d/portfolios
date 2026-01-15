// Author: Susindran
// OS support: Web
// Description: Project constants and data structures for the AI Research Portfolio

import { ExperienceItem, ProjectItem, AchievementItem, SkillProfile, EducationItem } from './types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Gingr Informatics Pvt Ltd",
    role: "Software Engineer (Intern)",
    period: "Aug 2025 – Oct 2025",
    points: [
      "Engineered a scalable multi-tenant School Management System (SMS) using Django and React, reducing administrative latency by 40% through asynchronous workflow automation.",
      "Architected a Zero-Trust security model implementing granular Role-Based Access Control (RBAC) and JWT authentication to ensure strict data sovereignty.",
      "Optimized database query performance via advanced indexing and Redis caching strategies, supporting high-concurrency user loads during peak operational windows.",
      "Designed and documented RESTful API standards using Swagger/OpenAPI, facilitating seamless frontend-backend integration and future microservices decoupling."
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Indian Institute of Technology, Madras",
    degree: "BS in Data Science & Applications",
    period: "2024 – Present",
    details: "Specializing in Neural Architectures, Distributed Systems, and Advanced Machine Learning Paradigms."
  },
  {
    institution: "Easwari Engineering College",
    degree: "BE in Computer Science & Engineering",
    period: "2021 – 2025",
    details: "Core specialization in Algorithms, Operating Systems, Compiler Design, and Artificial Intelligence."
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "Agentic AI Orchestrator",
    description: [
      "Engineered a local-first Agentic AI system leveraging open-source LLMs (Ollama) to autonomously manage WhatsApp communication protocols via Model Context Protocol (MCP) servers.",
      "Orchestrated multi-agent workflows with asynchronous message queuing, ensuring real-time responsiveness and fault tolerance.",
      "Synthesized a Retrieval-Augmented Generation (RAG) pipeline integrating live web indices, Gmail APIs, and historical chat context for high-fidelity conversational continuity."
    ],
    tags: ["Python", "Ollama", "RAG", "MCP Servers", "Vector DB"]
  },
  {
    title: "University ERP Ecosystem",
    description: [
      "Designed the micro-architecture for a modular ERP platform using Next.js and TypeScript, prioritizing maintainability and component decoupling.",
      "Implemented robust identity management via Firebase Auth/OAuth and real-time data synchronization using Cloud Firestore.",
      "Re-engineered the global state management layer to eliminate redundant render cycles, slashing Time-to-Interactive (TTI) by 30% for high-concurrency academic dashboards."
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  { 
    platform: "Codeforces", 
    title: "Competitive Programmer", 
    stats: "Rank: Pupil (Max 1351)" 
  },
  { 
    platform: "CodeChef", 
    title: "Algorithm Specialist", 
    stats: "Global Rank: 6630 (3-Star)" 
  },
  { 
    platform: "LeetCode", 
    title: "Knight Badge Recipient", 
    stats: "500+ Algorithmic Solutions" 
  }
];

export const SKILLS = {
  languages: ["Python", "C++", "Rust", "CUDA", "TypeScript", "Mojo", "SQL", "Go"],
  frameworks: ["PyTorch", "TensorFlow", "JAX", "FastAPI", "Ray", "LangChain", "HuggingFace", "ONNX"],
  architectures: ["Transformers", "Mamba/SSM", "Mixture of Experts", "Diffusion", "RAG", "Agentic Systems", "LoRA"],
  tools: ["Kubernetes", "Docker", "W&B", "Kafka", "GCP Vertex AI", "Pinecone", "Terraform", "Git"]
};

export const SKILL_PROFILES: Record<string, SkillProfile> = {
  // --- Languages ---
  "Python": {
    description: "Primary vehicle for Machine Learning R&D. Proficiency extends from scientific computing stacks (NumPy, SciPy) to asynchronous architectural orchestration.",
    metrics: [{ label: "Efficiency", value: 92 }, { label: "Deployment", value: 98 }, { label: "Research", value: 95 }]
  },
  "C++": {
    description: "High-performance systems programming for low-latency inference engines and custom neural operation kernels. Direct memory management for resource-constrained environments.",
    metrics: [{ label: "Latency", value: 96 }, { label: "Control", value: 98 }, { label: "Complexity", value: 90 }]
  },
  "Rust": {
    description: "Systems programming language ensuring memory safety without garbage collection. Critical for optimizing inference engines, WASM deployments, and high-reliability backend services.",
    metrics: [{ label: "Performance", value: 99 }, { label: "Safety", value: 98 }, { label: "Concurrency", value: 94 }]
  },
  "CUDA": {
    description: "Parallel computing and hardware acceleration on NVIDIA GPUs. Writing kernel-level optimizations for neural compute operations and high-throughput data processing.",
    metrics: [{ label: "Throughput", value: 98 }, { label: "Hardware", value: 95 }, { label: "Efficiency", value: 92 }]
  },
  "TypeScript": {
    description: "Strictly typed interface design for high-concurrency dashboards and robust ERP backends. Emphasis on type safety and scalable frontend architectures.",
    metrics: [{ label: "Stability", value: 96 }, { label: "Architecture", value: 94 }, { label: "UX", value: 91 }]
  },
  "Mojo": {
    description: "Next-generation AI programming language unifying Python's usability with C's performance. Developing hardware-aware AI kernels and maximizing hardware utilization.",
    metrics: [{ label: "Speed", value: 95 }, { label: "Adoption", value: 80 }, { label: "Potential", value: 99 }]
  },
  "SQL": {
    description: "Structured query language for large-scale data manipulation. Designing normalized schemas for transactional integrity and optimizing analytical queries for feature stores.",
    metrics: [{ label: "Integrity", value: 94 }, { label: "Query Opt", value: 90 }, { label: "Scale", value: 88 }]
  },
  "Go": {
    description: "Concurrency-native language for building high-throughput microservices and sidecars. ideal for networking layers in distributed ML training clusters.",
    metrics: [{ label: "Concurrency", value: 97 }, { label: "Throughput", value: 93 }, { label: "Simplicity", value: 95 }]
  },

  // --- Frameworks ---
  "PyTorch": {
    description: "Core framework for deep learning research. Specialized in implementing custom autograd functions and distributed training protocols across GPU clusters.",
    metrics: [{ label: "Optimization", value: 94 }, { label: "Abstraction", value: 88 }, { label: "Scalability", value: 96 }]
  },
  "TensorFlow": {
    description: "Production-grade ML framework. Expertise in TFX pipelines for end-to-end model lifecycle management, serving, and graph optimization.",
    metrics: [{ label: "Production", value: 95 }, { label: "Ecosystem", value: 92 }, { label: "Serving", value: 90 }]
  },
  "JAX": {
    description: "Composable transformations of Python+NumPy programs. Leveraging XLA for accelerated research in differentiable programming and physics simulations.",
    metrics: [{ label: "Math", value: 98 }, { label: "Speed", value: 96 }, { label: "Flexibility", value: 92 }]
  },
  "FastAPI": {
    description: "High-performance asynchronous web framework for building ML inference endpoints. Leveraging Starlette for concurrency and Pydantic for data validation.",
    metrics: [{ label: "Speed", value: 96 }, { label: "Async", value: 94 }, { label: "Documentation", value: 90 }]
  },
  "Ray": {
    description: "Unified framework for scaling AI and Python applications. Orchestrating distributed hyperparameter tuning and reinforcement learning rollouts.",
    metrics: [{ label: "Scaling", value: 95 }, { label: "Distrib", value: 93 }, { label: "Tuning", value: 91 }]
  },
  "LangChain": {
    description: "Framework for developing applications powered by language models. Composing chains for retrieval, memory management, and agentic tool use.",
    metrics: [{ label: "Composability", value: 94 }, { label: "RAG", value: 96 }, { label: "Tooling", value: 92 }]
  },
  "HuggingFace": {
    description: "Hub for State-of-the-Art models. Fine-tuning transformers for domain-specific NLP tasks and deploying inference endpoints via the Inference API.",
    metrics: [{ label: "NLP", value: 98 }, { label: "Community", value: 99 }, { label: "Access", value: 95 }]
  },
  "ONNX": {
    description: "Open Neural Network Exchange. Optimizing model interoperability and runtime performance across diverse hardware backends (CPU, GPU, TPU, NPU).",
    metrics: [{ label: "Interop", value: 95 }, { label: "Runtime", value: 90 }, { label: "Portability", value: 97 }]
  },

  // --- Architectures ---
  "Transformers": {
    description: "Deep expertise in Self-Attention mechanisms, multi-head paradigms, and sequence-to-sequence modeling for large-scale language understanding.",
    metrics: [{ label: "Reasoning", value: 91 }, { label: "Complexity", value: 97 }, { label: "Inference", value: 89 }]
  },
  "Mamba/SSM": {
    description: "State Space Models research for efficient long-context sequence modeling. Implementing selective scan algorithms for linear-time inference.",
    metrics: [{ label: "Throughput", value: 97 }, { label: "Context", value: 94 }, { label: "Innovation", value: 90 }]
  },
  "Mixture of Experts": {
    description: "Sparse activation architectures. Scaling parameter counts efficiently by routing tokens to specialized expert networks, maintaining inference speed.",
    metrics: [{ label: "Efficiency", value: 94 }, { label: "Scale", value: 98 }, { label: "Routing", value: 90 }]
  },
  "Diffusion": {
    description: "Generative modeling via stochastic differential equations. Reversing noise processes for high-fidelity image and audio synthesis.",
    metrics: [{ label: "Generative", value: 96 }, { label: "Fidelity", value: 95 }, { label: "Math", value: 92 }]
  },
  "RAG": {
    description: "Retrieval Augmented Generation specialist. Optimizing vector database ingestion pipelines, hybrid search algorithms, and context-window relevance scoring.",
    metrics: [{ label: "Precision", value: 93 }, { label: "Latency", value: 90 }, { label: "Knowledge", value: 97 }]
  },
  "Agentic Systems": {
    description: "Architecting autonomous loops and tool-calling protocols. Focused on multi-agent collaboration, hierarchical task decomposition, and self-correction loops.",
    metrics: [{ label: "Autonomy", value: 95 }, { label: "Reliability", value: 85 }, { label: "Integration", value: 92 }]
  },
  "LoRA": {
    description: "Low-Rank Adaptation. Parameter-efficient fine-tuning technique for customizing massive pre-trained models with minimal computational overhead.",
    metrics: [{ label: "Efficiency", value: 98 }, { label: "Adaptation", value: 95 }, { label: "Storage", value: 99 }]
  },

  // --- Tools ---
  "Kubernetes": {
    description: "Container orchestration for distributed training clusters and microservices scaling. Managing ephemeral GPU nodes and auto-scaling logic.",
    metrics: [{ label: "Orchestration", value: 92 }, { label: "Scaling", value: 95 }, { label: "Reliability", value: 90 }]
  },
  "Docker": {
    description: "Containerization standard for reproducible ML environments. Ensuring consistency across development, testing, and production logic.",
    metrics: [{ label: "Isolation", value: 95 }, { label: "Portability", value: 98 }, { label: "CI/CD", value: 92 }]
  },
  "W&B": {
    description: "Weights & Biases. Experiment tracking platform for visualizing training metrics, hyperparameters, and model artifacts to ensure reproducibility.",
    metrics: [{ label: "Tracking", value: 98 }, { label: "Viz", value: 96 }, { label: "Collab", value: 94 }]
  },
  "Kafka": {
    description: "Distributed event streaming platform. Decoupling real-time data ingestion pipelines from training and inference consumers for low-latency systems.",
    metrics: [{ label: "Streaming", value: 95 }, { label: "Decoupling", value: 97 }, { label: " throughput", value: 92 }]
  },
  "GCP Vertex AI": {
    description: "Managed machine learning platform on Google Cloud. Automating MLOps workflows from data preparation to model monitoring and deployment.",
    metrics: [{ label: "MLOps", value: 94 }, { label: "Cloud", value: 96 }, { label: "Automation", value: 90 }]
  },
  "Pinecone": {
    description: "Managed vector database. enabling high-scale similarity search for semantic retrieval applications and long-term memory for AI agents.",
    metrics: [{ label: "Retrieval", value: 97 }, { label: "Scale", value: 95 }, { label: "Latency", value: 92 }]
  },
  "Terraform": {
    description: "Infrastructure as Code. Provisioning and managing reproducible cloud resources and GPU clusters using declarative configuration files.",
    metrics: [{ label: "IaC", value: 96 }, { label: "Reproduce", value: 98 }, { label: "Multi-Cloud", value: 90 }]
  },
  "Git": {
    description: "Distributed version control. Managing complex codebases, collaborative research workflows, and model versioning integration.",
    metrics: [{ label: "Collab", value: 99 }, { label: "Versioning", value: 98 }, { label: "History", value: 95 }]
  }
};
// --- End of constants.tsx ---