const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeIssue = async (description) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite"
    });

    const prompt = `
Analyze this maintenance issue:

"${description}"

Return only JSON in this format:
{
  "category": "ELECTRICAL",
  "priority": "HIGH",
  "suggestion": "Short practical suggestion"
}

Allowed categories:
ELECTRICAL, PLUMBING, CLEANLINESS, FURNITURE, INFRASTRUCTURE, OTHER

Allowed priorities:
LOW, MEDIUM, HIGH, CRITICAL
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("AI analysis failed:", error.message);

    return {
      category: "OTHER",
      priority: "MEDIUM",
      suggestion: "Please review the issue manually."
    };
  }
};

module.exports = analyzeIssue;