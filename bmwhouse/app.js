async function unlock() {
  const pw = document.getElementById("pw").value;
  const res = await fetch("vault.enc");
  const encrypted = await res.arrayBuffer();

  try {
    const key = await deriveKey(pw);
    const data = await decrypt(encrypted, key);
    showFiles(JSON.parse(data));
  } catch {
    document.getElementById("err").innerText = "Wrong password";
  }
}

async function deriveKey(password) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("vault-salt"),
      iterations: 250000,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}
