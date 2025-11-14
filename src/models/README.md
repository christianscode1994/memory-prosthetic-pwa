Models
------
This directory holds model artifacts used for embedding.

For demo, we use the built-in deterministic embedder (no external model).
To use real models:
 - place quantized ONNX models under models/text-embedder/model.onnx and models/image-embedder/model.onnx
 - update src/hooks/useEmbeddings.ts to call ONNX Runtime Web or TF.js
 - commit model checksums in SUBMISSION.md
