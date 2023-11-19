import { db } from "~/server/db";
import fs from "fs";
import { spawn } from "child_process";

const runProposalCode = async (id: number) => {
  // grab the proposal
  const proposal = await db.proposal.findUniqueOrThrow({
    where: { id },
    select: { code: true, organizationId: true },
  });

  const organization = await db.organization.findUniqueOrThrow({
    where: { id: proposal.organizationId },
    select: { privKey: true },
  });

  // update status to 'implementing'
  await db.proposal.update({
    where: { id },
    data: {
      status: "implementing",
    },
  });

  let code = proposal.code;

  // replace "PRIVATE_KEY_GOES_HERE" with the organization's private key
  code = code.replace("PRIVATE_KEY_GOES_HERE", organization.privKey);

  console.log(`Running proposal code: ${code}`);

  // save the code in tmp-proposal-code.js
  fs.writeFileSync("./tmp-proposal-code.js", code);
  let output = "";
  try {
    // run the code by running `node tmp-proposal-code.js` using child_process
    // wait for the child process to finish, and get stdout & stderr and combine them
    // into a single string
    const child = spawn("node", ["./tmp-proposal-code.js"]);

    child.stdout.on("data", (data) => {
      output += data;
    });
    child.stderr.on("data", (data) => {
      output += data;
    });
    // wait for complete
    await new Promise((resolve) => {
      child.on("close", resolve);
    });
  } finally {
    // delete the tmp-proposal-code.js file
    fs.unlinkSync("./tmp-proposal-code.js");
  }

  // update the database
  await db.proposal.update({
    where: { id },
    data: {
      codeResult: output,
      status: "implimented",
    },
  });
};

export default runProposalCode;
