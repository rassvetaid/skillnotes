import { createHash } from "crypto";

const generateHash = (data) => {
  const hash = createHash("sha256").update(data).digest("hex");

  return hash;
};

export default generateHash;
