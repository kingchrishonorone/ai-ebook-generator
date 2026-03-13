import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

// SIMPLE BUILT‑IN GENERATOR (works without backend)
function generateLocalEbook(topic, audience, tone) {
  return `
TITLE
The Complete Guide to ${topic}

BOOK DESCRIPTION
This practical guide helps ${audience} understand and master ${topic}. Written in a ${tone.toLowerCase()} tone, this book provides clear steps, strategies, and insights anyone can apply.

TABLE OF CONTENTS
1. Introduction to ${topic}
2. Understanding the Fundamentals
3. Practical Strategies
4. Common Mistakes
5. Building Long‑Term Success

CHAPTER 1 — INTRODUCTION
${topic} has become an important skill in today's world. For ${audience}, learning how it works can open opportunities and create new income streams. In this book we break the topic down into simple steps.

CHAPTER 2 — FUNDAMENTALS
To succeed with ${topic}, you must understand the basic principles. Most beginners fail because they skip this stage and jump directly to advanced tactics.

CHAPTER 3 — PRACTICAL STRATEGIES
Here we explore actionable strategies that ${audience} can apply immediately. These techniques are simple but powerful when applied consistently.

CHAPTER 4 — COMMON MISTAKES
Many people struggle with ${topic} because they follow misinformation. Avoiding common mistakes can dramatically speed up progress.

CHAPTER 5 — LONG TERM SUCCESS
Mastery of ${topic} requires patience, discipline, and continuous learning. With the strategies in this guide, ${audience} can build real results over time.

END
`;
}

export default function EbookGenerator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generateBook() {
    setLoading(true);

    // simulate AI delay
    await new Promise((r) => setTimeout(r, 1200));

    const ebook = generateLocalEbook(topic || "Online Business", audience || "Beginners", tone);

    setResult(ebook);
    setLoading(false);
  }

  function downloadBook() {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ebook.txt";
    a.click();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-3xl">
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-8 space-y-6">

            <h1 className="text-3xl font-bold">AI Ebook Generator</h1>
            <p className="text-sm text-gray-500">Create ebooks you can sell online in seconds.</p>

            <div className="space-y-3">
              <Input
                placeholder="Book topic (example: Weight Loss)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />

              <Input
                placeholder="Target audience (example: Busy professionals)"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />

              <select
                className="w-full border rounded-xl p-2"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option>Professional</option>
                <option>Motivational</option>
                <option>Educational</option>
                <option>Persuasive</option>
              </select>

              <Button onClick={generateBook} className="w-full">
                {loading ? "Generating..." : "Generate Ebook"}
              </Button>
            </div>

            {result && (
              <div className="pt-4 space-y-3">
                <h2 className="font-semibold">Generated Ebook</h2>
                <Textarea className="h-96" value={result} readOnly />

                <Button onClick={downloadBook} className="w-full">
                  Download Ebook
                </Button>
              </div>
            )}

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
