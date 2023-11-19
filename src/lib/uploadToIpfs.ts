import { z } from "zod";

async function uploadToIpfs(name: string, data: string) {
  const blob = new Blob([data], { type: "text/plain" });
  const formData = new FormData();
  formData.append("file", blob, name);

  try {
    const response = await fetch("https://api.dweb.link/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const cid = z.string().parse(result.Hash);
    console.log(`Stored file with CID: ${cid}`);

    const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
    console.log(ipfsUrl);

    return ipfsUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }

  // const storage = new Web3Storage({ token: env.WEB3_STORAGE_TOKEN });
  //   const metadata = {
  //     name: name,
  //     type: "text/plain",
  //   };
  //   const file = new File([data], metadata.name, metadata);
  //   const cid = await storage.put([file]);

  //   console.log(`Stored file with CID: ${cid}`);

  //   const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
  //   console.log(ipfsUrl);

  //   return ipfsUrl;
}

export default uploadToIpfs;
