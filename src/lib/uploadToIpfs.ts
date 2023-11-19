import { z } from "zod";
import { env } from "~/env.mjs";

async function uploadToIpfs(name: string, data: string) {
  const key = env.IPFS_KEY;
  const blob = new Blob([data], { type: "text/plain" });
  const formData = new FormData();
  formData.append("file", blob, name);

  // const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
  //       maxBodyLength: "Infinity",
  //       headers: {
  //         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  //         'Authorization': `Bearer ${JWT}`
  //       }
  //     });

  try {
    // const response = await fetch("https://api.dweb.link/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    // USE FETCH INSTEAD OF AXIOS FOR PINATA

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await response.json();
    console.log(`IPFS result: ${JSON.stringify(result, null, 2)}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const cid = z.string().parse(result.IpfsHash);
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
