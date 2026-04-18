import { glassProducts } from '@/data/glassProducts';

const matchingRules = [
  {
    keywords: ['shower', 'bathroom', 'wet area', 'water'],
    type: "Toughened",
    thickness: "8mm",
    reason: "Toughened glass is safety-standard for wet areas and highly resistant to thermal stress."
  },
  {
    keywords: ['soundproof', 'acoustic', 'office cabin', 'noise', 'quiet'],
    type: "Laminated",
    thickness: "10mm",
    reason: "PVB lamination provides excellent acoustic insulation and safety for interior partitions."
  },
  {
    keywords: ['balcony', 'railing', 'height', 'safety', 'staircase', 'ledge', '15th floor'],
    type: "Laminated",
    thickness: "12mm",
    reason: "High-thickness laminated glass ensures structural integrity and prevents falling in case of breakage."
  },
  {
    keywords: ['energy', 'heat', 'south facing', 'facade', 'insulation', 'solar'],
    type: "Low-E Glass",
    thickness: "6mm (DGU)",
    reason: "Low-E coating reflects heat while allowing light, making it ideal for energy-efficient facades."
  },
  {
    keywords: ['kitchen', 'backsplash', 'color', 'decorative', 'wall'],
    type: "Back-Painted",
    thickness: "8mm",
    reason: "Lacquered glass provides a vibrant, easy-to-clean, and heat-resistant surface for kitchens."
  },
  {
    keywords: ['privacy', 'conference', 'partition', 'frosted', 'cabin'],
    type: "Frosted",
    thickness: "6mm",
    reason: "Acid-etched frosted glass provides visual privacy while maintaining a high level of light transmission."
  },
  {
    keywords: ['window', 'exterior', 'commercial', 'curtain wall', 'shop'],
    type: "DGU/IGU",
    thickness: "6+12+6mm",
    reason: "Double glazing provides superior thermal and sound insulation for external building envelopes."
  },
  {
    keywords: ['mirror', 'reflection', 'grooming', 'gym'],
    type: "Reflective",
    thickness: "6mm",
    reason: "Reflective coating provides mirror-like properties and heat reduction for modern architecture."
  }
];

export function getLocalMatch(input) {
  const tokens = input.toLowerCase().split(/\W+/);
  const matches = [];

  matchingRules.forEach(rule => {
    const score = rule.keywords.reduce((acc, kw) => acc + (tokens.includes(kw) ? 1 : 0), 0);
    if (score > 0) {
      const product = glassProducts.find(p => p.name.includes(rule.type) || rule.type.includes(p.name));
      matches.push({
        ...rule,
        name: `${rule.type} Glass`,
        priceRange: product ? `₹${product.priceMin} - ₹${product.priceMax}` : "₹Variable",
        score
      });
    }
  });

  return matches.sort((a, b) => b.score - a.score).slice(0, 2);
}

export async function getAiMatch(input) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
  if (!apiKey || apiKey.includes('your_')) {
    console.warn("AI Matching skipped: Please set NEXT_PUBLIC_GEMINI_KEY in your .env file.");
    return null;
  }

  const productList = glassProducts.map(p => `- ${p.name} (${p.thickness}, Process: ${p.process}, Application: ${p.application}, Price: ₹${p.priceMin}-${p.priceMax}/sqft)`).join('\n');

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a glass industry expert. Based on the user requirement, recommend the best glass type from this list:
${productList}

Respond ONLY in JSON format like this (do NOT include any markdown or extra text):
{ "recommendations": [
  { "name": "Glass Type Name", "reason": "short reason in plain English", "thickness": "suggested thickness", "priceRange": "price range from list", "process": "process type", "application": "application" }
]}

Important scenarios to handle correctly:
- "I need glass for my bathroom shower" → 8mm Toughened
- "Soundproof glass for my office cabin" → 10mm Laminated or DGU Acoustic
- "Glass railing for my balcony on 15th floor" → 12mm Toughened + Laminated
- "Energy efficient glass for south-facing facade" → Low-E DGU

User requirement: ${input}`
          }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return null;
    }

    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content?.parts?.[0]?.text) {
      console.error("Malformed Gemini response:", data);
      return null;
    }

    const textResponse = data.candidates[0].content.parts[0].text;
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.error("Failed to parse JSON from Gemini response:", textResponse);
      return null;
    }

    const result = JSON.parse(jsonMatch[0]);
    return result.recommendations?.map(r => ({
      name: r.name || "Custom Glass Solution",
      reason: r.reason || "Matched based on your specific requirements.",
      thickness: r.thickness || "Standard",
      priceRange: r.priceRange || "₹Variable",
      process: r.process,
      application: r.application
    })) || null;
    
  } catch (error) {
    console.error("AI Match Exception:", error);
    return null;
  }
}
