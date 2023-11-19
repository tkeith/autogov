import { z } from "zod";
import { env } from "~/env.mjs";
import chains from "~/lib/chains";

async function getProposalCodeFromDescription(
  chainId: number,
  description: string,
) {
  // we have a written description of a blockchain proposal, which could involve things like sending tokens. we want to generate ethers.js code to execute this proposal.
  // the first line of the code should be: const PRIVATE_KEY = "PRIVATE_KEY_GOES_HERE";
  // this will be automatically replaced with the private key of the organization that is executing the proposal.

  // grab chain details by id
  const chain = chains.find((chain) => chain.chainId === chainId);
  if (!chain) {
    throw Error("unexpected no chain");
  }

  const networkName = chain.name;
  const rpcUrl = chain.rpc;

  const SYSTEM_PROMPT = `Generate Node.js code to execute the proposal provided by the user on ${networkName}, which has RPC URL "${rpcUrl}" and chainId ${chainId}. This code can use Ethers.js v5 (via \`require("ethers")\`) but no other libraries. The first line of the code should be \`const PRIVATE_KEY = "PRIVATE_KEY_GOES_HERE";\` and the private key will be automatically substituted in. This code will be executed directly -- do not assume a human will make any changes. Do not include any content in your response besides the code.`;

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const jsonRes = await response.json();

  console.log(`GPT res: ${JSON.stringify(jsonRes, null, 2)}`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  let code = z.string().parse(jsonRes.choices[0].message.content);
  code = code.trim();

  // if code contains ```, find code after the first ``` and before the second one
  const firstBacktickIndex = code.indexOf("```");
  if (firstBacktickIndex !== -1) {
    const secondBacktickIndex = code.indexOf("```", firstBacktickIndex + 3);
    if (secondBacktickIndex !== -1) {
      code = code.slice(firstBacktickIndex + 3, secondBacktickIndex);
    }
  }

  // if code starts with "javascript", remove it
  if (code.startsWith("javascript")) {
    code = code.slice(10);
  }

  code = code + "\n";

  return {
    code,
    status: "success",
  };
}

export default getProposalCodeFromDescription;
