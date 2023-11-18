import { z } from "zod";
import { env } from "~/env.mjs";

const SYSTEM_PROMPT = `Generate code to execute the proposal provided by the user. This code can use ethers.js but no other libraries. The first line of the code should be \`const PRIVATE_KEY = "PRIVATE_KEY_GOES_HERE";\` and the private key will be automatically substituted in. This code will be executed directly -- do not assume a human will make any changes. Do not include any content in your response besides the code.`;

async function getProposalCodeFromDescription(description: string) {
  // we have a written description of a blockchain proposal, which could involve things like sending tokens. we want to generate ethers.js code to execute this proposal.
  // the first line of the code should be: const PRIVATE_KEY = "PRIVATE_KEY_GOES_HERE";
  // this will be automatically replaced with the private key of the organization that is executing the proposal.

  const requestBody = JSON.stringify(
    {
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: description },
      ],
      temperature: 0.3,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: "gpt-4",
    },
    null,
    2,
  );

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      Authorization: "Bearer " + env.OPENAI_KEY,
      "Content-Type": "application/json",
    },
    body: requestBody,
    method: "POST",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return z.string().parse((await response.json()).choices[0].message);
}

export default getProposalCodeFromDescription;
